import { useEffect, useState } from "react";
import embsLogo from "./assets/embs_logo.png";
import { chapters, slides } from "./data/lessons";
import { exercises, reference } from "./data/exercises";
import type { Exercise } from "./data/exercises";
import { execute, history } from "./lib/git";
import type { Repo } from "./lib/git";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Icon from "./components/Icon";
import SlideVisual from "./components/SlideVisual";
import Terminal from "./components/Terminal";
import type { Entry } from "./components/Terminal";
import Files from "./components/Files";
import PullRequest from "./components/PullRequest";
import Picker from "./components/Picker";
import "./App.css";

type Session = {
  repo: Repo;
  step: number;
  actions: string[];
  entries: Entry[];
  reviewed: boolean;
  merged: boolean;
};
type Saved = {
  version: 2;
  tab: "slides" | "practice";
  slide: number;
  exercise: string;
  sessions: Record<string, Session>;
};
const storageKey = "uf-embs-git-workshop-v2";
function fresh(exercise: Exercise): Session {
  return {
    repo: exercise.seed(),
    step: 0,
    actions: [],
    entries: [],
    reviewed: false,
    merged: false,
  };
}
function loadStored(): Saved {
  const fallback: Saved = {
    version: 2,
    tab: "slides",
    slide: 0,
    exercise: "terminal",
    sessions: {},
  };
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const data = JSON.parse(raw);
    if (
      data.version !== 2 ||
      !["slides", "practice"].includes(data.tab) ||
      !Number.isInteger(data.slide) ||
      data.slide < 0 ||
      data.slide >= slides.length ||
      !exercises.some((e) => e.id === data.exercise) ||
      typeof data.sessions !== "object" ||
      !data.sessions
    )
      return fallback;
    for (const [id, s] of Object.entries(data.sessions) as [
      string,
      Session,
    ][]) {
      const e = exercises.find((e) => e.id === id);
      if (
        !e ||
        !s.repo ||
        !Array.isArray(s.repo.commits) ||
        !s.repo.files ||
        !s.repo.index ||
        !s.repo.branches ||
        !Array.isArray(s.repo.conflicts) ||
        !Array.isArray(s.entries) ||
        !Array.isArray(s.actions) ||
        !Number.isInteger(s.step) ||
        s.step < 0 ||
        s.step > e.steps.length
      )
        return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}
function route(saved: Saved): Saved {
  const match = location.hash.match(/^#(slides|practice)\/([\w-]+)$/);
  if (!match) return saved;
  if (match[1] === "practice" && exercises.some((e) => e.id === match[2]))
    return { ...saved, tab: "practice", exercise: match[2] };
  const number = Number(match[2]);
  return match[1] === "slides" &&
    Number.isInteger(number) &&
    number >= 1 &&
    number <= slides.length
    ? { ...saved, tab: "slides", slide: number - 1 }
    : saved;
}
function load(): Saved {
  return route(loadStored());
}
export default function App() {
  const [saved, setSaved] = useState<Saved>(load);
  const [picker, setPicker] = useState<
    "lessons" | "exercises" | "reference" | null
  >(null);
  const [notes, setNotes] = useState(false);
  const [hint, setHint] = useState(0),
    [view, setView] = useState<"terminal" | "files" | "history">("terminal");
  const [resetting, setResetting] = useState(false),
    [storageError, setStorageError] = useState(false);
  const slide = slides[saved.slide],
    exercise = exercises.find((e) => e.id === saved.exercise)!;
  const session = saved.sessions[exercise.id] ?? fresh(exercise);
  const done = session.step >= exercise.steps.length;
  const currentStep =
    exercise.steps[Math.min(session.step, exercise.steps.length - 1)];
  const passed =
    !done &&
    currentStep.check({
      repo: session.repo,
      actions: session.actions,
      reviewed: session.reviewed,
      merged: session.merged,
    });
  const exerciseIndex = exercises.indexOf(exercise);
  const completed = exercises.filter(
    (e) => saved.sessions[e.id]?.step >= e.steps.length,
  ).length;
  useEffect(() => {
    const hash =
      saved.tab === "slides"
        ? `#slides/${saved.slide + 1}`
        : `#practice/${saved.exercise}`;
    if (location.hash !== hash) window.history.replaceState(null, "", hash);
  }, [saved.tab, saved.slide, saved.exercise]);
  useEffect(() => {
    const navigate = () => {
      setSaved((s) => route(s));
      setPicker(null);
      setHint(0);
      setView("terminal");
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);

  useEffect(() => {
    let failed = false;
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      failed = true;
    }
    queueMicrotask(() => setStorageError(failed));
  }, [saved]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [saved.tab, saved.exercise, saved.slide]);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (
        saved.tab !== "slides" ||
        picker ||
        ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
          (e.target as HTMLElement).tagName,
        )
      )
        return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setSaved((s) => ({
          ...s,
          slide: Math.max(
            0,
            Math.min(
              slides.length - 1,
              s.slide + (e.key === "ArrowRight" ? 1 : -1),
            ),
          ),
        }));
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [saved.tab, picker]);
  function updateSession(change: (s: Session) => Session) {
    setSaved((s) => ({
      ...s,
      sessions: {
        ...s.sessions,
        [exercise.id]: change(s.sessions[exercise.id] ?? fresh(exercise)),
      },
    }));
  }
  function command(input: string) {
    updateSession((s) => {
      const result = execute(s.repo, input),
        valid =
          result.ok || result.repo.conflicts.length > s.repo.conflicts.length;
      return {
        ...s,
        repo: result.repo,
        actions:
          valid && result.action ? [...s.actions, result.action] : s.actions,
        entries:
          input === "clear"
            ? []
            : [
                ...s.entries,
                { command: input, output: result.output, ok: result.ok },
              ].slice(-80),
      };
    });
  }
  function selectExercise(id: string) {
    setSaved((s) => ({ ...s, exercise: id, tab: "practice" }));
    setPicker(null);
    setView("terminal");
    setHint(0);
    setResetting(false);
  }
  function advanceStep() {
    updateSession((s) => ({ ...s, step: s.step + 1, actions: [] }));
    setHint(0);
    setView("terminal");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function tabKey(e: ReactKeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const tab =
      e.key === "Home"
        ? "slides"
        : e.key === "End"
          ? "practice"
          : saved.tab === "slides"
            ? "practice"
            : "slides";
    setSaved((s) => ({ ...s, tab }));
    document.getElementById(`${tab}-tab`)?.focus();
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="global-header">
        <div className="brand">
          <img src={embsLogo} alt="UF EMBS" />
          <span>
            UF EMBS <span className="repo-slash">/</span>{" "}
            <strong>git-workshop</strong>
          </span>
        </div>
        <span className="header-note">Git workshop</span>
      </header>
      <nav className="repo-navigation" aria-label="Workshop">
        <div className="nav-inner">
          <div role="tablist" aria-label="Workshop views">
            <button
              id="slides-tab"
              role="tab"
              aria-selected={saved.tab === "slides"}
              tabIndex={saved.tab === "slides" ? 0 : -1}
              onKeyDown={tabKey}
              aria-controls="main"
              onClick={() => setSaved((s) => ({ ...s, tab: "slides" }))}
            >
              <Icon name="file" />
              Slides
            </button>
            <button
              id="practice-tab"
              role="tab"
              aria-selected={saved.tab === "practice"}
              tabIndex={saved.tab === "practice" ? 0 : -1}
              onKeyDown={tabKey}
              aria-controls="main"
              onClick={() => setSaved((s) => ({ ...s, tab: "practice" }))}
            >
              <Icon name="terminal" />
              Practice
            </button>
          </div>
          <button
            className="link-button"
            onClick={() => setPicker("reference")}
          >
            Reference
          </button>
        </div>
      </nav>
      <main
        id="main"
        role="tabpanel"
        aria-labelledby={`${saved.tab}-tab`}
        className="main-content"
        tabIndex={-1}
      >
        {saved.tab === "slides" ? (
          <>
            <div className="lesson-toolbar">
              <div>
                <button className="button" onClick={() => setPicker("lessons")}>
                  <Icon name="left" />
                  Lessons
                </button>
                <span className="toolbar-separator" />
                <span>
                  {String(slide.chapter + 1).padStart(2, "0")} /{" "}
                  {chapters[slide.chapter].title}
                </span>
                {chapters[slide.chapter].extra ? (
                  <span className="optional-label">Optional</span>
                ) : null}
              </div>
            </div>
            <section
              className={`slide-canvas visual-${slide.visual}`}
              aria-label={`Slide ${saved.slide + 1}`}
            >
              <div className="slide-copy">
                <h1>{slide.title}</h1>
                <p>{slide.body}</p>
              </div>
              <SlideVisual slide={slide} />
              {slide.exercise ? (
                <button
                  className="button practice-link"
                  onClick={() => selectExercise(slide.exercise!)}
                >
                  Try it in Practice
                  <Icon name="right" />
                </button>
              ) : null}
            </section>
            <div className="page-navigation">
              <button
                className="button"
                disabled={saved.slide === 0}
                onClick={() => setSaved((s) => ({ ...s, slide: s.slide - 1 }))}
              >
                <Icon name="left" />
                Previous
              </button>
              <span>
                {String(saved.slide + 1).padStart(2, "0")} / {slides.length}
              </span>
              <button
                className="button"
                disabled={saved.slide === slides.length - 1}
                onClick={() => setSaved((s) => ({ ...s, slide: s.slide + 1 }))}
              >
                Next
                <Icon name="right" />
              </button>
            </div>
            <div className="speaker-tools">
              <button
                className="link-button muted"
                aria-expanded={notes}
                onClick={() => setNotes(!notes)}
              >
                {notes ? "Hide" : "Show"} presenter notes
              </button>
              {notes ? <p className="speaker-notes">{slide.notes}</p> : null}
            </div>
          </>
        ) : (
          <>
            <div className="practice-toolbar">
              <span>
                <span className="accent">
                  Practice {String(exercise.chapter + 1).padStart(2, "0")}
                </span>
                <span className="repo-slash"> / </span>
                {exercise.title}
              </span>
              <button className="button" onClick={() => setPicker("exercises")}>
                Exercises
              </button>
            </div>
            {done ? (
              <section className="exercise-complete">
                <span className="completion-icon">
                  <Icon name="check" size={32} />
                </span>
                <h1>{exercise.title}: complete.</h1>
                <p>
                  {exercise.id === "first-commit"
                    ? "The sensor setting is committed. Your team notes stayed out."
                    : exercise.id === "conflict"
                      ? "You resolved the conflict and joined both histories."
                      : "You finished each step. Keep building on what you learned."}
                </p>
                <div>
                  <button
                    className="button"
                    onClick={() => {
                      const index = slides.findIndex(
                        (s) => s.exercise === exercise.id,
                      );
                      setSaved((s) => ({
                        ...s,
                        tab: "slides",
                        slide: index >= 0 ? index : s.slide,
                      }));
                    }}
                  >
                    Back to slides
                  </button>
                  {exerciseIndex < exercises.length - 1 ? (
                    <button
                      className="button primary"
                      onClick={() =>
                        selectExercise(exercises[exerciseIndex + 1].id)
                      }
                    >
                      Next exercise
                      <Icon name="right" />
                    </button>
                  ) : null}
                </div>
                <button
                  className="link-button"
                  onClick={() => {
                    updateSession(() => fresh(exercise));
                    setHint(0);
                    setView("terminal");
                  }}
                >
                  Try this exercise again
                </button>
              </section>
            ) : (
              <>
                <div className="practice-heading">
                  <div>
                    <h1>{currentStep.title}</h1>
                    {exercise.kind !== "sandbox" ? (
                      <span className="step-counter">
                        Step {session.step + 1} of {exercise.steps.length}
                      </span>
                    ) : null}
                  </div>
                  <p>{currentStep.instruction}</p>
                </div>
                {exercise.kind === "pr" ? (
                  <PullRequest
                    repo={session.repo}
                    reviewed={session.reviewed}
                    merged={session.merged}
                    onReview={() =>
                      updateSession((s) => ({ ...s, reviewed: true }))
                    }
                    onMerge={() =>
                      updateSession((s) => {
                        const result = execute(
                          s.repo,
                          "git merge feature/docs",
                        );
                        return { ...s, repo: result.repo, merged: result.ok };
                      })
                    }
                  />
                ) : (
                  <>
                    {view === "terminal" ? (
                      <Terminal
                        key={exercise.id}
                        entries={session.entries}
                        onCommand={command}
                        onReset={() => setResetting(true)}
                      />
                    ) : view === "files" ? (
                      <Files
                        key={`${exercise.id}-${session.step}`}
                        repo={session.repo}
                        preferred={currentStep.file}
                        onEdit={(file, content) =>
                          updateSession((s) => ({
                            ...s,
                            repo: {
                              ...s.repo,
                              files: { ...s.repo.files, [file]: content },
                            },
                          }))
                        }
                      />
                    ) : (
                      <section className="history-panel">
                        <div className="panel-header">
                          <span>Commit history</span>
                          <span>
                            <Icon name="branch" size={14} />{" "}
                            {session.repo.branch}
                          </span>
                        </div>
                        {history(session.repo).map((c) => (
                          <div className="commit-row" key={c.id}>
                            <span className="small-commit-dot" />
                            <code>{c.id}</code>
                            <span>{c.message}</span>
                            {c.parents.length === 2 ? (
                              <span className="muted">merge</span>
                            ) : null}
                          </div>
                        ))}
                        {!history(session.repo).length ? (
                          <p>No commits yet.</p>
                        ) : null}
                      </section>
                    )}
                    <div className="practice-utilities">
                      <button
                        className="link-button"
                        aria-expanded={hint > 0}
                        onClick={() => setHint(Math.min(3, hint + 1))}
                      >
                        {hint > 0 && hint < 3
                          ? "Another hint?"
                          : "Need a hint?"}
                      </button>
                      <div>
                        {view !== "terminal" ? (
                          <button
                            className="link-button"
                            onClick={() => setView("terminal")}
                          >
                            Back to terminal
                          </button>
                        ) : (
                          <button
                            className="link-button"
                            onClick={() => setView("files")}
                          >
                            View files
                          </button>
                        )}
                        {exercise.chapter >= 3 ? (
                          <button
                            className="link-button"
                            onClick={() =>
                              setView(
                                view === "history" ? "terminal" : "history",
                              )
                            }
                          >
                            {view === "history"
                              ? "Hide history"
                              : "View history"}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
                {hint > 0 ? (
                  <div className="hint-box">
                    <strong>Hint {hint} of 3</strong>
                    <p>{currentStep.hints[hint - 1]}</p>
                    <button className="link-button" onClick={() => setHint(0)}>
                      Hide hint
                    </button>
                  </div>
                ) : null}
                {passed ? (
                  <div className="step-success" role="status">
                    <Icon name="check" />
                    <span>
                      {session.step === exercise.steps.length - 1
                        ? "You’ve reached the goal."
                        : "That’s it. Ready for the next step?"}
                    </span>
                    <button className="button primary" onClick={advanceStep}>
                      {session.step === exercise.steps.length - 1
                        ? "Finish exercise"
                        : "Continue"}
                      <Icon name="right" />
                    </button>
                  </div>
                ) : null}
              </>
            )}
            <div className="practice-note">
              <span>
                Practice runs in your browser.{" "}
                <button
                  className="link-button muted"
                  onClick={() => setPicker("reference")}
                >
                  About the simulator
                </button>
              </span>
              <span>
                {completed
                  ? `${completed} exercise${completed === 1 ? "" : "s"} complete`
                  : ""}
              </span>
            </div>
            <div className="page-navigation">
              <button
                className="button"
                disabled={exerciseIndex === 0}
                onClick={() => selectExercise(exercises[exerciseIndex - 1].id)}
              >
                <Icon name="left" />
                Previous exercise
              </button>
              {!done ? (
                <button className="button" disabled>
                  Next exercise
                  <Icon name="right" />
                </button>
              ) : null}
            </div>
          </>
        )}
        {storageError ? (
          <p className="storage-error" role="status">
            Your browser couldn’t save progress. Keep this tab open to continue
            your session.
          </p>
        ) : null}
      </main>
      <footer>
        University of Florida <span>·</span> Engineering in Medicine &amp;
        Biology Society
      </footer>
      {picker ? (
        <Picker
          title={
            picker === "lessons"
              ? "Lessons"
              : picker === "exercises"
                ? "Practice exercises"
                : "Command reference"
          }
          onClose={() => setPicker(null)}
        >
          {picker === "lessons" ? (
            chapters.map((chapter, i) => (
              <button
                className="picker-row"
                key={chapter.title}
                onClick={() => {
                  setSaved((s) => ({
                    ...s,
                    slide: slides.findIndex((slide) => slide.chapter === i),
                  }));
                  setPicker(null);
                  setNotes(false);
                }}
              >
                <span className="lesson-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  {chapter.title}
                  {chapter.extra ? <small>Optional extension</small> : null}
                </span>
                <span className="muted">{chapter.duration}</span>
              </button>
            ))
          ) : picker === "exercises" ? (
            exercises.map((e) => (
              <button
                className="picker-row"
                key={e.id}
                onClick={() => selectExercise(e.id)}
              >
                <span className="lesson-number">
                  {saved.sessions[e.id]?.step >= e.steps.length ? (
                    <Icon name="check" />
                  ) : (
                    <Icon name={e.kind === "pr" ? "branch" : "terminal"} />
                  )}
                </span>
                <span>
                  {e.title}
                  <small>
                    {e.extra ? "Optional · " : ""}
                    {e.description}
                  </small>
                </span>
                <Icon name="right" />
              </button>
            ))
          ) : (
            <>
              <p className="reference-intro">
                Commands for the workshop. The examples below run in our browser
                simulator.
              </p>
              <div className="reference-list">
                {reference.map(([command, description]) => (
                  <div key={command}>
                    <code>{command}</code>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
              <section className="simulator-about">
                <h3>About this practice environment</h3>
                <p>
                  This is a Git learning simulator with selected commands. It
                  uses snapshots, staging, branches, and merge history. It does
                  not run a system shell or connect to your GitHub account.
                </p>
                <p>
                  Remote operations and pull requests are simulated. Merge
                  conflicts may show entire file sections. Revert supports
                  clean, single-parent commits. Unsupported commands and flags
                  return an explanation.
                </p>
                <h3>Try Git outside the workshop</h3>
                <p>
                  When you’re ready, install Git, configure your name and email,
                  and practice on a small local project. Use a GitHub account to
                  collaborate with a teammate.
                </p>
                <a
                  href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"
                  target="_blank"
                  rel="noreferrer"
                >
                  Install Git
                </a>
                <span> · </span>
                <a
                  href="https://docs.github.com/en/get-started/start-your-journey/hello-world"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub’s Hello World guide
                </a>
              </section>
            </>
          )}
        </Picker>
      ) : null}
      {resetting ? (
        <Picker
          title="Reset this exercise?"
          onClose={() => setResetting(false)}
        >
          <p>
            Your commands and edits in this exercise will be cleared. Progress
            in other exercises stays saved.
          </p>
          <div className="reset-actions">
            <button className="button" onClick={() => setResetting(false)}>
              Keep working
            </button>
            <button
              className="button danger"
              onClick={() => {
                updateSession(() => fresh(exercise));
                setResetting(false);
                setView("terminal");
                setHint(0);
              }}
            >
              Reset exercise
            </button>
          </div>
        </Picker>
      ) : null}
    </div>
  );
}
