export const chapters = [
  { title: "Start here", duration: "5 min" },
  { title: "Meet the terminal", duration: "5 min" },
  { title: "Your first commit", duration: "12 min" },
  { title: "Read the changes", duration: "8 min" },
  { title: "Branch out", duration: "10 min" },
  { title: "Bring it together", duration: "12 min" },
  { title: "GitHub & beyond", duration: "8 min" },
  { title: "Work with a remote", duration: "10 min", extra: true },
  { title: "Recover from mistakes", duration: "10 min", extra: true },
  { title: "Put it together", duration: "10 min", extra: true },
];
export type Visual =
  | "welcome"
  | "versions"
  | "tools"
  | "command"
  | "files"
  | "staging"
  | "snapshot"
  | "history"
  | "branch"
  | "merge"
  | "conflict"
  | "pr"
  | "remote"
  | "question"
  | "recap";
export type Slide = {
  chapter: number;
  title: string;
  body: string;
  visual: Visual;
  code?: string;
  labels?: string[];
  notes: string;
  exercise?: string;
};
export const slides: Slide[] = [
  {
    chapter: 0,
    title: "Your project. With a memory.",
    body: "An introduction to Git, together.",
    visual: "welcome",
    notes:
      "Welcome UF EMBS members. Explain that no installation or account is required. Ask who has seen a filename ending in final_final.",
  },
  {
    chapter: 0,
    title: "Which one is the final version?",
    body: "We have all been here.",
    visual: "versions",
    notes:
      "Ask which file a teammate should use. Explore how file copies lose the reason for a change.",
  },
  {
    chapter: 0,
    title: "Git remembers what changed.",
    body: "Save meaningful versions. See how you got here.",
    visual: "history",
    labels: ["Start the project", "Add the sensor", "Fix the settings"],
    notes:
      "Each point is a commit: a saved snapshot with a message. Avoid explaining branches yet.",
  },
  {
    chapter: 0,
    title: "Git and GitHub work together.",
    body: "Git tracks your work. GitHub helps your team share it.",
    visual: "tools",
    notes:
      "Git is a version control tool; GitHub hosts repositories and supports collaboration. Git works without a GitHub account.",
  },
  {
    chapter: 1,
    title: "A terminal is a conversation.",
    body: "Type a command. Press Enter. Read the response.",
    visual: "command",
    code: "pwd",
    notes:
      "Explain prompt versus typed command versus output. A terminal is an interface, not a programming language. pwd asks for the current directory.",
  },
  {
    chapter: 1,
    title: "Look around before you begin.",
    body: "List the files in the current folder.",
    visual: "command",
    code: "ls",
    notes:
      "Introduce directories and filenames. Our browser simulator follows a Unix-style shell. Local shell commands can differ across operating systems.",
  },
  {
    chapter: 1,
    title: "Read a file from the terminal.",
    body: "The filename tells the command what to open.",
    visual: "command",
    code: "cat README.md",
    notes:
      "Explain an argument: extra information passed to a command. README contains plain text. Capitalization and spelling matter.",
  },
  {
    chapter: 1,
    title: "Your turn: meet the terminal.",
    body: "Find your folder, list its files, and read the README.",
    visual: "files",
    notes:
      "Allow five minutes including the explanation. Show hints only if needed. Students can explore help.",
    exercise: "terminal",
  },
  {
    chapter: 2,
    title: "A commit is a saved snapshot.",
    body: "Give it a message so your team knows what changed.",
    visual: "snapshot",
    notes:
      "A commit records the staged project snapshot, its parent history, and metadata. The simplified illustration shows a changed file; commits represent the project tree.",
  },
  {
    chapter: 2,
    title: "Start tracking the project.",
    body: "A repository is a project whose history Git manages.",
    visual: "command",
    code: "git init",
    notes:
      "git init creates Git metadata in .git. It does not save a first commit or upload the project.",
    exercise: "initialize",
  },
  {
    chapter: 2,
    title: "Choose what goes into the snapshot.",
    body: "Staging lets you include the changes that belong together.",
    visual: "staging",
    notes:
      "Staging is selection, not saving history yet. git add takes the file contents at that moment; subsequent edits require staging again.",
  },
  {
    chapter: 2,
    title: "Save one meaningful change.",
    body: "Stage the sensor setting. Commit it with a clear message.",
    visual: "command",
    code: 'git commit -m "Update sensor settings"',
    notes:
      "Explain -m and quotation marks. First inspect status, then stage only sensor-config.json. Leave team notes unstaged.",
    exercise: "first-commit",
  },
  {
    chapter: 3,
    title: "Ask Git where things stand.",
    body: "Status tells you what is staged, modified, or untracked.",
    visual: "command",
    code: "git status",
    notes:
      "Status is safe to run repeatedly. A file can have both staged and unstaged changes.",
  },
  {
    chapter: 3,
    title: "Look at the actual difference.",
    body: "A minus line was removed. A plus line was added.",
    visual: "command",
    code: "git diff",
    notes:
      "git diff compares the working files to the index. git diff --staged compares the index to the last commit. Explain the minus and plus prefixes.",
  },
  {
    chapter: 3,
    title: "Read the story of your project.",
    body: "Commit messages make the history useful.",
    visual: "command",
    code: "git log --oneline",
    notes:
      "The short identifier refers to a commit. HEAD is the current checked-out commit, usually through the current branch.",
  },
  {
    chapter: 3,
    title: "Catch the accidental edit.",
    body: "Inspect the difference before saving your work.",
    visual: "question",
    notes:
      "Use the diff exercise to spot a fictional erroneous sensor rate and restore it. Explain that restore discards an unstaged edit.",
    exercise: "inspect",
  },
  {
    chapter: 4,
    title: "Give an idea its own branch.",
    body: "Develop a change while keeping main ready for the team.",
    visual: "branch",
    notes:
      "Branches are lightweight names pointing to commits, not separate physical copies of the project folder.",
  },
  {
    chapter: 4,
    title: "Create a branch and switch to it.",
    body: "Name it after the work you are about to do.",
    visual: "command",
    code: "git switch -c feature/sensor",
    notes:
      "switch -c creates a new branch and checks it out. git branch lists branch names.",
  },
  {
    chapter: 4,
    title: "A commit moves the current branch.",
    body: "Your feature can progress without moving main.",
    visual: "branch",
    notes:
      "Uncommitted changes are not owned by a branch; they may carry across a switch or block it if overwritten. Show that only committed snapshots distinguish the histories.",
  },
  {
    chapter: 4,
    title: "Switch back. See the difference.",
    body: "Your committed feature is still there, on its branch.",
    visual: "command",
    code: "git switch main",
    notes:
      "Have attendees commit on the feature branch, then switch back and inspect the original setting.",
    exercise: "branch",
  },
  {
    chapter: 5,
    title: "Bring the work together.",
    body: "Merge a finished branch into the branch you are on.",
    visual: "merge",
    notes:
      "Emphasize merge direction. A fast-forward moves the branch pointer; diverged histories can create a commit with two parents.",
    exercise: "merge",
  },
  {
    chapter: 5,
    title: "Sometimes Git needs your decision.",
    body: "Two edits to the same place can cause a conflict.",
    visual: "conflict",
    notes:
      "A conflict is an unresolved decision, not broken history. The same filename alone does not necessarily cause a conflict; conflicting edits do.",
  },
  {
    chapter: 5,
    title: "Keep the intended result.",
    body: "Edit the file. Remove the markers. Stage the resolution.",
    visual: "command",
    code: "git add sensor-config.json",
    notes:
      "Explain HEAD side and incoming side. Both can contribute to the final resolution. Do not blindly choose a side. Git can commit literal markers if staged, so inspect the final file.",
  },
  {
    chapter: 5,
    title: "Finish the merge with a commit.",
    body: "Now the history includes both lines of work.",
    visual: "command",
    code: 'git commit -m "Resolve sensor settings"',
    notes:
      "The merge commit has both histories as parents. In practice use the required fictional rate 100 and preserve valid JSON.",
    exercise: "conflict",
  },
  {
    chapter: 6,
    title: "Let your team review the change.",
    body: "A pull request is a place to discuss work before merging.",
    visual: "pr",
    notes:
      "Pull requests are a GitHub collaboration feature, distinct from git pull. This exercise is a simulation, not a real network operation.",
    exercise: "pull-request",
  },
  {
    chapter: 6,
    title: "You know the workflow.",
    body: "Inspect. Stage. Commit. Branch. Review. Merge.",
    visual: "recap",
    notes:
      "Ask someone to explain the workflow in their own words. Explain that the browser exercises are a subset of Git. Direct members to the reference and official Git documentation for real-world practice.",
  },
  {
    chapter: 7,
    title: "Your team has another copy.",
    body: "A remote is a repository your local project can exchange work with.",
    visual: "remote",
    notes:
      "Origin is a conventional remote name. A remote-tracking branch reflects the last fetched state, not a live view.",
  },
  {
    chapter: 7,
    title: "Fetch looks. Pull integrates.",
    body: "Fetch updates your view of the remote. Pull brings changes into your branch.",
    visual: "command",
    code: "git fetch origin",
    notes:
      "Pull performs fetch plus integration; that integration may be merge or rebase depending on configuration. This simulator uses merge.",
  },
  {
    chapter: 7,
    title: "Push shares your commits.",
    body: "Integrate your teammate’s work, then send yours.",
    visual: "command",
    code: "git push origin main",
    notes:
      "Push updates the remote branch if allowed. A rejection can mean the remote has work you need to integrate. Exercise uses a simulated remote.",
    exercise: "remote",
  },
  {
    chapter: 8,
    title: "Staged the wrong file?",
    body: "Unstage it without losing your edits.",
    visual: "command",
    code: "git restore --staged README.md",
    notes:
      "The default restore --staged source is HEAD. It changes the index, preserving working contents.",
    exercise: "unstage",
  },
  {
    chapter: 8,
    title: "Discard an edit carefully.",
    body: "Restore replaces your working file with its staged version.",
    visual: "command",
    code: "git restore README.md",
    notes:
      "This operation discards unstaged edits in the target file. Contrast with restore --staged. The exercise uses fictional data and has a reset.",
  },
  {
    chapter: 8,
    title: "Undo a commit with another commit.",
    body: "Revert keeps the original history visible.",
    visual: "command",
    code: "git revert HEAD",
    notes:
      "Revert applies an inverse change and creates a new commit. It can conflict. This simulator supports clean single-parent reverts.",
    exercise: "revert",
  },
  {
    chapter: 9,
    title: "A task, not a recipe.",
    body: "Ship the setting change on a branch. Leave your notes out.",
    visual: "question",
    notes:
      "Capstone is unguided. Hints exist but do not provide a required sequence. Evaluate the repository state.",
    exercise: "capstone",
  },
  {
    chapter: 9,
    title: "Explain what you saved.",
    body: "What changed? What stayed out? Where is the commit?",
    visual: "question",
    notes:
      "Discuss intentional commits and why git add . is not always the right choice. Ask members to justify their branch and commit message.",
  },
  {
    chapter: 9,
    title: "Keep experimenting.",
    body: "Try the sandbox. Break something. Reset and try again.",
    visual: "recap",
    notes:
      "Recommend real-world follow-up: install Git when ready, configure your author identity, create a repository and practice with a partner. The app does not require GitHub login.",
    exercise: "sandbox",
  },
];
