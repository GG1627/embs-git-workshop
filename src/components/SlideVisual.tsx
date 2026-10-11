import gitLogo from "../assets/git.png";
import githubLogo from "../assets/github.png";
import type { Slide } from "../data/lessons";
import Icon from "./Icon";
import LessonDemo from "./LessonDemo";
export default function SlideVisual({ slide }: { slide: Slide }) {
  if (["staging", "snapshot", "branch", "merge", "conflict", "remote"].includes(slide.visual)) return <LessonDemo kind={slide.visual as "staging" | "snapshot" | "branch" | "merge" | "conflict" | "remote"} />;
  if (slide.code === "git revert HEAD") return <LessonDemo kind="revert" />;
  switch (slide.visual) {
    case "welcome":
      return (
        <div className="welcome-visual" aria-label="Illustration: a project grows through saved checkpoints">
          <svg viewBox="0 0 600 170" aria-hidden="true"><path d="M25 122C115 122 105 90 195 90S320 122 370 70S470 48 560 35" />{[[25,122],[195,90],[370,70],[560,35]].map(([x,y]) => <g key={x}><circle className="journey-halo" cx={x} cy={y} r="15" /><circle cx={x} cy={y} r="5" /></g>)}</svg>
          <div className="journey-labels"><span>Explore</span><span>Stage</span><span>Commit</span></div>
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
