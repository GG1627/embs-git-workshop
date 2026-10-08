import gitLogo from "../assets/git.png";
import githubLogo from "../assets/github.png";
import type { Slide } from "../data/lessons";
import Icon from "./Icon";
export default function SlideVisual({ slide }: { slide: Slide }) {
  switch (slide.visual) {
    case "welcome":
      return (
        <div className="welcome-visual">
          <img src={gitLogo} alt="Git" />
          <span className="visual-divider" />
          <img className="github-logo" src={githubLogo} alt="GitHub" />
        </div>
      );
    case "tools":
      return (
        <div className="tool-comparison">
          <div>
            <img src={gitLogo} alt="" />
            <strong>Git</strong>
            <span>Your project’s history</span>
          </div>
          <span className="visual-divider" />
          <div>
            <img className="github-logo" src={githubLogo} alt="" />
            <strong>GitHub</strong>
            <span>Your team’s shared workspace</span>
          </div>
        </div>
      );
    case "versions":
      return (
        <div className="version-list">
          {[
            "project_final.txt",
            "project_final_v2.txt",
            "project_final_REALLY_FINAL.txt",
          ].map((f, i) => (
            <div key={f}>
              <Icon name="file" />
              <code>{f}</code>
              <span>{i === 2 ? "?" : ""}</span>
            </div>
          ))}
        </div>
      );
    case "command":
      return (
        <div className="slide-command">
          <span aria-hidden="true">$</span>
          <code>{slide.code}</code>
        </div>
      );
    case "snapshot":
      return (
        <div className="snapshot-diagram">
          <div className="diagram-file">
            <Icon name="file" size={65} />
            <code>sensor-config.json</code>
          </div>
          <span className="long-arrow" aria-hidden="true" />
          <div className="snapshot-result">
            <span className="commit-dot" />
            <code>Update sensor settings</code>
          </div>
        </div>
      );
    case "staging":
      return (
        <div className="staging-diagram">
          <div className="diagram-file">
            <Icon name="file" size={48} />
            <code>sensor-config.json</code>
          </div>
          <span className="long-arrow" aria-hidden="true" />
          <div className="stage-box">
            <Icon name="check" />
            <span>Ready for the next commit</span>
          </div>
        </div>
      );
    case "history":
      return (
        <div className="history-diagram">
          {(
            slide.labels ?? [
              "Start the project",
              "Add the sensor",
              "Update settings",
            ]
          ).map((label, i) => (
            <div className="history-point" key={label}>
              <span className="commit-dot" />
              <span>{label}</span>
              {i < 2 ? <i /> : null}
            </div>
          ))}
        </div>
      );
    case "branch":
    case "merge":
      return (
        <div className="branch-diagram">
          <svg
            viewBox="0 0 540 150"
            role="img"
            aria-label={
              slide.visual === "merge"
                ? "Main and feature histories join in a merge commit"
                : "Feature history branches from main"
            }
          >
            <path d="M40 45H500" />
            <path
              className="feature-line"
              d={
                slide.visual === "merge"
                  ? "M140 45C180 45 170 115 220 115H330C380 115 370 45 410 45"
                  : "M140 45C180 45 170 115 220 115H410"
              }
            />
            {[40, 140, 280, 410, 500].map((x) => (
              <circle key={x} cx={x} cy="45" r="8" />
            ))}
            {[220, 330].map((x) => (
              <circle className="feature-node" key={x} cx={x} cy="115" r="8" />
            ))}
          </svg>
          <div className="branch-labels">
            <code>main</code>
            <code>feature/sensor</code>
          </div>
        </div>
      );
    case "conflict":
      return (
        <div className="conflict-example">
          <code>
            <span>{"<<<<<<< HEAD"}</span>
            {'\n  "sampleRate": 75\n'}
            <span>{"======="}</span>
            {'\n  "sampleRate": 100\n'}
            <span>{">>>>>>> feature/sensor"}</span>
          </code>
        </div>
      );
    case "pr":
      return (
        <div className="pr-diagram">
          <Icon name="branch" size={34} />
          <div>
            <strong>Document the next experiment</strong>
            <span>
              <code>feature/docs</code>
              <Icon name="right" size={14} />
              <code>main</code>
            </span>
          </div>
          <span className="pr-open">Open</span>
        </div>
      );
    case "remote":
      return (
        <div className="remote-diagram">
          <div>
            <Icon name="terminal" size={42} />
            <span>Your local project</span>
          </div>
          <span className="long-arrow" aria-hidden="true" />
          <div>
            <Icon name="book" size={42} />
            <span>The shared remote</span>
          </div>
        </div>
      );
    case "files":
      return (
        <div className="simple-files">
          {["README.md", "sensor-config.json", "team-notes.md"].map((f) => (
            <div key={f}>
              <Icon name="file" />
              <code>{f}</code>
            </div>
          ))}
        </div>
      );
    case "question":
      return (
        <div className="question-mark" aria-hidden="true">
          ?
        </div>
      );
    case "recap":
      return (
        <div className="recap-line">
          <span>Inspect</span>
          <Icon name="right" />
          <span>Stage</span>
          <Icon name="right" />
          <span>Commit</span>
        </div>
      );
  }
}
