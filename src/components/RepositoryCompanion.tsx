import { changed, diffTrees, head, staged, unstaged } from "../lib/git";
import type { Repo } from "../lib/git";
import { Snapshot } from "./RepositoryGraph";
import Icon from "./Icon";

const analogies: Record<string, string> = {
  terminal: "Your working files are the project on your desk. Reading them changes nothing.",
  initialize: "A repository gives your project a memory. Its first checkpoint still needs a commit.",
  "first-commit": "Compose the next checkpoint. Staging copies content into the index; your working files stay here.",
  inspect: "Compare two moments. A diff tells you exactly which content changed.",
  branch: "A branch is a named route to a checkpoint. Creating a name does not copy history.",
  merge: "Bring two routes together. A fast-forward moves a name; a merge commit has two parents.",
  conflict: "Two histories, one decision. Edit the intended result, stage it, then commit.",
  remote: "A shared history elsewhere. Fetch updates origin/main; pull integrates; push shares.",
  unstage: "Recompose the snapshot. Unstaging keeps your working edits.",
  restore: "Restore replaces a working file with its index contents. Preview that replacement below.",
  revert: "Add a checkpoint that reverses a change. Earlier history stays visible.",
  capstone: "Choose which changes travel together. The notes can stay on your desk.",
  sandbox: "Explore freely. Every checkpoint and branch here comes from your commands.",
  "pull-request": "Review the change before joining the histories. This review is simulated.",
};
export default function RepositoryCompanion({ repo, exercise, onHistory }: { repo: Repo; exercise: string; onHistory: () => void }) {
  const ready = staged(repo), pending = unstaged(repo), saved = head(repo);
  const incoming = repo.commits.find((c) => c.id === repo.mergeParent);
  const incomingNames = Object.entries(repo.branches).filter(([, id]) => id === repo.mergeParent).map(([name]) => name).join(", ");
  return <aside className="repository-companion" aria-label="Live repository state">
    <div className="companion-heading"><Icon name="branch" /><h2>Your repository</h2><span>{repo.branch}</span></div>
    <p className="analogy">{analogies[exercise] ?? "Working files, the next snapshot, and saved history: three different moments."}</p>
    <div className="state-summary" aria-live="polite">{ready.length} staged change{ready.length === 1 ? "" : "s"} · {pending.length} working edit{pending.length === 1 ? "" : "s"} · {repo.commits.length} checkpoint{repo.commits.length === 1 ? "" : "s"}</div>
    {incoming && <section className="conflict-comparison"><h3>{repo.conflicts.length ? "Choose the intended content" : "Resolution staged — ready to commit"}</h3>
      {(repo.conflicts.length ? repo.conflicts : changed(saved?.tree ?? {}, incoming.tree)).map((file) => <details key={file} open={repo.conflicts.includes(file)}><summary><code>{file}</code></summary>
        <strong>{repo.branch} · current</strong><pre>{saved?.tree[file] ?? "(deleted)"}</pre>
        <strong>{incomingNames || incoming.id} · incoming</strong><pre>{incoming.tree[file] ?? "(deleted)"}</pre>
      </details>)}<p>Use Files to edit the result. Both parents will remain in history.</p></section>}
    <section className="working-state"><h3><Icon name="file" size={16} /> Working files</h3>
      {[...new Set([...Object.keys(repo.files), ...Object.keys(repo.index)])].sort().map((file) => <details key={file}>
        <summary><code>{file}</code><span className={pending.includes(file) ? "status-edited" : "status-clean"}>{repo.conflicts.includes(file) ? "conflict" : !(file in repo.files) ? "deleted" : !(file in repo.index) ? "untracked" : pending.includes(file) ? "edited" : ready.includes(file) ? "staged" : "unchanged"}</span></summary>
        <pre>{repo.files[file] ?? "(deleted from working files)"}</pre>
      </details>)}
    </section>
    <section className="next-snapshot"><h3><Icon name="check" size={16} /> Next snapshot <small>index</small></h3>
      <p>{ready.length ? "Selected changes for the next commit:" : saved ? "No staged changes. The index matches the last checkpoint." : "No files staged yet. Compose your first snapshot."}</p>
      {ready.map((file) => <div className="staged-file" key={`${file}-${repo.index[file]}`}><Icon name="check" size={14} /><code>{file}</code><span>{file in repo.index ? "selected" : "deletion"}</span></div>)}
      <details className="index-preview"><summary>Inspect full staged snapshot</summary><Snapshot tree={repo.index} /></details>
    </section>
    <details className="comparison-preview"><summary>Compare working files → index</summary><p>Working content (−) and its staged replacement (+). <code>git restore &lt;file&gt;</code> replaces a tracked file with this index version.</p><pre>{diffTrees(repo.files, repo.index)}</pre></details>
    {(repo.remoteTip || repo.tracking) && <p className="remote-state">Simulated remote: <code>{repo.remoteTip ?? "none"}</code><br />Last fetched: <code>{repo.tracking ?? "not fetched"}</code><br />Local HEAD: <code>{saved?.id ?? "none"}</code></p>}
    <button className="history-peek" onClick={onHistory}><span><small>Latest on {repo.branch}</small><strong>{saved?.message ?? "No saved checkpoint yet"}</strong></span><Icon name="right" /></button>
  </aside>;
}
