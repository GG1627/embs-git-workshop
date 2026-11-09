import type { ReactNode } from "react";
import type { WorkshopSlide } from "../data/workshop";
import Icon from "./Icon";
import "./SlideArtwork.css";

function FileMark({ className = "" }: { className?: string }) {
  return <svg className={`art-file-mark ${className}`} viewBox="0 0 64 80" fill="none" aria-hidden="true"><path d="M8 2h31l17 17v59H8V2Z" stroke="currentColor" strokeWidth="2.5"/><path d="M39 2v18h17M20 38h24M20 49h24M20 60h15" stroke="currentColor" strokeWidth="2.5"/></svg>;
}

function Laptop({ children }: { children?: ReactNode }) {
  return <div className="art-laptop"><div className="art-laptop-screen">{children ?? <><FileMark/><code>project-notes.md</code></>}</div><div className="art-laptop-base"/></div>;
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

function Person({ name, role, maya = false }: { name: string; role: string; maya?: boolean }) {
  return <div className={`art-person ${maya ? "art-person-maya" : ""}`}><span className="art-person-avatar">{name.charAt(0)}</span><strong>{name}</strong><span>{role}</span></div>;
}

function Profile() {
  return <div className="art-profile-paper"><div className="art-profile-top"><div className="art-avatar">ar<span/></div><div><strong>Alex Rivera</strong><span>alex-rivera</span></div></div><div className="art-profile-readme"><div className="art-paper-label"><Icon name="file" size={16}/><code>alex-rivera / README.md</code></div><h2>Hi, I’m Alex.</h2><p>Biomedical engineering student.</p><div className="art-profile-rule"/><h3>A little about me</h3><p>I’m interested in medical devices<br/>and learning how things work.</p><div className="art-interest-tags"><span>Biomedical engineering</span><span>Learning Git</span></div></div></div>;
}

const storyCommits = [
  { hash: "e7c91a2", title: "Add adapter reminder" },
  { hash: "c4f82b1", title: "Update presentation location" },
  { hash: "a1b2c3d", title: "Start class project" },
];

function History({ count = 3, compact = false }: { count?: number; compact?: boolean }) {
  return <div className={`art-history ${compact ? "art-history-compact" : ""}`}>{storyCommits.slice(3 - count).map((entry, index) => <div className="art-history-row" key={entry.hash}><span className={`art-history-dot ${index === 0 ? "art-history-current" : ""}`}/><code>{entry.hash}</code><span>{entry.title}</span>{index === 0 ? <small>latest</small> : null}</div>)}</div>;
}

function Diagram({ name, children, kind = "" }: { name: string; children: ReactNode; kind?: string }) {
  return <figure className={`slide-artwork art-${kind}`} aria-label={name}>{children}</figure>;
}

function Workflow() {
  return <div className="art-recap-track">{[{ label: "Edit", command: "Save the file", icon: "file" }, { label: "Inspect", command: "git status / diff", icon: "book" }, { label: "Stage", command: "git add", icon: "check" }, { label: "Commit", command: "git commit", icon: "branch" }, { label: "Push", command: "git push", icon: "right" }].map((step, index) => <div className="art-recap-step" key={step.label}><span className="art-recap-icon"><Icon name={step.icon as "file" | "book" | "check" | "branch" | "right"} size={28}/></span><strong>{step.label}</strong><code>{step.command}</code><small>{String(index + 1).padStart(2, "0")}</small></div>)}</div>;
}

export default function SlideArtwork({ slide }: { slide: WorkshopSlide }) {
  switch (slide.visual) {
    case "check-in":
      return <Diagram name="Event check-in: scan the supplied QR code and enter LATAAE6Q exactly as shown. The code is case-sensitive." kind="check-in"><div className="art-checkin-qr"><img src="/event-checkin.png" width="300" height="300" alt="Scan this QR code to open event check-in."/></div><div className="art-checkin-details"><span className="art-label">EVENT CODE</span><code aria-label="Event code: L A T A A E 6 Q">LATAAE6Q</code><p>Case-sensitive. Enter exactly as shown.</p></div></Diagram>;
    case "welcome":
      return <Diagram name="Git records versions on your computer. GitHub gives your team a shared place for the project." kind="intro"><div className="art-place"><Laptop><span className="art-tool-name">Git</span><div className="art-mini-commits"><i/><i/><i/></div></Laptop><h2>Track changes</h2><p>A history on your computer.</p></div><div className="art-intro-join"><span>+</span></div><div className="art-place"><Remote/><h2>GitHub</h2><p>A shared place for your team.</p></div></Diagram>;
    case "versions":
      return <Diagram name="Two project-note versions: the presentation location was Room 101, then it changed to Room 202. Git records what changed and why." kind="versions"><div className="art-version-pair"><div className="art-version"><span className="art-paper-label">Earlier version</span><code># Group presentation</code><span>Location: Room 101</span></div><div className="art-version art-version-new"><span className="art-paper-label">Updated version</span><code># Group presentation</code><span className="art-line-added">Location: Room 202</span></div></div><div className="art-version-trail"><span/><strong>Start class project</strong><i/><span/><strong>Update presentation location</strong></div></Diagram>;
    case "what-git":
      return <Diagram name="Git keeps a history of saved project snapshots locally. Each commit has a short identifier and message." kind="git-definition"><div className="art-place"><Laptop><span className="art-tool-name">Git</span><FileMark/></Laptop><h2>On your computer</h2></div><div className="art-definition-history"><span className="art-label">Saved versions · commits</span><History count={2}/></div></Diagram>;
    case "what-github":
    case "tools":
      return <Diagram name="GitHub hosts a shared Git repository online. You and Maya can share commits, read the history, and review each other's changes." kind="github-definition"><Person name="Gael" role="Your computer"/><div className="art-github-center"><Remote/><strong>GitHub</strong><span>Shared repository</span></div><Person name="Maya" role="Maya’s computer" maya/><div className="art-collaboration-actions"><span>Share commits</span><span>Read history</span><span>Review changes</span></div></Diagram>;
    case "repository":
      return <Diagram name="The class-project repository contains project-notes.md, outline.md, and checklist.md, together with its saved commit history." kind="repository"><div className="art-repo-shell"><div className="art-repo-heading"><Icon name="book" size={24}/><code>class-project /</code><span>repository</span></div><div className="art-repo-columns"><div className="art-repo-files"><span className="art-label">Project files</span><div><FileMark/><strong>project-notes.md</strong></div><div className="art-secondary-file"><Icon name="file"/><code>checklist.md</code></div><div className="art-secondary-file"><Icon name="file"/><code>outline.md</code></div></div><div className="art-repo-history"><span className="art-label">Saved versions</span><History count={2} compact/></div></div></div><div className="art-equation"><span>Project files</span><b>+</b><span>Version history</span><b>=</b><strong>Repository</strong></div></Diagram>;
    case "big-three":
      return <Diagram name="The three core commands: git add selects current contents, git commit records a version locally, and git push shares commits on GitHub. Saving a file in an editor does not create a commit." kind="big-three"><div className="art-big-three-steps">{[
        { command: "git add", action: "Select changes", detail: "Choose file contents for the next commit.", place: "On your computer" },
        { command: "git commit", action: "Record a version", detail: "Save a project snapshot with a message.", place: "On your computer" },
        { command: "git push", action: "Share commits", detail: "Send your saved commits to GitHub.", place: "To GitHub" },
      ].map((step, index) => <div className="art-big-three-step" key={step.command}><span className="art-label">{index + 1} · {step.place}</span><code>{step.command}</code><strong>{step.action}</strong><p>{step.detail}</p></div>)}</div><p className="art-big-three-save"><Icon name="file" size={22}/><span>Saving in your editor changes the file. It does not create a commit.</span></p></Diagram>;
    case "team-project":
      return <Diagram name="The class project team: Gael (you) handles project notes, Maya handles the preparation checklist, and Jordan handles the presentation outline." kind="team-project"><Person name="Gael (you)" role="Project notes"/><Person name="Maya" role="Preparation checklist" maya/><Person name="Jordan" role="Presentation outline"/></Diagram>;
    case "clone":
      return <Diagram name="git clone copies the team repository and its history from GitHub to your computer. The shown URL is an illustrative team repository." kind="clone"><div className="art-two-places"><div className="art-place"><Laptop/><strong>Your computer</strong><span>class-project/</span></div><Arrow reverse label="clone"/><div className="art-place"><Remote><FileMark/></Remote><strong>GitHub</strong><span>Team repository</span></div></div><div><Command>git clone https://github.com/example-team/class-project.git</Command><span className="art-example-note">Example URL · use your own repository in practice</span></div></Diagram>;
    case "navigate":
      return <Diagram name="cd class-project enters the clone; ls lists files; cat project-notes.md reads the project notes." kind="navigate"><div className="art-command-list"><div><Command>cd class-project</Command><span>Enter the folder</span></div><div><Command>ls</Command><span>List the files</span></div><div><Command>cat project-notes.md</Command><span>Read the notes</span></div></div><div className="art-folder-tree"><Icon name="book" size={30}/><strong>class-project/</strong><div><span/><FileMark/><code>project-notes.md</code></div></div></Diagram>;
    case "edit":
      return <Diagram name="You update the saved working file project-notes.md: Location changes from Room 101 to Room 202. This editor save is not yet a Git commit." kind="story-edit"><div className="art-version"><span className="art-paper-label"><Icon name="file" size={16}/>project-notes.md · before</span><code># Group presentation</code><span>Location: Room 101</span></div><Arrow label="edit & save"/><div className="art-version art-version-new"><span className="art-paper-label">Working file · after</span><code># Group presentation</code><span className="art-line-added">Location: Room 202</span></div></Diagram>;
    case "status":
      return <Diagram name="git status identifies project-notes.md as modified and not yet staged for a commit." kind="status"><div className="art-output"><Command>git status</Command><div className="art-output-body"><span>On branch main</span><span>Changes not staged for commit:</span><strong className="art-output-modified">modified: &nbsp; project-notes.md</strong></div></div><div className="art-status-note"><span className="art-status-dot"/><div><strong>Edited</strong><span>The file is saved.<br/>Git has not recorded a new version.</span></div></div></Diagram>;
    case "diff":
      return <Diagram name="git diff shows the removed location, Room 101, with a minus, and the added location, Room 202, with a plus." kind="diff"><div className="art-diff"><div className="art-diff-heading"><Icon name="file"/><code>project-notes.md</code><span>1 removal · 1 addition</span></div><div className="art-diff-lines"><div className="art-removed"><b>−</b><code>Location: Room 101</code></div><div className="art-added"><b>+</b><code>Location: Room 202</code></div></div></div><div className="art-diff-key"><span><b>−</b> Old text</span><span><b>+</b> New text</span><code>git diff</code></div></Diagram>;
    case "staging":
      return <Diagram name="git add project-notes.md selects a copy of the current notes for the next commit. The working file remains in its folder." kind="staging"><div className="art-staging-flow"><div className="art-stage-source"><span className="art-label">Working file</span><FileMark/><code>project-notes.md</code><strong>Location: Room 202</strong></div><Arrow label="git add"/><div className="art-stage-selection"><span className="art-label">Selected for next commit</span><div><FileMark/><Icon name="check" size={28}/></div><code>project-notes.md</code><strong>Location: Room 202</strong></div></div><Command>git add project-notes.md</Command></Diagram>;
    case "commit":
      return <Diagram name="git commit records the selected project snapshot with the message Update presentation location. It is saved locally." kind="commit"><div className="art-commit-flow"><div className="art-commit-selected"><FileMark/><span>Selected notes</span></div><Arrow label="commit"/><div className="art-commit-snapshot"><span className="art-snapshot-pin"/><span className="art-label">Saved snapshot</span><strong>Update presentation location</strong><code>c4f82b1</code><span>Project snapshot · saved locally</span></div></div><Command>git commit -m "Update presentation location"</Command></Diagram>;
    case "history":
      return <Diagram name="git log --oneline shows Update presentation location above Start class project. Each saved commit has an identifier and a message." kind="history"><div className="art-history-board"><span className="art-label">Most recent first</span><History count={2}/></div><Command>git log --oneline</Command></Diagram>;
    case "local":
      return <Diagram name="The local repository has Update presentation location; GitHub still has only Start class project. The new commit has not been pushed." kind="local"><div className="art-local-column"><span className="art-location-label"><Icon name="terminal"/>Your computer</span><History count={2} compact/><span className="art-unsent-label">1 new commit</span></div><div className="art-local-divider"><span>Not pushed yet</span><span className="art-unconnected-line"/></div><div className="art-local-column art-local-remote"><span className="art-location-label"><Icon name="branch"/>GitHub</span><History count={1} compact/><span className="art-unchanged-label">Jordan still sees Room 101</span></div></Diagram>;
    case "push":
      return <Diagram name="git push sends your saved commit to GitHub. Maya and Jordan can now get the updated presentation location, Room 202." kind="push"><div className="art-two-places"><div className="art-place"><Laptop><div className="art-mini-commits"><i/><i className="art-new-commit"/></div><code>Room 202</code></Laptop><strong>Your computer</strong></div><Arrow label="push"/><div className="art-place"><Remote><div className="art-mini-commits"><i/><i className="art-new-commit"/></div></Remote><strong>GitHub</strong><span>Location update shared</span></div></div><Command>git push</Command></Diagram>;
    case "pull":
      return <Diagram name="Maya pushed an adapter reminder in checklist.md. GitHub has that commit and your computer does not yet. git pull brings the shared commit into your current branch; this clean example moves forward without a conflict." kind="pull"><div className="art-two-places"><div className="art-place"><Laptop><div className="art-mini-commits"><i/><i/></div><code>2 commits → 3</code></Laptop><strong>Your computer</strong></div><Arrow reverse label="pull"/><div className="art-place"><Remote><div className="art-mini-commits"><i/><i/><i className="art-new-commit"/></div></Remote><strong>GitHub</strong><span>Maya’s new commit</span></div></div><div className="art-incoming-line"><Icon name="check" size={17}/><code>checklist.md</code><span>+ Bring the presentation adapter</span></div><Command>git pull</Command></Diagram>;
    case "branch":
      return <Diagram name="A branch is a named line of saved work. Jordan can try a new presentation outline on a branch while the main version stays at its current commit." kind="branch"><svg viewBox="0 0 900 240" role="img" aria-label="Main continues from the current commit; Jordan's idea branches off from an earlier shared commit."><path className="art-branch-main-line" d="M85 155H800"/><path className="art-branch-idea-line" d="M375 155C445 155 455 65 525 65H790"/>{[85,230,375,590,800].map(x=><circle className="art-branch-main-node" key={x} cx={x} cy="155" r="11"/>)}{[565,720].map(x=><circle className="art-branch-idea-node" key={x} cx={x} cy="65" r="11"/>)}<text x="85" y="207">main · current outline</text><text x="525" y="30">Jordan’s idea · separate saved work</text></svg><div className="art-branch-legend"><span>main · shared work</span><span>Jordan’s idea</span></div><div className="art-branch-takeaway"><Icon name="branch" size={24}/><span>A branch lets Jordan develop an alternative presentation outline.</span></div></Diagram>;
    case "apply":
    case "published":
      return <Diagram name="Now apply the Git workflow to your own GitHub profile README. The new practice project is separate from the class project." kind="apply"><div className="art-apply-copy"><span className="art-label">Now it’s your turn</span><strong>Create your<br/>profile README.</strong><div className="art-apply-file"><FileMark/><code>README.md</code></div></div><Profile/></Diagram>;
    case "profile":
      return <Diagram name="For the profile README, your GitHub username and public repository name must match. A nonempty README.md in the repository root appears on your profile." kind="profile"><div className="art-profile-match"><div><span className="art-label">GitHub username</span><strong>alex-rivera</strong></div><div className="art-match-link"><span>same name</span><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M12 5v29m-7-8 7 8 7-8M28 35V6m-7 8 7-8 7 8" stroke="currentColor" strokeWidth="2"/></svg></div><div><span className="art-label">Repository name</span><strong>alex-rivera</strong></div></div><div className="art-profile-requirements"><span><Icon name="check"/>Public repository</span><span><Icon name="file"/>README.md</span><span><Icon name="check"/>A little about you</span></div></Diagram>;
    case "repeat":
      return <Diagram name="After publishing your introduction, add one learning goal to your README and repeat edit, inspect, stage, commit, push." kind="repeat"><div className="art-next-change"><span className="art-label">One more change</span><span>“I want to learn how to build medical devices.”</span><FileMark/></div><div className="art-repeat-steps">{["Edit", "Inspect", "Stage", "Commit", "Push"].map((step,index)=><div key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong>{index<4?<Icon name="right"/>:<Icon name="check"/>}</div>)}</div></Diagram>;
    default:
      return <Diagram name="The Git workflow is edit, inspect, stage, commit, push. Pull brings teammates' shared commits into your current branch." kind="recap"><Workflow/><div className="art-recap-footer"><span><b>Push</b> your saved work.</span><span><b>Pull</b> your team’s updates.</span></div></Diagram>;
  }
}
