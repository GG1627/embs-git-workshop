import { useState } from "react";
import { diffTrees, head, staged, unstaged } from "../lib/git";
import type { Repo } from "../lib/git";
import Icon from "./Icon";
export default function Files({
  repo,
  onEdit,
  preferred,
}: {
  repo: Repo;
  onEdit: (file: string, content: string) => void;
  preferred?: string;
}) {
  const [selected, setSelected] = useState(preferred ?? "sensor-config.json");
  const [view, setView] = useState<"edit" | "diff">("edit");
  const [comparison, setComparison] = useState<"working" | "staged">("working");
  const files = Object.keys(repo.files),
    file = files.includes(selected) ? selected : files[0];
  const modified = unstaged(repo),
    ready = staged(repo);
  const before = comparison === "working" ? repo.index : head(repo)?.tree ?? {};
  const after = comparison === "working" ? repo.files : repo.index;
  const untracked = comparison === "working" && !(file in repo.index);
  return (
    <section className="files-panel" aria-label="Project files">
      <div className="panel-header">
        <label className="file-picker">
          <Icon name="file" />
          <select
            aria-label="Choose file"
            value={file}
            onChange={(e) => setSelected(e.target.value)}
          >
            {files.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <div className="file-view-switch">
          <button
            aria-pressed={view === "edit"}
            onClick={() => setView("edit")}
          >
            Edit
          </button>
          <button
            aria-pressed={view === "diff"}
            onClick={() => setView("diff")}
          >
            Diff
          </button>
        </div>
      </div>
      {view === "edit" ? (
        <textarea
          aria-label={`Edit ${file}`}
          value={repo.files[file] ?? ""}
          onChange={(e) => onEdit(file, e.target.value)}
          spellCheck={false}
        />
      ) : (
        <div>
        <label className="file-diff-label">Compare <select aria-label="Diff comparison" value={comparison} onChange={(event) => setComparison(event.target.value as "working" | "staged")}><option value="working">Index → working file (git diff)</option><option value="staged">HEAD → index (git diff --staged)</option></select></label>
        <pre className="file-diff">
          {(untracked ? "This file is untracked. git diff does not include it until it is staged." : diffTrees(file in before ? { [file]: before[file] } : {}, file in after ? { [file]: after[file] } : {}))
            .split("\n")
            .map((line, i) => (
              <span
                key={i}
                className={
                  line.startsWith("+")
                    ? "added-line"
                    : line.startsWith("-")
                      ? "removed-line"
                      : ""
                }
              >
                {line}
                {"\n"}
              </span>
            ))}
        </pre>
        </div>
      )}
      <div className="file-status">
        <span>
          <Icon name="branch" size={14} />
          {repo.branch}
        </span>
        <span>
          {ready.includes(file) ? "Staged" : ""}
          {ready.includes(file) && modified.includes(file) ? " · " : ""}
          {modified.includes(file)
            ? "Working edit"
            : !ready.includes(file)
              ? "Unchanged"
              : ""}
        </span>
        <span>Edits save automatically</span>
      </div>
    </section>
  );
}
