import {
  commit,
  createRepo,
  head,
  initialFiles,
  seededBranch,
  staged,
  unstaged,
} from "../lib/git.ts";
import type { Repo } from "../lib/git.ts";
export type Context = {
  repo: Repo;
  actions: string[];
  reviewed: boolean;
  merged: boolean;
};
export type Step = {
  title: string;
  instruction: string;
  hints: string[];
  check: (c: Context) => boolean;
  file?: string;
};
export type Exercise = {
  id: string;
  chapter: number;
  title: string;
  description: string;
  seed: () => Repo;
  steps: Step[];
  extra?: boolean;
  kind?: "pr" | "sandbox";
};
const rate = (value: number) =>
  initialFiles["sensor-config.json"].replace("50", String(value));
const action = (name: string) => (c: Context) => c.actions.includes(name);
const sensorMatches = (content: string | undefined, value: number) => {
  try {
    const data = JSON.parse(content ?? "");
    return data.sampleRate === value && data.unit === "Hz";
  } catch {
    return false;
  }
};
const sensorCommitted = (repo: Repo, value: number) =>
  sensorMatches(head(repo)?.tree["sensor-config.json"], value);
const clean = (repo: Repo) => !staged(repo).length && !unstaged(repo).length;
const step = (
  title: string,
  instruction: string,
  hints: string[],
  check: Step["check"],
  file?: string,
): Step => ({ title, instruction, hints, check, file });
const changedSensor = () => {
  const repo = createRepo();
  repo.files["sensor-config.json"] = rate(100);
  repo.files["team-notes.md"] += "\nAsk Maya about the enclosure.\n";
  return repo;
};
const mergeSeed = (conflict = false) => {
  const repo = seededBranch(
    createRepo(),
    conflict ? "feature/sensor" : "feature/docs",
    conflict
      ? { "sensor-config.json": rate(100) }
      : {
          "README.md":
            initialFiles["README.md"] +
            "\nCollect sample data at the next meeting.\n",
        },
    conflict ? "Use a 100 Hz sample rate" : "Document the next experiment",
  );
  repo.files[conflict ? "sensor-config.json" : "team-notes.md"] = conflict
    ? rate(75)
    : initialFiles["team-notes.md"] + "\nEnclosure design is ready.\n";
  repo.index = { ...repo.files };
  commit(repo, conflict ? "Try a 75 Hz sample rate" : "Update team notes");
  return repo;
};
export const exercises: Exercise[] = [
  {
    id: "terminal",
    chapter: 1,
    title: "Meet the terminal",
    description: "A few commands to find your way around.",
    seed: () => createRepo(),
    steps: [
      step(
        "Where are you?",
        "Type pwd, then press Enter to see your current folder.",
        [
          "The terminal prints an answer after you press Enter.",
          "pwd means print working directory.",
          "Type pwd and press Enter.",
        ],
        action("pwd"),
      ),
      step(
        "What is in this folder?",
        "Run ls to list the project files.",
        [
          "You are still in the same folder.",
          "ls lists filenames.",
          "Type ls and press Enter.",
        ],
        action("ls"),
      ),
      step(
        "Read the README.",
        "Run cat README.md to read the project description.",
        [
          "A command can take a filename as an argument.",
          "Use cat followed by the filename.",
          "Type cat README.md.",
        ],
        action("cat:README.md"),
      ),
    ],
  },
  {
    id: "initialize",
    chapter: 2,
    title: "Start a repository",
    description: "Make this folder a Git project.",
    seed: () => createRepo(false),
    steps: [
      step(
        "Start tracking this project.",
        "Run git init to create a repository.",
        [
          "This creates Git metadata, not a saved commit.",
          "The command is git init.",
          "Type git init.",
        ],
        (c) => c.repo.initialized,
      ),
      step(
        "Ask Git what it sees.",
        "Run git status. Your files are still untracked.",
        [
          "Initializing does not automatically save your files.",
          "Status tells you what is tracked or changed.",
          "Type git status.",
        ],
        action("status"),
      ),
      step(
        "Save the initial project.",
        "Stage the files, then commit them with a message.",
        [
          "There is no history until you make a commit.",
          "git add . stages all files in this small starting project.",
          'Run git add . then git commit -m "Initial project".',
        ],
        (c) => !!head(c.repo) && clean(c.repo),
      ),
    ],
  },
  {
    id: "first-commit",
    chapter: 2,
    title: "Your first commit",
    description: "Save the sensor update. Leave your notes out.",
    seed: changedSensor,
    steps: [
      step(
        "See what changed.",
        "Run git status to check the files in your project.",
        [
          "Reading status does not change anything.",
          "Use git status to see modified files.",
          "Type git status.",
        ],
        action("status"),
      ),
      step(
        "Stage the sensor setting.",
        "Add sensor-config.json to the next snapshot. Leave team-notes.md out.",
        [
          "A commit should contain related work.",
          "Give git add the exact filename.",
          "Type git add sensor-config.json.",
        ],
        (c) =>
          staged(c.repo).length === 1 &&
          staged(c.repo)[0] === "sensor-config.json",
      ),
      step(
        "Save your snapshot.",
        "Commit the staged change with a message about the sensor.",
        [
          "Your notes can stay modified without being committed.",
          "Use git commit -m followed by a quoted message.",
          'Type git commit -m "Update sensor settings".',
        ],
        (c) =>
          sensorCommitted(c.repo, 100) &&
          head(c.repo)?.tree["team-notes.md"] === initialFiles["team-notes.md"],
      ),
    ],
  },
  {
    id: "inspect",
    chapter: 3,
    title: "Catch an accidental edit",
    description: "The setting changed unexpectedly. Investigate it.",
    seed: () => {
      const r = createRepo();
      r.files["sensor-config.json"] = rate(5000);
      return r;
    },
    steps: [
      step(
        "Look at the difference.",
        "Run git diff to see the accidental change.",
        [
          "Status identifies files; diff shows their contents.",
          "Lines starting with + were added.",
          "Type git diff.",
        ],
        action("diff"),
      ),
      step(
        "Restore the original setting.",
        "Discard the unstaged edit to sensor-config.json.",
        [
          "Restore will replace this edit with the staged version.",
          "Use git restore followed by the filename.",
          "Type git restore sensor-config.json.",
        ],
        (c) =>
          c.repo.files["sensor-config.json"] ===
          initialFiles["sensor-config.json"],
      ),
      step(
        "Check your work.",
        "Run git status to confirm the working tree is clean.",
        [
          "A clean working tree has no pending changes.",
          "Ask Git for its current status.",
          "Type git status.",
        ],
        (c) => clean(c.repo) && c.actions.at(-1) === "status",
      ),
    ],
  },
  {
    id: "branch",
    chapter: 4,
    title: "Work on a branch",
    description: "Try a sensor improvement without moving main.",
    seed: () => createRepo(),
    steps: [
      step(
        "Give the idea a branch.",
        "Create and switch to a branch named feature/sensor.",
        [
          "A branch starts at your current commit.",
          "git switch -c creates and switches.",
          "Type git switch -c feature/sensor.",
        ],
        (c) => c.repo.branch === "feature/sensor",
      ),
      step(
        "Change the sensor setting.",
        "Open Files and change sampleRate from 50 to 100.",
        [
          "The file editor saves your working edit automatically.",
          "Change the number, preserving the JSON punctuation.",
          "In sensor-config.json replace 50 with 100.",
        ],
        (c) => sensorMatches(c.repo.files["sensor-config.json"], 100),
        "sensor-config.json",
      ),
      step(
        "Commit your improvement.",
        "Stage the sensor file and commit the update.",
        [
          "An edit is not a commit yet.",
          "Stage the sensor file before committing.",
          'Run git add sensor-config.json then git commit -m "Use 100 Hz sampling".',
        ],
        (c) =>
          c.repo.branch === "feature/sensor" && sensorCommitted(c.repo, 100),
      ),
      step(
        "Visit main again.",
        "Switch to main. The setting here should still be 50.",
        [
          "The feature commit is safely stored on its branch.",
          "Use git switch main.",
          "Type git switch main, then open Files if you want to compare.",
        ],
        (c) => c.repo.branch === "main" && sensorCommitted(c.repo, 50),
      ),
    ],
  },
  {
    id: "merge",
    chapter: 5,
    title: "Bring the work together",
    description: "Maya finished the documentation on another branch.",
    seed: () => mergeSeed(),
    steps: [
      step(
        "Find the teammate’s branch.",
        "Run git branch to see the branches in this project.",
        [
          "The asterisk identifies your current branch.",
          "Your teammate’s branch is feature/docs.",
          "Type git branch.",
        ],
        action("branch"),
      ),
      step(
        "Merge into main.",
        "Merge feature/docs into the current main branch.",
        [
          "You are already on main.",
          "git merge takes the name of the incoming branch.",
          "Type git merge feature/docs.",
        ],
        (c) =>
          head(c.repo)?.parents.length === 2 &&
          head(c.repo)?.tree["README.md"].includes("Collect sample data") ===
            true,
      ),
      step(
        "Read the combined history.",
        "Run git log --oneline to see both contributions.",
        [
          "A merge commit can have two parents.",
          "Use the compact log view.",
          "Type git log --oneline.",
        ],
        action("log"),
      ),
    ],
  },
  {
    id: "conflict",
    chapter: 5,
    title: "Resolve a conflict",
    description: "Two teammates changed the same sensor setting.",
    seed: () => mergeSeed(true),
    steps: [
      step(
        "Bring in the other change.",
        "Merge feature/sensor. Git will ask you to resolve a conflict.",
        [
          "Both branches changed the same line.",
          "A conflict means you must decide the final content.",
          "Type git merge feature/sensor.",
        ],
        (c) => c.repo.conflicts.length > 0,
      ),
      step(
        "Choose the final setting.",
        "Open Files. Keep valid JSON with sampleRate 100 and remove all conflict markers.",
        [
          "The HEAD section is your current branch; the lower section is incoming.",
          "Keep one JSON object and remove <<<<<<<, =======, and >>>>>>> lines.",
          'Replace the entire sensor file with the original JSON structure using sampleRate 100 and unit "Hz".',
        ],
        (c) => {
          try {
            const f = c.repo.files["sensor-config.json"];
            return (
              !/[<=>]{7}/.test(f) &&
              JSON.parse(f).sampleRate === 100 &&
              JSON.parse(f).unit === "Hz"
            );
          } catch {
            return false;
          }
        },
        "sensor-config.json",
      ),
      step(
        "Stage the resolution.",
        "Add sensor-config.json to mark the conflict as resolved.",
        [
          "Editing alone does not mark the merge conflict resolved.",
          "Stage the resolved file.",
          "Type git add sensor-config.json.",
        ],
        (c) => !c.repo.conflicts.length && !!c.repo.mergeParent,
      ),
      step(
        "Finish the merge.",
        "Commit the resolution with a clear message.",
        [
          "This commit joins the two histories.",
          "Use git commit -m with a message.",
          'Type git commit -m "Resolve sensor settings".',
        ],
        (c) =>
          !c.repo.mergeParent &&
          head(c.repo)?.parents.length === 2 &&
          sensorCommitted(c.repo, 100) &&
          !/[<=>]{7}/.test(head(c.repo)?.tree["sensor-config.json"] ?? ""),
      ),
    ],
  },
  {
    id: "pull-request",
    chapter: 6,
    title: "Review a pull request",
    description: "Review Maya’s documentation change before merging it.",
    seed: () =>
      seededBranch(
        createRepo(),
        "feature/docs",
        {
          "README.md":
            initialFiles["README.md"] +
            "\nCollect sample data at the next meeting.\n",
        },
        "Document the next experiment",
      ),
    kind: "pr",
    steps: [
      step(
        "Read the proposed change.",
        "Open Files changed and review the new README line.",
        [
          "A pull request proposes changes from one branch into another.",
          "The green line is the proposed addition.",
          "Select Files changed, read the diff, then choose Mark as reviewed.",
        ],
        (c) => c.reviewed,
      ),
      step(
        "Merge the reviewed change.",
        "Return to Conversation and merge the pull request.",
        [
          "The proposed branch is feature/docs and the destination is main.",
          "You have already reviewed the change.",
          "Select Conversation, then Merge pull request.",
        ],
        (c) =>
          c.merged &&
          head(c.repo)?.tree["README.md"].includes("Collect sample data") ===
            true,
      ),
    ],
  },
  {
    id: "remote",
    chapter: 7,
    title: "Sync with your teammate",
    description: "Fetch their update. Add yours. Share the result.",
    extra: true,
    seed: () => {
      const r = seededBranch(
        createRepo(),
        "remote-seed",
        {
          "README.md":
            initialFiles["README.md"] +
            "\nMaya added an experiment checklist.\n",
        },
        "Add experiment checklist",
      );
      r.remoteTip = r.branches["remote-seed"];
      r.tracking = r.branches.main;
      delete r.branches["remote-seed"];
      return r;
    },
    steps: [
      step(
        "Fetch the remote update.",
        "Run git fetch origin. Your working files should stay the same.",
        [
          "Fetch updates your remote-tracking reference.",
          "It does not merge the update into main.",
          "Type git fetch origin.",
        ],
        (c) => c.repo.tracking === c.repo.remoteTip && action("fetch")(c),
      ),
      step(
        "Bring the update into main.",
        "Run git pull origin main to integrate your teammate’s work.",
        [
          "This simulator integrates with a merge.",
          "Your teammate added a README checklist.",
          "Type git pull origin main.",
        ],
        (c) =>
          head(c.repo)?.tree["README.md"].includes("experiment checklist") ===
          true,
      ),
      step(
        "Add your sensor improvement.",
        "Open Files and change sampleRate to 100.",
        [
          "Keep your teammate’s README change.",
          "Edit only sensor-config.json.",
          "Change 50 to 100 in the sensor file.",
        ],
        (c) => sensorMatches(c.repo.files["sensor-config.json"], 100),
        "sensor-config.json",
      ),
      step(
        "Commit your change.",
        "Stage the sensor file and make a commit.",
        [
          "Push shares commits, so save one first.",
          "git add selects the file; git commit saves it.",
          'Run git add sensor-config.json then git commit -m "Update sensor settings".',
        ],
        (c) => sensorCommitted(c.repo, 100),
      ),
      step(
        "Share the commit.",
        "Push main to the simulated origin.",
        [
          "Your remote is simulated; no account is involved.",
          "Use git push origin main.",
          "Type git push origin main.",
        ],
        (c) => c.repo.remoteTip === c.repo.branches.main && action("push")(c),
      ),
    ],
  },
  {
    id: "unstage",
    chapter: 8,
    title: "Unstage the wrong file",
    description: "You staged a draft README by mistake.",
    extra: true,
    seed: () => {
      const r = createRepo();
      r.files["README.md"] += "\nUnfinished draft.\n";
      r.index = { ...r.files };
      return r;
    },
    steps: [
      step(
        "Unstage without losing the edit.",
        "Run git restore --staged README.md.",
        [
          "The working edit should remain after unstaging.",
          "The --staged option changes the index.",
          "Type git restore --staged README.md.",
        ],
        (c) =>
          !staged(c.repo).length &&
          c.repo.files["README.md"].includes("Unfinished draft"),
      ),
      step(
        "Discard the draft deliberately.",
        "Now restore README.md to remove the unfinished working edit.",
        [
          "This operation discards the unstaged draft.",
          "Leave out --staged to restore the working file.",
          "Type git restore README.md.",
        ],
        (c) => clean(c.repo),
      ),
    ],
  },
  {
    id: "revert",
    chapter: 8,
    title: "Undo a committed mistake",
    description: "An incorrect setting was already committed.",
    extra: true,
    seed: () => {
      const r = createRepo();
      r.files["sensor-config.json"] = rate(5000);
      r.index = { ...r.files };
      commit(r, "Accidentally set 5000 Hz");
      return r;
    },
    steps: [
      step(
        "Undo it with a new commit.",
        "Run git revert HEAD to reverse the latest commit.",
        [
          "Revert preserves the old commit in history.",
          "HEAD refers to the current commit.",
          "Type git revert HEAD.",
        ],
        (c) =>
          sensorCommitted(c.repo, 50) &&
          c.repo.commits.length === 3 &&
          head(c.repo)?.message.startsWith("Revert") === true,
      ),
      step(
        "See what history remembers.",
        "Run git log --oneline. Both the mistake and its reversal remain.",
        [
          "Revert adds history instead of erasing it.",
          "Look at the latest two messages.",
          "Type git log --oneline.",
        ],
        action("log"),
      ),
    ],
  },
  {
    id: "capstone",
    chapter: 9,
    title: "Ship the sensor improvement",
    description: "Use what you have learned, with fewer instructions.",
    extra: true,
    seed: () => {
      const r = createRepo();
      r.files["team-notes.md"] += "\nUnfinished enclosure idea.\n";
      return r;
    },
    steps: [
      step(
        "Make a focused change.",
        "On a feature/sensor branch, commit sampleRate 100. Keep the unfinished team notes out of the commit.",
        [
          "A branch separates committed work; staging selects the files.",
          "Create the branch, edit the setting, then stage only that file.",
          'Use git switch -c feature/sensor, edit the sensor to 100, then git add sensor-config.json and git commit -m "Improve sensor sampling".',
        ],
        (c) =>
          c.repo.branch === "feature/sensor" &&
          sensorCommitted(c.repo, 100) &&
          head(c.repo)?.tree["team-notes.md"] === initialFiles["team-notes.md"],
        "sensor-config.json",
      ),
      step(
        "Bring the feature into main.",
        "Switch to main and merge the feature. The notes should still be an uncommitted edit.",
        [
          "Your notes can carry across the switch because the committed version is unchanged.",
          "Merge the feature branch into main.",
          "Run git switch main then git merge feature/sensor. The unrelated working notes stay uncommitted.",
        ],
        (c) =>
          c.repo.branch === "main" &&
          sensorCommitted(c.repo, 100) &&
          head(c.repo)?.tree["team-notes.md"] === initialFiles["team-notes.md"],
      ),
    ],
  },
  {
    id: "sandbox",
    chapter: 9,
    title: "Open sandbox",
    description:
      "A fresh repository. Try the supported commands at your own pace.",
    extra: true,
    kind: "sandbox",
    seed: () => createRepo(),
    steps: [
      step(
        "Try something.",
        "Edit files or run commands. Type help for the supported command list.",
        [
          "Start with git status.",
          "Open Files to make a change.",
          'Try an edit, git add, and git commit -m "My experiment".',
        ],
        () => false,
      ),
    ],
  },
];
export const reference = [
  ["pwd", "Show the current folder."],
  ["ls", "List files in the current folder."],
  ["cat README.md", "Read a file."],
  ["git init", "Initialize a Git repository."],
  ["git status", "Check staged, modified, and untracked files."],
  ["git diff", "Compare working files with the staging area."],
  ["git diff --staged", "Compare staging with the last commit."],
  ["git add sensor-config.json", "Stage the current contents of one file."],
  [
    'git commit -m "Update settings"',
    "Save the staged snapshot with a message.",
  ],
  ["git log --oneline", "Read the compact commit history."],
  ["git branch", "List local branches."],
  ["git switch -c feature/sensor", "Create a branch and switch to it."],
  ["git switch main", "Switch to an existing branch."],
  [
    "git merge feature/sensor",
    "Merge the named branch into your current branch.",
  ],
  [
    "git restore --staged README.md",
    "Unstage the file, preserving your working edit.",
  ],
  ["git restore README.md", "Discard unstaged edits in the file."],
  ["git revert HEAD", "Reverse the latest commit with a new commit."],
  [
    "git fetch origin",
    "Update remote-tracking references without integrating changes.",
  ],
  [
    "git pull origin main",
    "Fetch and integrate remote main; this simulator uses merge.",
  ],
  ["git push origin main", "Send main’s commits to the remote."],
];
