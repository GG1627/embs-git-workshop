import { reference, setupChecklist, setupGuides } from "../data/workshop";
import type { Platform } from "../data/workshop";
import { InstructionBlock } from "./PracticeGuide";
import Icon from "./Icon";

export default function SetupReference({ view, platform, onPlatform, setupCompleted, onToggleSetup }: { view: "setup" | "reference"; platform: Platform; onPlatform: (platform: Platform) => void; setupCompleted: number[]; onToggleSetup: (index: number) => void }) {
  return <div className="resource-page">
    <div className="resource-navigation"><a href="#setup" aria-current={view === "setup" ? "page" : undefined}>Before you arrive</a><a href="#reference" aria-current={view === "reference" ? "page" : undefined}>Quick reference</a></div>
    {view === "setup" ? <>
      <div className="article-eyebrow"><span>BEFORE THE WORKSHOP</span><span>Allow time for setup</span></div>
      <h1 tabIndex={-1}>Come ready to make something.</h1><p className="article-lead">Set up your account and tools beforehand, so our hour can be about learning Git. You won't need VS Code.</p>
      <section className="setup-checklist" aria-labelledby="readiness-heading"><h2 id="readiness-heading">Your readiness checklist</h2>{setupChecklist.map((item, i) => <label key={item} className={setupCompleted.includes(i) ? "ready" : ""}><input type="checkbox" checked={setupCompleted.includes(i)} onChange={() => onToggleSetup(i)} /><span>{item}</span></label>)}<p>Check these yourself. Your choices stay in this browser.</p></section>
      <div className="platform-heading"><h2>Set up your computer</h2><div className="platform-options" role="group" aria-label="Operating system">{(Object.keys(setupGuides) as Platform[]).map(key => <button className={platform === key ? "selected" : ""} key={key} aria-pressed={platform === key} onClick={() => onPlatform(key)}>{setupGuides[key].label}</button>)}</div></div>
      <p className="terminal-choice"><Icon name="terminal" />Use {setupGuides[platform].terminal} for the workshop commands.</p>
      <div className="instructions" key={platform}>{setupGuides[platform].blocks.map((block, i) => <InstructionBlock key={i} block={block} index={i} />)}</div>
      <div className="setup-callout"><h2>Before the first push</h2><p>Opening GitHub in your browser and cloning a public repository don't prove that Git can publish changes. Complete the authentication steps above, and leave time for the first push to ask you to sign in.</p><p>If setup isn't working, ask the facilitator for help before the session begins.</p></div>
      <a href="#practice/create" className="button primary">Open the practice guide<Icon name="right" /></a>
    </> : <>
      <div className="article-eyebrow"><span>KEEP THIS HANDY</span><span>Git & GitHub</span></div><h1 tabIndex={-1}>A few commands. A useful habit.</h1><p className="article-lead">Edit, inspect, stage, commit, push. Run these in your cloned repository unless noted.</p>
      <dl className="reference-list">{reference.map(item => <div key={item.command}><dt><code>{item.command}</code></dt><dd>{item.meaning}</dd></div>)}</dl>
      <section className="reference-note"><h2>Three different kinds of saving</h2><div className="three-saves"><p><strong>Save</strong><span>Update the file on your computer.</span></p><Icon name="right" /><p><strong>Commit</strong><span>Record a snapshot in local Git history.</span></p><Icon name="right" /><p><strong>Push</strong><span>Send your commits to GitHub.</span></p></div></section>
      <section className="reference-note"><h2>Ready for another step?</h2><p>Once the basics feel familiar, explore branches and pull requests. Keep conflicts and recovery for a separate practice session.</p><div className="reference-links"><a href="https://docs.github.com/en/get-started/start-your-journey/hello-world" target="_blank" rel="noreferrer">GitHub's branch and pull request guide ↗</a><a href="https://git-scm.com/docs/gittutorial" target="_blank" rel="noreferrer">Git tutorial ↗</a></div></section>
      <a href="#practice/repeat" className="button">Try the workflow again<Icon name="right" /></a>
    </>}
  </div>;
}
