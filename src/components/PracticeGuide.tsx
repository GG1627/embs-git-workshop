import type { GuideBlock, Checkpoint } from "../data/workshop";
import { checkpoints, starterReadme } from "../data/workshop";
import CommandBlock from "./CommandBlock";
import Icon from "./Icon";

export function InstructionBlock({ block, index }: { block: GuideBlock; index: number }) {
  return <section className="instruction">
    <div className="instruction-heading"><span className="instruction-number">{String(index + 1).padStart(2, "0")}</span><h2>{block.title}</h2></div>
    <div className="instruction-content">
      {block.text ? <p>{block.text}</p> : null}
      {block.command ? <CommandBlock command={block.command} /> : null}
      {block.link ? <a className="text-link" href={block.link.href} target="_blank" rel="noreferrer">{block.link.label}<span aria-hidden="true"> ↗</span></a> : null}
      {block.expected ? <div className="expected"><Icon name="check" size={17} /><p><strong>Look for</strong>{block.expected}</p></div> : null}
    </div>
  </section>;
}

export default function PracticeGuide({ checkpoint, completed, onToggle }: { checkpoint: Checkpoint; completed: string[]; onToggle: (id: string) => void }) {
  const index = checkpoints.indexOf(checkpoint);
  const isComplete = completed.includes(checkpoint.id);
  return <div className="guide-layout">
    <aside className="guide-sidebar" aria-label="Practice checkpoints">
      <div className="sidebar-label">THE PRACTICE</div><h2>Your profile README</h2>
      <p className="sidebar-description">One repository. Your own work.</p>
      <nav className="desktop-checkpoints" aria-label="Checkpoints">{checkpoints.map((item, i) => <a href={`#practice/${item.id}`} key={item.id} className={`checkpoint-link ${item.id === checkpoint.id ? "active" : ""}`} aria-current={item.id === checkpoint.id ? "step" : undefined}>
        <span className={`checkpoint-number ${completed.includes(item.id) ? "checked" : ""}`}>{completed.includes(item.id) ? <Icon name="check" size={14} /> : String(i + 1).padStart(2, "0")}</span><span>{item.shortTitle}</span>
        {completed.includes(item.id) ? <span className="sr-only">Marked complete</span> : null}
      </a>)}</nav>
      <details className="mobile-checkpoints" key={checkpoint.id}><summary>{String(index + 1).padStart(2, "0")} / {String(checkpoints.length).padStart(2, "0")} · {checkpoint.shortTitle}</summary><nav aria-label="Checkpoints">{checkpoints.map((item, i) => <a key={item.id} href={`#practice/${item.id}`} className={`checkpoint-link ${item.id === checkpoint.id ? "active" : ""}`} aria-current={item.id === checkpoint.id ? "step" : undefined}><span className="checkpoint-number">{completed.includes(item.id) ? <Icon name="check" size={14} /> : String(i + 1).padStart(2, "0")}</span><span>{item.shortTitle}</span>{completed.includes(item.id) ? <span className="sr-only">Marked complete</span> : null}</a>)}</nav></details>
      <div className="guide-progress"><div className="progress-track" aria-hidden="true"><span style={{ width: `${completed.length / checkpoints.length * 100}%` }} /></div><span>{completed.length} of {checkpoints.length} marked complete</span></div>
      <a className="sidebar-setup" href="#setup"><Icon name="terminal" />Need to set up first?<Icon name="right" size={16} /></a>
    </aside>
    <article className="guide-article" key={checkpoint.id}>
      <div className="article-eyebrow"><span>CHECKPOINT {String(index + 1).padStart(2, "0")} / {String(checkpoints.length).padStart(2, "0")}</span><span>{checkpoint.duration}</span></div>
      <h1 tabIndex={-1}>{checkpoint.title}</h1><p className="article-lead">{checkpoint.summary}</p>
      {index === 0 ? <div className="guide-context"><Icon name="terminal" size={18} /><p>Follow along in your terminal and GitHub. This page is your guide; the checkmarks are yours to track.</p></div> : null}
      <div className="instructions">{checkpoint.blocks.map((block, i) => <InstructionBlock key={`${checkpoint.id}-${i}`} block={block} index={i} />)}</div>
      {checkpoint.id === "edit" ? <details className="starter-example"><summary>A little inspiration for your README</summary><p>Make it yours. A heading and a few lines are enough.</p><CommandBlock command={starterReadme} label="README.md example" /></details> : null}
      <section className="troubleshooting" aria-label="Checkpoint help"><div className="help-heading"><Icon name="book" /><h2>Something not quite right?</h2></div>{checkpoint.help.map(help => <details key={help.title}><summary>{help.title}</summary><p>{help.text}</p></details>)}</section>
      <div className={`completion-check ${isComplete ? "is-complete" : ""}`}><label><input type="checkbox" checked={isComplete} onChange={() => onToggle(checkpoint.id)} /><span>{isComplete ? "Marked complete" : "Mark this checkpoint complete"}</span></label><small>Your checklist, saved in this browser.</small></div>
      <nav className="guide-navigation" aria-label="Practice navigation">{index > 0 ? <a className="button" href={`#practice/${checkpoints[index - 1].id}`}><Icon name="left" />Previous</a> : <a className="button" href="#setup">Setup checklist</a>}{index < checkpoints.length - 1 ? <a className="button primary" href={`#practice/${checkpoints[index + 1].id}`}>Next checkpoint<Icon name="right" /></a> : <a className="button primary" href="#slides/recap">Back to the recap<Icon name="right" /></a>}</nav>
      <a className="related-slide" href={`#slides/${checkpoint.slide}`}>See the related explanation<Icon name="right" size={15} /></a>
    </article>
  </div>;
}
