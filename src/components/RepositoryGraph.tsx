import { useState } from "react";
import type { Repo, Tree } from "../lib/git";
import { head } from "../lib/git";
import { repositoryGraph } from "../lib/graph";

export function Snapshot({ tree }: { tree: Tree }) {
  return <div className="snapshot-files">{Object.entries(tree).map(([file, content]) =>
    <details key={file}><summary><code>{file}</code></summary><pre>{content}</pre></details>
  )}{!Object.keys(tree).length && <p>No files in this snapshot.</p>}</div>;
}

export default function RepositoryGraph({ repo }: { repo: Repo }) {
  const [selected, setSelected] = useState<string | null>(null);
  const graph = repositoryGraph(repo);
  const current = repo.commits.find((c) => c.id === selected) ?? head(repo);
  const width = Math.max(40, graph.lanes * 28 + 12);
  return <section className="repository-history" aria-label="All repository history">
    <div className="graph-heading"><h2>Saved checkpoints</h2><span>HEAD → {repo.branch}</span></div>
    <p className="graph-caption">Select a commit to inspect it. Your active branch stays put.</p>
    {!graph.nodes.length ? <p className="empty-state">No checkpoints yet. Stage files, then make your first commit.</p> : <>
      <div className="graph-scroll">
        <div className="graph-map" style={{ paddingLeft: width }}>
          <svg width={width} height={graph.nodes.length * 86} aria-hidden="true">
            {graph.edges.map(({ child, parent }) => <path key={`${child.id}-${parent.id}`}
              className={`route-line lane-${child.lane % 3}`}
              d={`M${16 + child.lane * 28} ${child.row * 86 + 34} C${16 + child.lane * 28} ${parent.row * 86 + 12},${16 + parent.lane * 28} ${child.row * 86 + 54},${16 + parent.lane * 28} ${parent.row * 86 + 34}`} />)}
            {graph.nodes.map((node) => <g key={node.id}>
              {repo.branches[repo.branch] === node.id && <circle className="head-ring" cx={16 + node.lane * 28} cy={node.row * 86 + 34} r="12" />}
              <circle className={`route-node lane-${node.lane % 3}`} cx={16 + node.lane * 28} cy={node.row * 86 + 34} r="6" />
            </g>)}
          </svg>
          {graph.nodes.map((node) => <button className="checkpoint" key={node.id} aria-pressed={current?.id === node.id} onClick={() => setSelected(node.id)}>
            <span className="checkpoint-refs">{node.refs.map((ref) => <span key={ref.name} className={ref.active ? "active-ref" : ""}>{ref.active ? "HEAD → " : ""}{ref.name}</span>)}{node.tracking && <span>origin/main · fetched</span>}{node.remote && <span>remote · simulated</span>}</span>
            <strong>{node.message}</strong><small><code>{node.id}</code> · {node.parents.length === 2 ? "merge · 2 parents" : node.parents.length ? "1 parent" : "root commit"}</small>
          </button>)}
        </div>
      </div>
      {current && <div className="checkpoint-inspector" key={current.id}>
        <h3>Snapshot · <code>{current.id}</code></h3>
        <p>{current.message}</p>
        <p className="graph-caption">Parents: {current.parents.join(", ") || "none — the first checkpoint"}</p>
        <Snapshot tree={current.tree} />
      </div>}
    </>}
    {Object.entries(repo.branches).filter(([, id]) => !id).map(([name]) => <p key={name}>{name}: waiting for its first commit</p>)}
  </section>;
}
