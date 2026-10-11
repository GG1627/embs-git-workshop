# Git Multiverse: implemented direction

The [Git Multiverse brief](GIT_MULTIVERSE_BRIEF.md) is the current product specification. Its redesign is implemented across the existing React app. The earlier GitHub direction below is retained as historical context.

## Visual system

- Original generated floating-island scenery, informed by the supplied [Altura reference](references/altura-pixel-landscape.png). Dusk blue, lavender shadows, peach clouds, gold light, and warm ivory.
- Georgia display headings, system sans explanations and controls, system monospace commands. No network font dependency.
- Tokens: ink `#202943`, dusk `#405A83`, lavender `#A394C2`, peach `#F4B58F`, gold `#F8D69B`, reading surface `#FFFAF1`.
- The [concept board](concepts/git-multiverse.png) covers the opening, staging lesson, and practice. The [production landscape](../src/assets/multiverse-landscape.png) is reused as the opening scenery and a quiet chapter-edge treatment. UI, commands, and graphs remain live code.
- Slow transform-only sky drift and checkpoint glow provide atmosphere. Short state arrivals explain staging and inspection. All motion has equivalent static results and respects reduced motion.

## Learning and interaction

The original 35 slides, 12 exercises plus sandbox, progressive hints, explicit Continue, presenter notes, UF EMBS branding, direct links, and version-2 progress remain. Practice has one active tool, selected with Terminal / Files / History, beside a live repository companion. On narrow screens it stacks below the active tool and Continue stays close to the task.

The companion displays actual working contents, index contents, staged changes, conflict alternatives, and remote references. Commit inspection does not switch branches. History derives from all stored commits and actual parents, including inactive routes and simulated remotes. Fast-forwards add no fake merge node; two-parent merges show both edges; reverts keep earlier checkpoints. File comparisons explicitly identify their source and destination and apply to the selected file.

Seven user-controlled lesson sequences reuse the same simulator with separate example repositories: snapshot, staging, branch, merge, conflict, remote, and revert. Each visual action shows its command; advancing the example never advances the slide or changes practice progress.

## Presentation

Present appears only in Slides. A separate 1200 by 675 slide canvas scales to available width and height. Browser fullscreen is requested, with an automatic in-window fallback if unsupported or rejected. Headers, tabs, notes, practice links, and footer remain outside the projected surface. Controls hide after inactivity and return on pointer or keyboard activity; they stay visible while focused. Escape and native fullscreen exit restore the current slide and Present-button focus. Background UI is inert while presenting.

## Intentional refinements from the generated concept

The reference is an art direction, not an image of a finished UI. The implementation preserves the existing two-row workshop navigation and full 35-slide deck. Lessons center one idea above the diagram, and practice puts the current goal above its tool. This reads better at classroom and mobile sizes than the compressed concept board. Supplied EMBS branding replaces generated lettering. The index correctly includes unchanged tracked files (the concept board abbreviated it to the selected change). Present is restricted to Slides even though the generated board placed it in practice. The landscape has no invented ruins or elaborate game story. Opening copy is limited to the agreed headline, the concise learning invitation, Begin the journey, and Resume practice when saved work exists.

## Verification coverage

The implementation was checked with Playwright Chromium after the browser connector reported no available browser. Coverage includes all 12 exercise completions; sandbox reset isolation; actual staging snapshots and uncommitted notes; inactive branch inspection; conflict editing; both diff comparisons; saved progress and direct links; hints, reference, and resume; native fullscreen, native exit, Escape, focus restoration, rejection and unsupported-API fallbacks; all 35 slides at 4:3 projection and mobile width; and reduced motion. Repository and lesson-sequence tests run with `npm run test`.

Scenery, palette, typography, live controls/copy, hierarchy, spacing, and responsive framing were compared with the concept and source reference. Browser review corrected focus restoration, small diagram text, mobile heading wrapping, branch reference overlap, and Continue placement. Browser coverage is Chromium; cross-browser projector/device checks remain useful before a live workshop. No deployment was performed.

---

# Previous design direction: GitHub-inspired (superseded)

The user's October 10, 2026 redesign request supersedes this visual direction. See [Git Multiverse brief](GIT_MULTIVERSE_BRIEF.md) for the current agreed floating-island, painterly pixel-art direction, interactive teaching requirements, and slides-only presentation mode. The older specification below is retained as historical context; its removal of Present/fullscreen no longer applies.

The user's correction supersedes the original concept boards: reduce the information on screen, use GitHub's repository interface as the visual reference, and choose accents that fit naturally. Color choices are delegated to the implementer.

## References

- [GitHub Primer color guidance](https://primer.style/product/getting-started/foundations/color-usage/)
- [GitHub repository reference](https://github.com/skills/introduction-to-github)
- [Revised slide concept](concepts/d-github-slides.png)
- [Revised practice concept](concepts/d-github-practice.png)
- [Exact revised ImageGen prompts](revised-imagegen-prompts.json)

The concepts were generated with the built-in ImageGen tool. They are design references; the app is implemented with real HTML, CSS, SVG, text, and supplied logos.

## Locked visual system

Neutral GitHub-like dark surfaces: `#010409` header, `#0d1117` canvas, `#161b22` secondary surface, `#30363d` borders, `#e6edf3` foreground, `#919ba6` muted text. Blue `#58a6ff` is for links and focus; green `#238636` is for successful forward actions; muted orange `#f78166` marks the selected tab.

Use system sans typography and system monospace code. Standard controls use 14px text, 6px corners, fine borders, and ordinary hover/focus states. The original EMBS logo supplies purple/blue identity without recoloring the application. The supplied Git and GitHub logos appear in relevant teaching slides.

## Content and interaction

- Two primary views, Slides and Practice, with Reference as a utility.
- Chapter and exercise lists open on request rather than occupying a permanent sidebar.
- Each slide contains one teaching idea, a short explanation, and one diagram or example.
- Each exercise exposes its current instruction and one working surface. Files and history replace the terminal when requested instead of appearing beside it.
- Explicit Continue lets students read the result before moving on.
- Hints are opt-in; deeper material remains available in later lessons and optional extensions.
- Slides use the regular application layout. The Present button and fullscreen mode were removed at the user's request.
- Progress persists on the same browser/device. Each exercise has its own repository state.
- URLs identify slides and exercises, for example `#slides/9` and `#practice/conflict`.

## Deliberate implementation refinements

- Supplied EMBS logo replaces the generated placeholder mark.
- A centered 1100px reading column keeps lessons and exercises manageable on laptop screens.
- The authored deck contains 35 slides, including nine optional extension slides, rather than the mockup's illustrative counter.
- A subtle command-input placeholder helps attendees recognize where to type.
- History is introduced after the first commit lesson, rather than exposed immediately.
- Presenter notes, keyboard navigation, reference material, success feedback, and reset dialogs use the same quiet control system.
