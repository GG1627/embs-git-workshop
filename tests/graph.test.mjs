import assert from "node:assert/strict";
import { createRepo, execute, head } from "../src/lib/git.ts";
import { repositoryGraph } from "../src/lib/graph.ts";
import { exercises } from "../src/data/exercises.ts";

let checks = 0;
function verify(repo) {
  const graph = repositoryGraph(repo);
  assert.equal(graph.nodes.length, repo.commits.length);
  assert.equal(graph.edges.length, repo.commits.reduce((sum, c) => sum + c.parents.length, 0));
  for (const { child, parent } of graph.edges) assert.ok(child.row < parent.row, "Parents precede children in ancestry");
  for (const [name, id] of Object.entries(repo.branches)) {
    if (id) assert.ok(graph.nodes.find((node) => node.id === id).refs.some((ref) => ref.name === name && ref.active === (name === repo.branch)));
  }
  checks++;
  return graph;
}
let repo = createRepo();
const root = head(repo).id;
repo = execute(repo, "git switch -c feature/sensor").repo;
let graph = verify(repo);
assert.equal(graph.nodes.length, 1, "A branch name alone adds no commits");
assert.equal(graph.nodes[0].refs.length, 2);
repo.files["sensor-config.json"] = repo.files["sensor-config.json"].replace("50", "100");
repo = execute(repo, "git add sensor-config.json").repo;
repo = execute(repo, 'git commit -m "Improve sensor"').repo;
repo = execute(repo, "git switch main").repo;
graph = verify(repo);
assert.equal(graph.nodes.length, 2, "Inactive branch commits stay visible");
assert.equal(graph.nodes.find((n) => n.id === root).refs[0].active, true);
assert.notEqual(graph.nodes[0].lane, graph.nodes[1].lane, "Feature has a separate route");
repo = execute(repo, "git merge feature/sensor").repo;
assert.equal(verify(repo).nodes.length, 2, "Fast-forward does not fabricate a merge commit");

repo = exercises.find((e) => e.id === "merge").seed();
verify(repo);
repo = execute(repo, "git merge feature/docs").repo;
graph = verify(repo);
assert.equal(graph.edges.filter((edge) => edge.child.id === head(repo).id).length, 2);
assert.equal(new Set(graph.nodes.map((node) => node.id)).size, repo.commits.length, "Shared ancestors are not duplicated");

repo = exercises.find((e) => e.id === "remote").seed();
graph = verify(repo);
assert.ok(graph.nodes.some((node) => node.remote));
repo = execute(repo, "git fetch origin").repo;
assert.ok(verify(repo).nodes.some((node) => node.tracking && node.remote));

repo = exercises.find((e) => e.id === "revert").seed();
const oldIds = repo.commits.map((c) => c.id);
repo = execute(repo, "git revert HEAD").repo;
graph = verify(repo);
assert.equal(graph.nodes.length, oldIds.length + 1);
assert.ok(oldIds.every((id) => graph.nodes.some((node) => node.id === id)));
assert.deepEqual(repositoryGraph(JSON.parse(JSON.stringify(repo))), graph, "Reload derives the same topology");
assert.equal(repositoryGraph(createRepo(false)).nodes.length, 0);
// Ordering is derived from ancestry, even if serialized commits are reordered.
repo.commits.reverse();
verify(repo);
console.log(`Repository graph: ${checks} scenarios passed.`);
