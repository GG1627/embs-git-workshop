import { useEffect, useRef, useState } from "react";
import { checkpoints, slides } from "./data/workshop";
import { readState, resolveHash, stateHash, storageKey } from "./lib/handbook";
import type { HandbookState } from "./lib/handbook";
import Icon from "./components/Icon";
import Picker from "./components/Picker";
import Presentation from "./components/Presentation";
import SlideCanvas from "./components/SlideCanvas";
import PracticeGuide from "./components/PracticeGuide";
import SetupReference from "./components/SetupReference";
import "./App.css";

function initialState() {
  let raw = null;
  try { raw = localStorage.getItem(storageKey); } catch { /* The guide works without storage. */ }
  return resolveHash(location.hash, readState(raw));
}

export default function App() {
  const [saved, setSaved] = useState<HandbookState>(() => initialState().state);
  const [notice, setNotice] = useState<string | null>(() => initialState().notice);
  const [topics, setTopics] = useState(false);
  const [notes, setNotes] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const savedRef = useRef(saved);
  const content = useRef<HTMLElement>(null);
  const presentTrigger = useRef<HTMLButtonElement>(null);
  const firstNavigation = useRef(true);
  const slideIndex = Math.max(0, slides.findIndex(item => item.id === saved.slide));
  const slide = slides[slideIndex];
  const checkpoint = checkpoints.find(item => item.id === saved.checkpoint) ?? checkpoints[0];

  useEffect(() => {
    savedRef.current = saved;
    let failed = false;
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); }
    catch { failed = true; }
    queueMicrotask(() => setStorageFailed(failed));
  }, [saved]);

  useEffect(() => {
    history.replaceState(null, "", stateHash(savedRef.current));
    function route() {
      if (location.hash === "#main") { content.current?.focus(); return; }
      const next = resolveHash(location.hash, savedRef.current);
      history.replaceState(null, "", stateHash(next.state));
      savedRef.current = next.state;
      setSaved(next.state);
      setNotice(next.notice);
      setTopics(false);
      if (next.state.view !== "slides") setPresenting(false);
    }
    window.addEventListener("hashchange", route);
    return () => window.removeEventListener("hashchange", route);
  }, []);

  useEffect(() => {
    if (firstNavigation.current) { firstNavigation.current = false; return; }
    if (!presenting) {
      content.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [saved.view, saved.slide, saved.checkpoint, presenting]);

  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (saved.view !== "slides" || presenting || topics || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select, summary, dialog, [contenteditable='true']")) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const next = Math.min(slides.length - 1, Math.max(0, slideIndex + (event.key === "ArrowRight" ? 1 : -1)));
        location.hash = `slides/${slides[next].id}`;
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [saved.view, presenting, topics, slideIndex]);

  function toggleCheckpoint(id: string) {
    setSaved(previous => ({ ...previous, completed: previous.completed.includes(id) ? previous.completed.filter(value => value !== id) : [...previous.completed, id] }));
  }
  function toggleSetup(index: number) {
    setSaved(previous => ({ ...previous, setupCompleted: previous.setupCompleted.includes(index) ? previous.setupCompleted.filter(value => value !== index) : [...previous.setupCompleted, index] }));
  }

  return <>
    <div className="app-shell" inert={presenting}>
      <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); content.current?.focus(); }}>Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#slides/welcome"><img src="/embs-logo.png" alt="" width="42" height="42" /><span><small>UF EMBS WORKSHOP</small><strong>Git & GitHub<span className="brand-period">.</span></strong></span></a>
        <nav className="main-navigation" aria-label="Workshop"><a href={`#slides/${saved.slide}`} aria-current={saved.view === "slides" ? "page" : undefined}>Slides</a><a href={`#practice/${saved.checkpoint}`} aria-current={saved.view === "practice" ? "page" : undefined}>Practice</a></nav>
        <a className={`resource-link ${saved.view === "setup" || saved.view === "reference" ? "active" : ""}`} href="#setup">Setup & reference<Icon name="right" size={16} /></a>
      </header>
      <main id="main" className={`main-content view-${saved.view}`} ref={content} tabIndex={-1}>
        {notice ? <div className="route-notice" role="status"><p>{notice}</p><button className="icon-button" aria-label="Dismiss notice" onClick={() => setNotice(null)}><Icon name="close" /></button></div> : null}
        {saved.view === "slides" ? <>
          <div className="lesson-toolbar"><button className="topic-button" onClick={() => setTopics(true)} aria-haspopup="dialog"><Icon name="book" size={17} /><span>{slide.section}</span><span className="topic-chevron" aria-hidden="true">⌄</span></button><div className="lesson-tools"><span className="session-length">50 min + time for questions</span><button className="button" ref={presentTrigger} onClick={() => setPresenting(true)}><Icon name="expand" size={16} />Present</button></div></div>
          <SlideCanvas slide={slide} index={slideIndex} />
          <div className="slide-bottom"><nav className="slide-navigation" aria-label="Slide navigation"><button className="icon-button" disabled={slideIndex === 0} aria-label="Previous slide" onClick={() => { location.hash = `slides/${slides[slideIndex - 1].id}`; }}><Icon name="left" /></button><span><strong>{String(slideIndex + 1).padStart(2, "0")}</strong><span> / {String(slides.length).padStart(2, "0")}</span></span><button className="icon-button" disabled={slideIndex === slides.length - 1} aria-label="Next slide" onClick={() => { location.hash = `slides/${slides[slideIndex + 1].id}`; }}><Icon name="right" /></button></nav>
            {slide.practice ? <a className="practice-handoff" href={`#practice/${slide.practice}`}>Open the README activity<Icon name="right" size={17} /></a> : null}
          </div>
          <div className="speaker-tools"><button className="text-button" aria-expanded={notes} aria-controls="presenter-notes" onClick={() => setNotes(value => !value)}>{notes ? "Hide" : "Show"} presenter notes</button>{notes ? <div id="presenter-notes" className="speaker-notes"><span>PRESENTER NOTES</span><p>{slide.notes}</p></div> : null}</div>
        </> : saved.view === "practice" ? <PracticeGuide checkpoint={checkpoint} completed={saved.completed} onToggle={toggleCheckpoint} /> : <SetupReference view={saved.view} platform={saved.platform} onPlatform={platform => setSaved(previous => ({ ...previous, platform }))} setupCompleted={saved.setupCompleted} onToggleSetup={toggleSetup} />}
        {storageFailed ? <p className="storage-notice" role="status">Progress couldn't be saved in this browser. You can keep using every page while this tab is open.</p> : null}
      </main>
      <footer className="site-footer"><span>University of Florida <span aria-hidden="true">/</span> Engineering in Medicine & Biology Society</span><a href="#setup">Before you arrive<Icon name="right" size={14} /></a></footer>
      {topics ? <Picker title="The workshop" onClose={() => setTopics(false)}><p className="topic-intro">Learn Git & GitHub, then build your profile README.</p><div className="topic-list">{slides.map((item, i) => <a key={item.id} className="topic-row" href={`#slides/${item.id}`} aria-current={slide.id === item.id ? "page" : undefined} onClick={() => setTopics(false)}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item.title}</strong><Icon name="right" size={15} /></a>)}</div></Picker> : null}
    </div>
    {presenting ? <Presentation slide={slide} index={slideIndex} count={slides.length} trigger={presentTrigger} onExit={() => setPresenting(false)} onNavigate={delta => { const next = Math.min(slides.length - 1, Math.max(0, slideIndex + delta)); location.hash = `slides/${slides[next].id}`; }} /> : null}
  </>;
}
