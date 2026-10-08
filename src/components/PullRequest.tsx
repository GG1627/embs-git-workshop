import { useState } from "react";
import type { Repo } from "../lib/git";
import { diffTrees, head } from "../lib/git";
import Icon from "./Icon";
export default function PullRequest({
  repo,
  reviewed,
  merged,
  onReview,
  onMerge,
}: {
  repo: Repo;
  reviewed: boolean;
  merged: boolean;
  onReview: () => void;
  onMerge: () => void;
}) {
  const [tab, setTab] = useState<"conversation" | "files">("conversation");
  const feature = repo.commits.find(
    (c) => c.id === repo.branches["feature/docs"],
  )!;
  return (
    <section className="pull-request-panel">
      <div className="pr-heading">
        <h2>
          Document the next experiment <span>#1</span>
        </h2>
        <div>
          <span className={merged ? "pr-merged" : "pr-open"}>
            <Icon name="branch" size={14} />
            {merged ? "Merged" : "Open"}
          </span>
          <span>
            Maya wants to merge <code>feature/docs</code> into <code>main</code>
          </span>
        </div>
      </div>
      <div className="pr-tabs">
        <button
          aria-pressed={tab === "conversation"}
          onClick={() => setTab("conversation")}
        >
          Conversation
        </button>
        <button aria-pressed={tab === "files"} onClick={() => setTab("files")}>
          Files changed <span>1</span>
        </button>
      </div>
      {tab === "files" ? (
        <div className="pr-content">
          <div className="panel-header">
            <span>README.md</span>
            <button className="button" disabled={reviewed} onClick={onReview}>
              <Icon name="check" />
              {reviewed ? "Reviewed" : "Mark as reviewed"}
            </button>
          </div>
          <pre className="file-diff">
            {diffTrees(head(repo)!.tree, feature.tree)
              .split("\n")
              .map((line, i) => (
                <span
                  key={i}
                  className={line.startsWith("+") ? "added-line" : ""}
                >
                  {line}
                  {"\n"}
                </span>
              ))}
          </pre>
        </div>
      ) : (
        <div className="pr-content">
          <div className="review-comment">
            <strong>Maya</strong>
            <p>
              I added a note for our next experiment. Could you check the README
              before we merge?
            </p>
          </div>
          <div className="merge-area">
            <Icon name="check" />
            <div>
              <strong>
                {merged
                  ? "The change is now on main."
                  : reviewed
                    ? "Reviewed and ready to merge"
                    : "Review the files before merging"}
              </strong>
              <p>
                {merged
                  ? "Your team’s history now includes the documentation update."
                  : "There are no conflicts with the base branch."}
              </p>
            </div>
            <button
              className="button primary"
              disabled={!reviewed || merged}
              onClick={onMerge}
            >
              {merged ? "Merged" : "Merge pull request"}
            </button>
          </div>
        </div>
      )}
      <div className="simulation-note">
        Simulated pull request · No GitHub account required
      </div>
    </section>
  );
}
