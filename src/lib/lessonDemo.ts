import { createRepo, execute } from "./git.ts";
import type { Repo } from "./git.ts";
import { exercises } from "../data/exercises.ts";

export type Kind = "staging" | "snapshot" | "branch" | "merge" | "conflict" | "remote" | "revert";
export const captions: Record<Kind, string[]> = {
  staging: ["Two working edits. Neither is staged.", "The index has the sensor change. Both working files still exist.", "The checkpoint saves the index. Your note remains uncommitted."],
  snapshot: ["A snapshot is composed in the index.", "The next snapshot includes the selected sensor change.", "A new checkpoint remembers the staged project, including unchanged files."],
  branch: ["main names this checkpoint.", "Two names, one checkpoint. No new commit yet.", "A feature commit moves only feature/sensor.", "HEAD follows main. Working files now show its saved version."],
  merge: ["Two routes share an ancestor and have diverged.", "The new merge checkpoint has two parents."],
  conflict: ["The two branches changed the same setting.", "Git pauses for your content decision. History is intact.", "The resolution is staged. Both histories are ready to join.", "A two-parent commit records the resolved snapshot."],
  remote: ["The shared history has a teammate’s checkpoint.", "Fetch updates origin/main. Your branch and files stay put.", "Pull integrates the fetched checkpoint into main.", "Your local commit is ahead of the shared history.", "Push shares your branch with the simulated remote."],
  revert: ["This checkpoint changed the sensor setting.", "Revert adds an inverse change. The earlier checkpoint stays in history."],
};
export function seed(kind: Kind): Repo {
  if (["merge", "conflict", "remote", "revert"].includes(kind)) return exercises.find((e) => e.id === kind)!.seed();
  if (kind === "branch") return createRepo();
  return exercises.find((e) => e.id === "first-commit")!.seed();
}
export function nextState(kind: Kind, step: number, repo: Repo) {
  let next = structuredClone(repo);
  let command = "";
  if (kind === "staging" || kind === "snapshot") command = step === 0 ? "git add sensor-config.json" : 'git commit -m "Update sensor settings"';
  if (kind === "branch") {
    command = ["git switch -c feature/sensor", 'git add sensor-config.json; git commit -m "Improve sensor"', "git switch main"][step];
    if (step === 1) next.files["sensor-config.json"] = next.files["sensor-config.json"].replace("50", "100");
  }
  if (kind === "merge") command = "git merge feature/docs";
  if (kind === "conflict") {
    command = ["git merge feature/sensor", "git add sensor-config.json", 'git commit -m "Resolve sensor settings"'][step];
    if (step === 1) next.files["sensor-config.json"] = '{\n  "sampleRate": 100,\n  "unit": "Hz"\n}\n';
  }
  if (kind === "remote") {
    command = ["git fetch origin", "git pull origin main", 'git add sensor-config.json; git commit -m "Improve sensor"', "git push origin main"][step];
    if (step === 2) next.files["sensor-config.json"] = next.files["sensor-config.json"].replace("50", "100");
  }
  if (kind === "revert") command = "git revert HEAD";
  for (const part of command.split("; ")) next = execute(next, part).repo;
  return { repo: next, command: command.replaceAll("; ", "\n") };
}
