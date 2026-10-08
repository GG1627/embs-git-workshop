import assert from "node:assert/strict";
import {
  commit,
  createRepo,
  execute,
  head,
  history,
  initialFiles,
  seededBranch,
  staged,
  unstaged,
} from "../src/lib/git.ts";
import { exercises } from "../src/data/exercises.ts";
let checks = 0;
function check(value, message) {
  assert.ok(value, message);
  checks++;
}
function run(repo, input, ok = true) {
  const result = execute(repo, input);
  assert.equal(result.ok, ok, `${input}: ${result.output}`);
  checks++;
  return result.repo;
}
const rate = (n) => initialFiles["sensor-config.json"].replace("50", String(n));
// Stage a snapshot, then change the working file again and leave another file unstaged.
let repo = createRepo();
repo.files["sensor-config.json"] = rate(100);
repo = run(repo, "git add sensor-config.json");
repo.files["sensor-config.json"] = rate(200);
repo.files["team-notes.md"] += "Unrelated note\n";
repo = run(repo, 'git commit -m "Use 100 Hz sampling"');
assert.equal(head(repo).tree["sensor-config.json"], rate(100));
assert.equal(repo.files["sensor-config.json"], rate(200));
assert.equal(head(repo).tree["team-notes.md"], initialFiles["team-notes.md"]);
check(
  unstaged(repo).length === 2 && staged(repo).length === 0,
  "Later edits remain unstaged",
);
for (const input of [
  "git add nonexistent.txt",
  "git add --all",
  'git commit -m "unclosed',
  "git switch nonexistent",
  "git merge nonexistent",
  "git reset --hard",
]) {
  const result = execute(repo, input);
  check(!result.ok, `Reject ${input}`);
  assert.deepEqual(result.repo, repo);
}
check(
  !execute(createRepo(), 'git commit -m "empty"').ok,
  "Reject empty commit",
);
const untracked = createRepo();
untracked.files["new-note.txt"] = "not tracked yet";
check(execute(untracked, "git.diff").ok === false, "Reject typo");
check(
  execute(untracked, "git diff").output === "No differences.",
  "Diff excludes untracked files",
);
// Branch switching and merging preserve an unrelated working edit.
repo = createRepo();
repo.files["team-notes.md"] += "\nUnfinished idea.\n";
repo = run(repo, "git switch -c feature/sensor");
repo.files["sensor-config.json"] = rate(100);
repo = run(repo, "git add sensor-config.json");
repo = run(repo, 'git commit -m "Improve sensor"');
repo = run(repo, "git switch main");
assert.equal(repo.files["sensor-config.json"], rate(50));
repo = run(repo, "git merge feature/sensor");
check(
  repo.files["team-notes.md"].includes("Unfinished idea"),
  "Preserve unrelated edit",
);
assert.equal(head(repo).tree["team-notes.md"], initialFiles["team-notes.md"]);
// A clean diverged merge has two parents and contains both contributions.
repo = exercises.find((e) => e.id === "merge").seed();
repo = run(repo, "git merge feature/docs");
check(head(repo).parents.length === 2, "Two merge parents");
check(
  head(repo).tree["README.md"].includes("Collect sample data"),
  "Incoming change retained",
);
check(
  head(repo).tree["team-notes.md"].includes("Enclosure design"),
  "Local change retained",
);
check(history(repo).length === 4, "Both histories reachable");
// A conflicting merge is resolved through edits, staging, and a merge commit.
repo = exercises.find((e) => e.id === "conflict").seed();
repo = run(repo, "git merge feature/sensor", false);
check(repo.conflicts.includes("sensor-config.json"), "Conflict reported");
check(
  !execute(repo, 'git commit -m "premature"').ok,
  "Unmerged paths block commit",
);
repo.files["sensor-config.json"] = rate(100);
repo = run(repo, "git add sensor-config.json");
repo = run(repo, 'git commit -m "Resolve sensor settings"');
check(
  head(repo).parents.length === 2 && repo.conflicts.length === 0,
  "Resolution joins histories",
);
assert.equal(head(repo).tree["sensor-config.json"], rate(100));
// Independent line edits within a file combine without a conflict.
repo = seededBranch(
  createRepo(),
  "feature/unit",
  {
    "sensor-config.json": initialFiles["sensor-config.json"].replace(
      "Hz",
      "samples/s",
    ),
  },
  "Clarify unit",
);
repo.files["sensor-config.json"] = rate(100);
repo.index = { ...repo.files };
commit(repo, "Improve rate");
repo = run(repo, "git merge feature/unit");
check(
  head(repo).tree["sensor-config.json"].includes("100") &&
    head(repo).tree["sensor-config.json"].includes("samples/s"),
  "Independent lines merge",
);
// Restore affects either staging or working files; revert adds history.
repo = exercises.find((e) => e.id === "unstage").seed();
const draft = repo.files["README.md"];
repo = run(repo, "git restore --staged README.md");
assert.equal(repo.files["README.md"], draft);
check(staged(repo).length === 0, "Unstage preserves edit");
repo = run(repo, "git restore README.md");
assert.equal(repo.files["README.md"], initialFiles["README.md"]);
repo = exercises.find((e) => e.id === "revert").seed();
const old = repo.commits.length;
repo = run(repo, "git revert HEAD");
check(repo.commits.length === old + 1, "Revert adds commit");
assert.equal(head(repo).tree["sensor-config.json"], rate(50));
// Fetch does not change working files; pull integrates; stale pushes are rejected.
repo = exercises.find((e) => e.id === "remote").seed();
check(!execute(repo, "git push origin main").ok, "Reject stale push");
const before = { ...repo.files };
repo = run(repo, "git fetch origin");
assert.deepEqual(repo.files, before);
repo = run(repo, "git pull origin main");
check(
  repo.files["README.md"].includes("experiment checklist"),
  "Pull integrates",
);
repo.files["sensor-config.json"] = rate(100);
repo = run(repo, "git add sensor-config.json");
repo = run(repo, 'git commit -m "Improve rate"');
repo = run(repo, "git push origin main");
assert.equal(repo.remoteTip, repo.branches.main);
// Solve every authored exercise against its real state predicates.
const solutions = {
  terminal: [["pwd"], ["ls"], ["cat README.md"]],
  initialize: [
    ["git init"],
    ["git status"],
    ["git add .", 'git commit -m "Initial project"'],
  ],
  "first-commit": [
    ["git status"],
    ["git add sensor-config.json"],
    ['git commit -m "Update settings"'],
  ],
  inspect: [["git diff"], ["git restore sensor-config.json"], ["git status"]],
  branch: [
    ["git switch -c feature/sensor"],
    ["edit:100"],
    ["git add sensor-config.json", 'git commit -m "Update settings"'],
    ["git switch main"],
  ],
  merge: [["git branch"], ["git merge feature/docs"], ["git log --oneline"]],
  conflict: [
    ["git merge feature/sensor"],
    ["edit:100"],
    ["git add sensor-config.json"],
    ['git commit -m "Resolve settings"'],
  ],
  "pull-request": [["review"], ["git merge feature/docs", "merged"]],
  remote: [
    ["git fetch origin"],
    ["git pull origin main"],
    ["edit:100"],
    ["git add sensor-config.json", 'git commit -m "Update settings"'],
    ["git push origin main"],
  ],
  unstage: [["git restore --staged README.md"], ["git restore README.md"]],
  revert: [["git revert HEAD"], ["git log --oneline"]],
  capstone: [
    [
      "git switch -c feature/sensor",
      "edit:100",
      "git add sensor-config.json",
      'git commit -m "Improve sampling"',
    ],
    ["git switch main", "git merge feature/sensor"],
  ],
};
for (const exercise of exercises.filter((e) => e.kind !== "sandbox")) {
  const context = {
    repo: exercise.seed(),
    actions: [],
    reviewed: false,
    merged: false,
  };
  for (let i = 0; i < exercise.steps.length; i++) {
    context.actions = [];
    for (const input of solutions[exercise.id][i]) {
      if (input === "edit:100")
        context.repo.files["sensor-config.json"] = rate(100);
      else if (input === "review") context.reviewed = true;
      else if (input === "merged") context.merged = true;
      else {
        const result = execute(context.repo, input);
        context.repo = result.repo;
        if (result.ok || result.repo.conflicts.length)
          context.actions.push(result.action);
      }
    }
    check(
      exercise.steps[i].check(context),
      `${exercise.id} step ${i + 1} is solvable`,
    );
  }
}
console.log(`Passed ${checks} Git model and exercise checks.`);
