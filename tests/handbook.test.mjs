import assert from "node:assert/strict";
import { checkpoints, setupChecklist, slides } from "../src/data/workshop.ts";
import { defaultState, readState, resolveHash, stateHash, storageKey } from "../src/lib/handbook.ts";

const slideIds = new Set(slides.map(({ id }) => id));
const checkpointIds = new Set(checkpoints.map(({ id }) => id));
assert.equal(slideIds.size, slides.length, "Slide links must be unique");
assert.equal(checkpointIds.size, checkpoints.length, "Guide links must be unique");
assert.ok(slides.length <= 20, "The core deck must retain its short workshop budget");
for (const slide of slides) {
  if (slide.practice) assert.ok(checkpointIds.has(slide.practice), `${slide.id} links to an existing guide checkpoint`);
  assert.ok(slide.notes.trim(), `${slide.id} has presenter notes`);
}
for (const checkpoint of checkpoints) {
  assert.ok(slideIds.has(checkpoint.slide), `${checkpoint.id} links to a real lesson`);
  assert.ok(checkpoint.blocks.length, `${checkpoint.id} contains actions`);
}

const blank = defaultState();
assert.equal(storageKey, "uf-embs-git-workshop-v4");
for (const raw of [null, "", "{", "null", "[]", "7", '"text"', '{"version":3,"completed":["publish"]}', '{"version":2}']) {
  assert.deepEqual(readState(raw), blank, `Malformed or simulator storage must not become real guide completion: ${raw}`);
}
const original = {
  version: 4, view: "practice", slide: "staging", checkpoint: "commit",
  completed: ["create", "commit"], setupCompleted: [0, setupChecklist.length - 1], platform: "mac",
};
assert.deepEqual(readState(JSON.stringify(original)), original, "Valid progress round-trips");
const dirty = readState(JSON.stringify({
  ...original, view: "admin", slide: "removed", checkpoint: "removed", platform: "unsupported",
  completed: ["create", "create", "conflict", null, 3], setupCompleted: [0, 0, -1, 1.5, "1", setupChecklist.length, null],
}));
assert.equal(dirty.view, blank.view);
assert.equal(dirty.slide, blank.slide);
assert.equal(dirty.checkpoint, blank.checkpoint);
assert.equal(dirty.platform, blank.platform);
assert.deepEqual(dirty.completed, ["create"]);
assert.deepEqual(dirty.setupCompleted, [0]);
assert.deepEqual(readState('{"version":4,"completed":{},"setupCompleted":true}').completed, []);
const independent = defaultState();
independent.completed.push("create");
assert.deepEqual(defaultState().completed, [], "Defaults must not share mutable arrays");

for (const slide of slides) {
  const next = resolveHash(`#slides/${slide.id}`, original);
  assert.equal(next.state.slide, slide.id);
  assert.equal(next.state.checkpoint, original.checkpoint, "Slide navigation preserves guide position");
  assert.deepEqual(next.state.completed, original.completed);
  assert.equal(stateHash(next.state), `#slides/${slide.id}`);
  assert.equal(next.notice, null);
}
for (const checkpoint of checkpoints) {
  const next = resolveHash(`#practice/${checkpoint.id}`, original);
  assert.equal(next.state.checkpoint, checkpoint.id);
  assert.equal(next.state.slide, original.slide, "Guide navigation preserves slide position");
  assert.equal(stateHash(next.state), `#practice/${checkpoint.id}`);
}
for (const view of ["setup", "reference"]) {
  const next = resolveHash(`#${view}`, original);
  assert.equal(next.state.view, view);
  assert.equal(next.state.slide, original.slide);
  assert.equal(next.state.checkpoint, original.checkpoint);
  assert.equal(stateHash(next.state), `#${view}`);
}
for (const hash of ["", "#", "#main"]) assert.deepEqual(resolveHash(hash, original), { state: original, notice: null });
assert.equal(resolveHash("#slides", original).state.slide, original.slide);
assert.equal(resolveHash("#practice", original).state.checkpoint, original.checkpoint);
assert.equal(resolveHash("#slides/what-git", original).state.slide, "tools");
assert.equal(resolveHash("#slides/log", original).state.slide, "history");
assert.equal(resolveHash("#slides/24", original).state.slide, "history", "Legacy numeric slides retain topic meaning");
assert.equal(resolveHash("#slides/32", original).state.slide, "clone");
assert.equal(resolveHash("#slides/conflict", original).state.slide, "recap");
assert.ok(resolveHash("#slides/conflict", original).notice);
assert.equal(resolveHash("#practice/first-commit", original).state.checkpoint, "commit");
const retired = resolveHash("#practice/conflict", original);
assert.equal(retired.state.checkpoint, "create");
assert.ok(retired.notice.includes("replaced"));
for (const hash of ["#slides/unknown", "#slides/0", "#slides/9999999999999999999999999999999", "#slides/%E0%A4%A", "#slides/%2Fetc", "#slides/__proto__", "#setup/other", "#unknown", "#practice/constructor"]) {
  const result = resolveHash(hash, original);
  assert.ok(slideIds.has(result.state.slide));
  assert.ok(checkpointIds.has(result.state.checkpoint));
  assert.ok(result.notice, `Invalid routes need an explanation: ${hash}`);
  assert.deepEqual(result.state.completed, original.completed, "Routes cannot invent or erase completion");
}
assert.equal(original.slide, "staging", "Navigation is immutable");
console.log(`Handbook checks passed: ${slides.length} slide links, ${checkpoints.length} guide links, persisted progress, malformed data, and legacy routes.`);
