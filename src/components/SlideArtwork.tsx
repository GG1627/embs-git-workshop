import type { ReactNode } from "react";
import type { WorkshopSlide } from "../data/workshop";
import Icon from "./Icon";
import "./SlideArtwork.css";

function FileMark({ className = "" }: { className?: string }) {
  return <svg className={`art-file-mark ${className}`} viewBox="0 0 64 80" fill="none" aria-hidden="true"><path d="M8 2h31l17 17v59H8V2Z" stroke="currentColor" strokeWidth="2.5"/><path d="M39 2v18h17M20 38h24M20 49h24M20 60h15" stroke="currentColor" strokeWidth="2.5"/></svg>;
}

function Laptop({ children }: { children?: ReactNode }) {
  return <div className="art-laptop"><div className="art-laptop-screen">{children ?? <><FileMark /><code>README.md</code></>}</div><div className="art-laptop-base" /></div>;
}

function Remote({ children }: { children?: ReactNode }) {
  return <div className="art-remote"><svg viewBox="0 0 100 72" fill="none" aria-hidden="true"><path d="M22 59C2 59 2 28 23 27 25 2 59-3 70 21 96 14 109 52 83 59H22Z" stroke="currentColor" strokeWidth="2"/><path d="M44 30v18m12-18v6c0 9-12 4-12 12" stroke="currentColor" strokeWidth="2"/><circle cx="44" cy="27" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="56" cy="27" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="44" cy="51" r="3" stroke="currentColor" strokeWidth="2"/></svg>{children}</div>;
}

function Command({ children }: { children: ReactNode }) {
  return <div className="art-command"><span aria-hidden="true">$</span><code>{children}</code></div>;
}

function Arrow({ label, reverse = false }: { label?: string; reverse?: boolean }) {
  return <div className={`art-arrow ${reverse ? "art-arrow-reverse" : ""}`}><span>{label}</span><svg viewBox="0 0 150 24" fill="none" aria-hidden="true"><path d="M2 12h143m-12-10 12 10-12 10" stroke="currentColor" strokeWidth="2"/></svg></div>;
}

function Profile({ published = false }: { published?: boolean }) {
  return <div className="art-profile-paper"><div className="art-profile-top"><div className="art-avatar">ar<span /></div><div><strong>Alex Rivera</strong><span>alex-rivera</span></div>{published ? <span className="art-live-badge"><Icon name="check" size={14} /> Published</span> : null}</div><div className="art-profile-readme"><div className="art-paper-label"><Icon name="file" size={16} /><code>alex-rivera / README.md</code></div><h2>Hi, I’m Alex.</h2><p>Biomedical engineering student.</p><div className="art-profile-rule"/><h3>A little about me</h3><p>I’m interested in medical devices<br/>and learning how things work.</p><div className="art-interest-tags"><span>Biomedical engineering</span><span>Learning Git</span></div></div></div>;
}

function History({ count = 3, compact = false }: { count?: number; compact?: boolean }) {
  const entries = [{ hash: "e7c91a2", title: "Add a learning goal" }, { hash: "c4f82b1", title: "Introduce myself" }, { hash: "a1b2c3d", title: "Initial commit" }].slice(3 - count);
  return <div className={`art-history ${compact ? "art-history-compact" : ""}`}>{entries.map((entry, index) => <div className="art-history-row" key={entry.hash}><span className={`art-history-dot ${index === 0 ? "art-history-current" : ""}`}/><code>{entry.hash}</code><span>{entry.title}</span>{index === 0 ? <small>latest</small> : null}</div>)}</div>;
}

function Diagram({ name, children, kind = "" }: { name: string; children: ReactNode; kind?: string }) {
  return <figure className={`slide-artwork art-${kind}`} aria-label={name}>{children}</figure>;
}

export default function SlideArtwork({ slide }: { slide: WorkshopSlide }) {
  switch (slide.visual) {
    case "welcome":
      return <Diagram name="A README becomes a personal GitHub profile. Example profile for Alex Rivera, a biomedical engineering student." kind="welcome"><div className="art-welcome-file"><FileMark/><code>README.md</code><span>A small file.<br/>Your own starting point.</span></div><Arrow/><Profile/></Diagram>;
    case "versions":
      return <Diagram name="Two saved README versions: an introduction, then the same introduction plus a learning goal. Each version has its own named commit." kind="versions"><div className="art-version-pair"><div className="art-version"><span className="art-paper-label">01 / Introduce myself</span><code># Hi, I’m Alex.</code><span>Biomedical engineering student.</span><div className="art-version-blank"/></div><div className="art-version art-version-new"><span className="art-paper-label">02 / Add a learning goal</span><code># Hi, I’m Alex.</code><span>Biomedical engineering student.</span><span className="art-line-added">+ Learning Git, one commit at a time.</span></div></div><div className="art-version-trail"><span/><strong>Introduce myself</strong><i/><span/><strong>Add a learning goal</strong></div></Diagram>;
    case "tools":
      return <Diagram name="Git records history on your computer. GitHub hosts a shared copy online. They are separate tools." kind="tools"><div className="art-place"><Laptop><span className="art-tool-name">Git</span><div className="art-mini-commits"><i/><i/><i/></div></Laptop><h2>On your computer</h2><p>Record and compare versions.</p></div><div className="art-tool-connector"><span>Work together</span><svg viewBox="0 0 120 30" fill="none" aria-hidden="true"><path d="M4 9h108m-9-7 9 7-9 7M116 23H8m9-7-9 7 9 7" stroke="currentColor" strokeWidth="2"/></svg></div><div className="art-place"><Remote><span className="art-tool-name">GitHub</span></Remote><h2>Online with your team</h2><p>Share projects and review changes.</p></div></Diagram>;
    case "repository":
      return <Diagram name="A repository contains project files and the history of saved commits." kind="repository"><div className="art-repo-shell"><div className="art-repo-heading"><Icon name="book" size={24}/><code>alex-rivera /</code><span>repository</span></div><div className="art-repo-columns"><div className="art-repo-files"><span className="art-label">Your files</span><div><FileMark/><strong>README.md</strong></div></div><div className="art-repo-history"><span className="art-label">Your saved history</span><History compact/></div></div></div><div className="art-equation"><span>Project files</span><b>+</b><span>Version history</span><b>=</b><strong>Repository</strong></div></Diagram>;
    case "profile":
      return <Diagram name="For the profile README, GitHub username and public repository name both match: alex-rivera. The repository contains a nonempty README.md." kind="profile"><div className="art-profile-match"><div><span className="art-label">GitHub username</span><strong>alex-rivera</strong></div><div className="art-match-link"><span>same name</span><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M12 5v29m-7-8 7 8 7-8M28 35V6m-7 8 7-8 7 8" stroke="currentColor" strokeWidth="2"/></svg></div><div><span className="art-label">Repository name</span><strong>alex-rivera</strong></div></div><div className="art-profile-requirements"><span><Icon name="check"/>Public repository</span><span><Icon name="file"/>README.md</span><span><Icon name="check"/>A little about you</span></div></Diagram>;
    case "clone":
      return <Diagram name="Clone copies the repository and its history from GitHub to your computer." kind="clone"><div className="art-two-places"><div className="art-place"><Laptop/><strong>Your computer</strong><span>Local copy</span></div><Arrow reverse label="clone"/><div className="art-place"><Remote><FileMark/></Remote><strong>GitHub</strong><span>Online repository</span></div></div><Command>git clone https://github.com/alex-rivera/alex-rivera.git</Command></Diagram>;
    case "navigate":
      return <Diagram name="cd alex-rivera enters the cloned folder; ls lists files; cat README.md reads the README." kind="navigate"><div className="art-command-list"><div><Command>cd alex-rivera</Command><span>Enter the folder</span></div><div><Command>ls</Command><span>List its files</span></div><div><Command>cat README.md</Command><span>Read the README</span></div></div><div className="art-folder-tree"><Icon name="book" size={30}/><strong>alex-rivera/</strong><div><span/><FileMark/><code>README.md</code></div></div></Diagram>;
    case "edit":
      return <Diagram name="Edit README.md in nano. Write your introduction, then press Control O, Enter, and Control X to save and exit." kind="edit"><div className="art-nano"><div className="art-nano-heading"><span>nano</span><code>README.md</code></div><div className="art-nano-content"><span># Hi, I’m Alex.</span><span>Biomedical engineering student.</span><span className="art-nano-space"/><span>## I’m interested in</span><span>- Medical devices</span><span>- Learning Git<span className="art-cursor"/></span></div><div className="art-nano-keys"><span><kbd>Ctrl</kbd> + <kbd>O</kbd> Save</span><span><kbd>Enter</kbd> Confirm</span><span><kbd>Ctrl</kbd> + <kbd>X</kbd> Exit</span></div></div></Diagram>;
    case "status":
      return <Diagram name="git status identifies README.md as modified and not yet staged for a commit." kind="status"><div className="art-output"><Command>git status</Command><div className="art-output-body"><span>On branch main</span><span>Changes not staged for commit:</span><strong className="art-output-modified">modified: &nbsp; README.md</strong></div></div><div className="art-status-note"><span className="art-status-dot"/><div><strong>Edited</strong><span>Your file has changed.<br/>It isn’t in a commit yet.</span></div></div></Diagram>;
    case "diff":
      return <Diagram name="git diff shows removed lines with a minus and added lines with a plus. The old generic heading becomes Alex's introduction and interests." kind="diff"><div className="art-diff"><div className="art-diff-heading"><Icon name="file"/><code>README.md</code><span>1 removal · 3 additions</span></div><div className="art-diff-lines"><div className="art-removed"><b>−</b><code># alex-rivera</code></div><div className="art-added"><b>+</b><code># Hi, I’m Alex.</code></div><div className="art-added"><b>+</b><code>Biomedical engineering student.</code></div><div className="art-added"><b>+</b><code>Interested in medical devices.</code></div></div></div><div className="art-diff-key"><span><b>−</b> Old text</span><span><b>+</b> New text</span><code>git diff</code></div></Diagram>;
    case "staging":
      return <Diagram name="git add README.md copies the current README contents into staging. The working file remains in place. Staging selects the version for the next commit." kind="staging"><div className="art-staging-flow"><div className="art-stage-source"><span className="art-label">Working file</span><FileMark/><code>README.md</code><strong>Your latest edit</strong></div><Arrow label="git add"/><div className="art-stage-selection"><span className="art-label">Selected for next commit</span><div><FileMark/><Icon name="check" size={28}/></div><code>README.md</code><strong>A copy of these contents</strong></div></div><Command>git add README.md</Command></Diagram>;
    case "commit":
      return <Diagram name="git commit records the selected README version as a new saved snapshot with the message Introduce myself." kind="commit"><div className="art-commit-flow"><div className="art-commit-selected"><FileMark/><span>Selected content</span></div><Arrow label="commit"/><div className="art-commit-snapshot"><span className="art-snapshot-pin"/><span className="art-label">Saved snapshot</span><strong>Introduce myself</strong><code>c4f82b1</code><span>Project snapshot · saved locally</span></div></div><Command>git commit -m "Introduce myself"</Command></Diagram>;
    case "history":
      return <Diagram name="git log --oneline displays saved commits with short identifiers and descriptive messages. Introduce myself is the latest commit, followed by Initial commit." kind="history"><div className="art-history-board"><span className="art-label">Most recent first</span><History count={2}/></div><Command>git log --oneline</Command></Diagram>;
    case "local":
      return <Diagram name="The local repository has the new Introduce myself commit, while GitHub still has only the initial commit. A commit is local until pushed." kind="local"><div className="art-local-column"><span className="art-location-label"><Icon name="terminal"/>Your computer</span><History count={2} compact/><span className="art-unsent-label">1 new commit</span></div><div className="art-local-divider"><span>Not pushed yet</span><span className="art-unconnected-line"/></div><div className="art-local-column art-local-remote"><span className="art-location-label"><Icon name="branch"/>GitHub</span><History count={1} compact/><span className="art-unchanged-label">Still the earlier version</span></div></Diagram>;
    case "push":
      return <Diagram name="git push sends your saved commits from your computer to GitHub." kind="push"><div className="art-two-places"><div className="art-place"><Laptop><div className="art-mini-commits"><i/><i className="art-new-commit"/></div><code>2 commits</code></Laptop><strong>Your computer</strong></div><Arrow label="push"/><div className="art-place"><Remote><div className="art-mini-commits"><i/><i className="art-new-commit"/></div></Remote><strong>GitHub</strong></div></div><Command>git push</Command></Diagram>;
    case "published":
      return <Diagram name="After pushing, refresh GitHub to see your updated README on your profile. Check the saved commit in the repository too." kind="published"><div className="art-published-copy"><span className="art-published-check"><Icon name="check" size={32}/></span><strong>Your work,<br/>on your profile.</strong><code>github.com/alex-rivera</code><span>Refresh to see your update.</span></div><Profile published/></Diagram>;
    case "repeat":
      return <Diagram name="Add one learning goal to your README, then repeat inspect, stage, commit, and push. Verify the new line appears on your profile." kind="repeat"><div className="art-next-change"><span className="art-label">One more change</span><span>“I want to learn how to build medical devices.”</span><FileMark/></div><div className="art-repeat-steps">{["Edit", "Inspect", "Stage", "Commit", "Push"].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < 4 ? <Icon name="right"/> : <Icon name="check"/>}</div>)}</div></Diagram>;
    default:
      return <Diagram name="The Git workflow: edit, inspect, stage, commit, push. Git saves project history locally; GitHub shares the saved work online." kind="recap"><div className="art-recap-track">{[{ label: "Edit", command: "nano README.md", icon: "file" }, { label: "Inspect", command: "git diff", icon: "book" }, { label: "Stage", command: "git add", icon: "check" }, { label: "Commit", command: "git commit", icon: "branch" }, { label: "Push", command: "git push", icon: "right" }].map((step, index) => <div className="art-recap-step" key={step.label}><span className="art-recap-icon"><Icon name={step.icon as "file" | "book" | "check" | "branch" | "right"} size={28}/></span><strong>{step.label}</strong><code>{step.command}</code><small>{String(index + 1).padStart(2, "0")}</small></div>)}</div><div className="art-recap-footer"><span><b>Git</b> records your work.</span><span><b>GitHub</b> shares it.</span></div></Diagram>;
  }
}
