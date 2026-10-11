import { useState } from "react";
import { head, staged, unstaged } from "../lib/git";
import { repositoryGraph } from "../lib/graph";
import { captions, seed, nextState } from "../lib/lessonDemo";
import type { Kind } from "../lib/lessonDemo";
import Icon from "./Icon";

export default function LessonDemo({ kind }: { kind: Kind }) {
  const [state, setState] = useState(() => ({ repo: seed(kind), step: 0, command: "" }));
  const [inspected, setInspected] = useState<string | null>(null);
  const { repo, step, command } = state;
  const selected = repo.commits.find((c) => c.id === inspected) ?? head(repo);
  const isSnapshot = kind === "staging" || kind === "snapshot";
  const graph = repositoryGraph(repo);
  const rate = (text?: string) => text?.match(/"sampleRate":\s*(\d+)/)?.[1] ?? "—";
  const labels: Record<Kind, string[]> = {
    staging: ["Stage sensor setting", "Save checkpoint"], snapshot: ["Compose snapshot", "Save checkpoint"],
    branch: ["Create feature branch", "Edit & commit on feature", "Switch to main"], merge: ["Merge into main"],
    conflict: ["Try the merge", "Edit to 100 Hz & stage", "Commit resolution"], remote: ["Fetch", "Pull", "Edit & commit locally", "Push"], revert: ["Revert the last commit"],
  };
  return <div className={`lesson-demo ${isSnapshot ? "snapshot-demo" : "route-demo"}`}>
    {isSnapshot ? <div className="snapshot-sequence">
      <section><h3>Working files</h3><div><code>sensor-config.json</code><strong>{rate(repo.files["sensor-config.json"])} Hz</strong><small>{unstaged(repo).includes("sensor-config.json") ? "Working edit" : "Matches index"}</small></div><div><code>team-notes.md</code><small>Working edit · not staged</small></div></section>
      <Icon name="right" />
      <section className="composition"><h3>Next snapshot <small>index</small></h3><div><code>sensor-config.json</code><strong key={rate(repo.index["sensor-config.json"])}>{rate(repo.index["sensor-config.json"])} Hz</strong><small>{staged(repo).length ? "Selected change" : "Matches checkpoint"}</small></div><small>Unchanged project files are included too.</small></section>
      <Icon name="right" />
      <section><h3>Saved checkpoint</h3><span className="commit-dot" /><strong>{rate(head(repo)?.tree["sensor-config.json"])} Hz</strong><code>{head(repo)?.id}</code><small>{head(repo)?.message}</small></section>
    </div> : <div className="lesson-graph">
      <svg viewBox={`0 0 760 ${Math.max(170, graph.lanes * 100 + 40)}`} aria-label="Example repository commit graph">
        {graph.edges.map(({ child, parent }) => {
          const x1 = 80 + (graph.nodes.length - parent.row - 1) * 170, x2 = 80 + (graph.nodes.length - child.row - 1) * 170;
          return <path key={`${child.id}-${parent.id}`} className={`route-line lane-${child.lane % 3}`} d={`M${x1} ${70 + parent.lane * 100} C${x1 + 70} ${70 + parent.lane * 100},${x2 - 70} ${70 + child.lane * 100},${x2} ${70 + child.lane * 100}`} />;
        })}
        {graph.nodes.map((node) => {
          const x = 80 + (graph.nodes.length - node.row - 1) * 170, y = 70 + node.lane * 100;
          return <g key={node.id} role="button" tabIndex={0} aria-label={`Inspect ${node.message}`} aria-pressed={selected?.id === node.id} onClick={() => setInspected(node.id)} onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setInspected(node.id); } }}>
            <circle className="graph-hit-target" cx={x} cy={y} r="23" />
            {node.refs.some((ref) => ref.active) && <circle className="head-ring" cx={x} cy={y} r="17" />}
            <circle className={`route-node lane-${node.lane % 3}`} cx={x} cy={y} r="9" />
            <text x={x} y={y + 33} textAnchor="middle">{node.id}</text>
            {node.refs.map((ref, i) => <text key={ref.name} x={x} y={y - 28 - i * 18} textAnchor="middle" className="demo-ref">{ref.active ? "HEAD → " : ""}{ref.name}</text>)}
            {node.tracking && <text x={x} y={y + 52} textAnchor="middle">origin/main</text>}
            {node.remote && !node.tracking && <text x={x} y={y + 52} textAnchor="middle">remote (simulated)</text>}
          </g>;
        })}
      </svg>
      {kind === "conflict" && step < 3 ? <div className="lesson-alternatives"><span>main: <strong>{rate(head(repo)?.tree["sensor-config.json"])} Hz</strong></span><Icon name="branch" /><span>feature/sensor: <strong>{rate(repo.commits.find(c => c.id === repo.branches["feature/sensor"])?.tree["sensor-config.json"])} Hz</strong></span>{step === 2 && <span>Staged resolution: <strong>{rate(repo.index["sensor-config.json"])} Hz</strong></span>}</div> : <div className="inspected-checkpoint"><code>{selected?.id}</code><span>{selected?.message}</span><span>Saved sensor: <strong>{rate(selected?.tree["sensor-config.json"])} Hz</strong></span></div>}
    </div>}
    <p className="demo-caption" aria-live="polite">{captions[kind][step]}</p>
    <div className="demo-controls"><span className="demo-step">Explore {step + 1} / {captions[kind].length}</span>{step < captions[kind].length - 1 ? <button className="button" onClick={() => { setState({ ...nextState(kind, step, repo), step: step + 1 }); setInspected(null); }}>{labels[kind][step]}<Icon name="right" /></button> : <button className="button" onClick={() => { setState({ repo: seed(kind), step: 0, command: "" }); setInspected(null); }}><Icon name="reset" />Replay example</button>}</div>
    <div className="demo-command"><code>{command || "Example repository · explore at your own pace"}</code></div>
  </div>;
}
