import type { Repo } from "./git.ts";

/** Every stored checkpoint, including inactive branches and simulated remote history. */
export function repositoryGraph(repo: Repo) {
  const commits = new Map(repo.commits.map((commit) => [commit.id, commit]));
  const lanes = new Map<string, number>();
  let nextLane = 0;
  function follow(id: string | null) {
    if (!id || lanes.has(id) || !commits.has(id)) return;
    const lane = nextLane++;
    while (id && !lanes.has(id) && commits.has(id)) {
      lanes.set(id, lane);
      id = commits.get(id)!.parents[0] ?? null;
    }
  }
  follow(repo.branches.main ?? null);
  Object.values(repo.branches).forEach(follow);
  follow(repo.tracking);
  follow(repo.remoteTip);
  repo.commits.toReversed().forEach((commit) => follow(commit.id));
  const depths = new Map<string, number>();
  function depth(id: string): number {
    if (depths.has(id)) return depths.get(id)!;
    const parents = commits.get(id)?.parents ?? [];
    const value = parents.length ? 1 + Math.max(...parents.map(depth)) : 0;
    depths.set(id, value);
    return value;
  }
  const ordered = repo.commits.toReversed().sort((a, b) => depth(b.id) - depth(a.id));
  const nodes = ordered.map((commit, row) => ({
    ...commit,
    row,
    lane: lanes.get(commit.id)!,
    refs: Object.entries(repo.branches)
      .filter(([, id]) => id === commit.id)
      .map(([name]) => ({ name, active: name === repo.branch })),
    tracking: repo.tracking === commit.id,
    remote: repo.remoteTip === commit.id,
  }));
  const positions = new Map(nodes.map((node) => [node.id, node]));
  const edges = nodes.flatMap((node) => node.parents.flatMap((id) => {
    const parent = positions.get(id);
    return parent ? [{ child: node, parent }] : [];
  }));
  return { nodes, edges, lanes: nextLane };
}
