import { checkpoints, setupChecklist, slides } from "../data/workshop.ts";
import type { Platform } from "../data/workshop.ts";

export type View = "slides" | "practice" | "setup" | "reference";
export type HandbookState = {
  version: 4;
  view: View;
  slide: string;
  checkpoint: string;
  completed: string[];
  setupCompleted: number[];
  platform: Platform;
};

export const storageKey = "uf-embs-git-workshop-v4";
const slideIds = new Set(slides.map((slide) => slide.id));
const checkpointIds = new Set(checkpoints.map((checkpoint) => checkpoint.id));
const views = new Set<View>(["slides", "practice", "setup", "reference"]);
const platforms = new Set<Platform>(["windows", "mac", "linux"]);

// Numeric links in the previous 59-slide deck referred to these topic IDs.
// Keep this table independent of the retired simulator curriculum.
const previousSlides = [
  "welcome", "versions", "what-git", "what-github", "tools", "repository",
  "not-just-code", "project", "workshop", "terminal", "pwd", "ls", "cat",
  "commit", "init", "status", "staging", "add", "three-saves", "save",
  "initialize-practice", "save-practice", "diff", "log", "inspect", "branch",
  "switch-create", "unfinished", "list-branches", "switch-main", "sharing",
  "clone", "pull", "push-rejected", "push", "merge", "merge-command", "pr",
  "pull-vs-pr", "review", "conflict-core", "text-conflict", "undo-overview",
  "undo-unstage", "undo-demo", "get-project", "visibility", "ignore",
  "after-today", "recap", "conflict-intro", "sensor", "conflict", "resolution",
  "unstage", "restore", "revert", "capstone", "sandbox",
];
const legacySlides: Record<string, string> = {
  "what-git": "tools", "what-github": "tools", "not-just-code": "repository",
  project: "profile", workshop: "welcome", terminal: "navigate", pwd: "navigate",
  ls: "navigate", cat: "navigate", init: "profile", add: "staging",
  "three-saves": "local", save: "commit", "initialize-practice": "profile",
  "save-practice": "commit", log: "history", inspect: "diff", sharing: "local",
  "get-project": "clone", visibility: "profile", "after-today": "recap",
  branch: "recap", "switch-create": "recap", unfinished: "recap",
  "list-branches": "recap", "switch-main": "recap", pull: "recap",
  "push-rejected": "push", merge: "recap", "merge-command": "recap", pr: "recap",
  "pull-vs-pr": "recap", review: "recap", "conflict-core": "recap",
  "text-conflict": "recap", "undo-overview": "recap", "undo-unstage": "recap",
  "undo-demo": "recap", ignore: "recap", "conflict-intro": "recap",
  sensor: "recap", conflict: "recap", resolution: "recap", unstage: "recap",
  restore: "recap", revert: "recap", capstone: "repeat", sandbox: "repeat",
};
const legacyPractice: Record<string, string> = {
  terminal: "clone", initialize: "create", "first-commit": "commit",
};

export function defaultState(): HandbookState {
  return {
    version: 4,
    view: "slides",
    slide: slides[0].id,
    checkpoint: checkpoints[0].id,
    completed: [],
    setupCompleted: [],
    platform: "windows",
  };
}

/** Only v4 guide progress is read. Old simulator records are left untouched. */
export function readState(raw: string | null): HandbookState {
  const fallback = defaultState();
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
    const data = parsed as Record<string, unknown>;
    if (data.version !== 4) return fallback;
    return {
      ...fallback,
      view: typeof data.view === "string" && views.has(data.view as View) ? data.view as View : fallback.view,
      slide: typeof data.slide === "string" && slideIds.has(data.slide) ? data.slide : fallback.slide,
      checkpoint: typeof data.checkpoint === "string" && checkpointIds.has(data.checkpoint) ? data.checkpoint : fallback.checkpoint,
      platform: typeof data.platform === "string" && platforms.has(data.platform as Platform) ? data.platform as Platform : fallback.platform,
      completed: Array.isArray(data.completed)
        ? [...new Set(data.completed.filter((id): id is string => typeof id === "string" && checkpointIds.has(id)))]
        : [],
      setupCompleted: Array.isArray(data.setupCompleted)
        ? [...new Set(data.setupCompleted.filter((index): index is number => Number.isInteger(index) && index >= 0 && index < setupChecklist.length))]
        : [],
    };
  } catch {
    return fallback;
  }
}

export function stateHash(state: HandbookState): string {
  if (state.view === "slides") return `#slides/${state.slide}`;
  if (state.view === "practice") return `#practice/${state.checkpoint}`;
  return `#${state.view}`;
}

/** Resolve navigation without replacing independently remembered slide/guide positions. */
export function resolveHash(hash: string, state: HandbookState): { state: HandbookState; notice: string | null } {
  if (!hash || hash === "#" || hash === "#main") return { state, notice: null };
  const match = /^#(slides|practice)(?:\/([^/?#]+))?\/?$/.exec(hash);
  if (hash === "#setup" || hash === "#reference") {
    return { state: { ...state, view: hash.slice(1) as View }, notice: null };
  }
  if (!match) {
    return {
      state: { ...state, view: "slides", slide: slides[0].id },
      notice: "That workshop link is unavailable. Start with the new workshop introduction.",
    };
  }
  const view = match[1] as "slides" | "practice";
  let id: string;
  try {
    id = decodeURIComponent(match[2] ?? "");
  } catch {
    id = "";
  }
  if (!match[2]) return { state: { ...state, view }, notice: null };
  if (view === "practice") {
    if (checkpointIds.has(id)) return { state: { ...state, view, checkpoint: id }, notice: null };
    const mapped = Object.hasOwn(legacyPractice, id) ? legacyPractice[id] : undefined;
    return {
      state: { ...state, view, checkpoint: mapped ?? checkpoints[0].id },
      notice: mapped
        ? "This activity is now part of the profile README guide. Follow these steps in your own terminal."
        : "The simulator activities have been replaced by a real profile README project. Start with the guide below.",
    };
  }
  const numeric = /^\d+$/.test(id);
  const previousId = numeric ? previousSlides[Number(id) - 1] : id;
  if (previousId && slideIds.has(previousId)) {
    return { state: { ...state, view, slide: previousId }, notice: null };
  }
  const mapped = previousId && Object.hasOwn(legacySlides, previousId) ? legacySlides[previousId] : undefined;
  if (mapped) {
    return {
      state: { ...state, view, slide: mapped },
      notice: mapped === "recap"
        ? "This topic is now a next step after the core workshop. Start with the recap and follow-up resources."
        : "This lesson has moved in the shorter profile README workshop.",
    };
  }
  return {
    state: { ...state, view, slide: slides[0].id },
    notice: "That lesson is unavailable. Start with the new workshop introduction.",
  };
}
