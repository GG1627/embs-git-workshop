import assert from "node:assert/strict";
import { seed, nextState, captions } from "../src/lib/lessonDemo.ts";
import { head, staged, unstaged } from "../src/lib/git.ts";

for (const kind of Object.keys(captions)) {
  let repo = seed(kind);
  for (let step = 0; step < captions[kind].length - 1; step++) {
    const before = structuredClone(repo);
    const result = nextState(kind, step, repo);
    assert.deepEqual(repo, before, "Demo advances without mutating its previous state");
    assert.ok(result.command, "Every visual action identifies its corresponding command");
    repo = result.repo;
    if ((kind === "staging" || kind === "snapshot") && step === 0) {
      assert.deepEqual(staged(repo), ["sensor-config.json"]);
      assert.deepEqual(unstaged(repo), ["team-notes.md"]);
      assert.equal(repo.commits.length, 1);
    }
    if (kind === "branch" && step === 0) assert.equal(repo.commits.length, 1);
    if (kind === "conflict" && step === 0) assert.deepEqual(repo.conflicts, ["sensor-config.json"]);
    if (kind === "conflict" && step === 1) { assert.equal(repo.conflicts.length, 0); assert.ok(repo.mergeParent); }
    if (kind === "remote" && step === 0) {
      assert.deepEqual(repo.files, before.files);
      assert.deepEqual(repo.branches, before.branches);
      assert.equal(repo.tracking, repo.remoteTip);
    }
    if (kind === "remote" && step === 2) assert.notEqual(repo.branches.main, repo.remoteTip);
  }
  if (kind === "staging" || kind === "snapshot") {
    assert.equal(repo.commits.length, 2);
    assert.deepEqual(unstaged(repo), ["team-notes.md"]);
    assert.ok(head(repo).tree["sensor-config.json"].includes("100"));
  }
  if (kind === "branch") { assert.equal(repo.branch, "main"); assert.ok(repo.files["sensor-config.json"].includes("50")); }
  if (kind === "merge" || kind === "conflict") assert.equal(head(repo).parents.length, 2);
  if (kind === "remote") { assert.equal(repo.remoteTip, repo.branches.main); assert.equal(repo.commits.length, 3); }
  if (kind === "revert") { assert.equal(repo.commits.length, 3); assert.ok(repo.files["sensor-config.json"].includes("50")); }
}
console.log("All 7 interactive lesson sequences passed.");
