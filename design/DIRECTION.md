# Current direction: profile README handbook, November 9, 2026

This section supersedes all historical directions below. The user selected **Workshop handbook**: warm white, charcoal text, restrained EMBS blue/purple accents, bold system typography, light teaching diagrams, and dark command blocks. No AI-generated imagery is used in the running application.

The application now has 18 visual slides and one continuous seven-checkpoint practice guide. Participants use real Git, nano or an existing plain-text editor, and their own GitHub profile repository. Setup and reference support the two main views. There is no simulated terminal, repository editor, pull request, or activity engine in the active source.

Every slide has one main visual built with HTML/CSS/SVG. The repeated README symbol, local computer on the left, and GitHub on the right explain the same workflow throughout: edit, inspect, stage, commit, push. Speaker explanations are kept in notes. Authored profile previews are examples, not screenshots of or connections to a participant account.

Guide checkmarks and setup checkmarks are self-reported, never inferred from website actions. v4 progress keeps slide and practice positions independent and leaves old simulator storage untouched. Legacy links resolve to canonical topics or explain the new guide.

The session budgets 50 minutes plus ten minutes of catch-up/questions; installation and account/authentication setup are advance work. Branches, pull requests, recovery, and conflicts are follow-up topics.

Implementation specification: [Profile README implementation plan](PROFILE_README_IMPLEMENTATION_PLAN.md). Facilitation: [Run sheet and setup](../docs/FACILITATOR.md). Current technical checks and remaining rehearsal limits are recorded in the README.

---

# Historical: final polish, November 4, 2026

The colorful workshop implementation is complete. This pass preserves the approved visual direction and teaching sequence while refining access and interaction.

- A semantic main landmark contains the workshop tab panel. Skip to content focuses the content without changing the route or active practice tool. Heading focus follows lesson navigation and practice progression; keyboard view-tab navigation retains tab focus.
- Dialogs have accessible names, keyboard containment and Escape support, with focus restored on dismissal. Presentation arrow navigation also works when its navigation buttons have focus. Fullscreen falls back to the in-window presentation on unsupported or rejected requests.
- Practice has a visible Command label and Run button, clear error contrast, progressively announced hints, an explicit final-hint state, and clean command input after an exercise reset. The review activity uses a Pull request control rather than a misleading Terminal control; its read-only review diff remains separate from editing tools.
- Touch controls, file selectors and focus indicators are more consistent. Commit history is keyboard-scrollable. Reduced-motion and forced-color behavior are supported. A laptop-width opening overflow and diagram/projection clipping were corrected; no horizontal page overflow remains in the tested layouts.

Verification: build, lint and all model/exercise, graph, demo and curriculum tests pass. Playwright completed all twelve finishable activities, return-to-slides navigation, glossary and migration. Keyboard checks cover skip links, view tabs, content focus, dialogs, hints, Run/Enter, command history, errors and resets. All 59 slides were checked at 320, 768 and 1024 CSS-pixel widths with reduced motion; previous checks cover 390 and 1440 widths. All 59 slides fit the 1024x768 projector view. Unsupported and rejected fullscreen fallbacks pass. Firefox smoke coverage includes opening, command practice/progression and the reference dialog. Axe reports no violations on eight representative opening, lesson, practice, review, dialog, editor and history states (WCAG A/AA and best-practice rules).

Browser/IAB remains unavailable, so validation uses local Playwright browsers. Manual screen-reader testing, Safari and the physical workshop projector remain unverified. The site has not been deployed.

---

# Curriculum update: stage 2, November 4, 2026

The workshop now contains 59 short slides with stable topic URLs. The first nine chapters cover the core session (roughly 65-75 minutes including practice and questions); the final three contain optional conflict, recovery and independent activities.

Core sequence: relatable file-version problem; Git and GitHub definitions; repositories and practice setup; terminal; commits, status and staging; differences and history; branches; sharing; review and merge; text conflict demonstration; undo demonstrations; GitHub follow-up and recap. Commands are explained before the linked activity requires them. Each activity begins with its own prepared repository.

The accepted common topics are included in context: save/commit/push, unfinished edits on branches, teammate updates and rejected pushes, pull versus pull request, normal merge conflicts, undo choices, clone/fork/ZIP, visibility, sensitive files and .gitignore. The latter topics are conceptual guidance, without implying that cloning or ignore rules are supported by the browser simulator.

Core edits use README.md meeting locations and team-notes.md. The live staging, commit, branch and sharing examples match these files. A meeting-location conflict and text revert/unstage examples demonstrate common mistakes without requiring JSON. Sensor syntax is introduced before the optional exercises.

Quick reference has a glossary. Completed activities offer Continue slides as the primary action. Progress migrates from v2 to v3, preserving compatible sessions and the old storage record; revised activities restart with a one-time notice. Topic IDs retain saved slide identity across reorders.

Validation: automated model/exercise, graph, all ten demo sequences, curriculum ordering and migration checks; Playwright completion of all twelve finishable activities; slide-return navigation, glossary and migration UI; all 59 slides at 1440x1000 and 390x844; multi-step projection examples at 1280x800. Browser/IAB remains unavailable, so Chromium Playwright was used. Review corrected natural-height teaching diagrams and projected conflict clipping. No deployment was performed.

---

# Colorful Workshop: stage 1, November 4, 2026

The user selected [concept C](concepts/workshop-refresh/c-colorful-workshop.png). This direction supersedes the historical Multiverse and GitHub-inspired styles below.

## Approved foundation

- White background and surfaces; indigo text #1D104F, cobalt primary actions #1248EE, lavender panels #F3F0FF, coral label accents #FFB0A2, yellow step labels #FFDA4B. System sans headings and controls; monospace only for commands, files and technical output.
- One shared header: original EMBS mark, UF EMBS, Slides, Practice, Quick reference. Active tab has a cobalt underline. Existing chapter navigation, Present, progress, notes, hints and resets remain usable.
- Opening copy: Intro to Git and GitHub Workshop; Learn to track changes and work together.; Start slides; Open practice (Resume practice when saved work exists). No extra promotional labels.
- Opening illustration [workshop-landscape.png](../src/assets/workshop-landscape.png) extracted with built-in ImageGen from concept C. Coral sun, lavender mountains, blue hill, white path, indigo trees and yellow shrub. No overlay, drifting animation or painted scenery. Live text and controls remain HTML.
- Representative Git/GitHub comparison uses crisp computer/cloud SVG icons, coral term labels and direct explanations. Practice uses white tools with lavender headers, a yellow step indicator, and a collapsible project summary.

## Scope and review

Stage 1 establishes appearance, navigation and representative screens. Stage 2 owns the full slide rewrite/reorder and exercise-content changes; stage 3 owns comprehensive polish. Existing simulator state, progress key and exercise logic are retained.

Concept-to-implementation review covers white background, palette, sans typography, left-aligned opening, illustration placement, cobalt CTAs, underline navigation, comparison icons and yellow practice steps. Intentional adaptations: existing chapter/presentation controls and supplied EMBS logo remain; practice retains the existing sensor exercises until stage 2 rather than implementing the concept's illustrative meeting-notes task. Smaller screens stack artwork beneath text. The asset is a separate generated illustration, so its mountain/tree contours differ slightly from the concept.

---

# Git Multiverse: implemented direction

The [Git Multiverse brief](GIT_MULTIVERSE_BRIEF.md) defines the product scope; the October 11 visual revision below supersedes its pixel-art treatment. Its redesign is implemented across the existing React app. The earlier GitHub direction below is retained as historical context.

## Visual system

- Original generated floating-island scenery, informed by the supplied [Altura reference](references/altura-pixel-landscape.png). The October 11 revision replaces pixel texture with restrained gouache/watercolor shapes, light blue skies, slate blue shadows, sandy tan islands, muted peach clouds, and warm ivory.
- Georgia display headings, system sans explanations and controls, system monospace commands. No network font dependency.
- Tokens: ink `#213B50`, blue `#416885`, sky `#C6DCEA`, tan `#C5AA8B`, peach `#EDBEA8`, reading surface `#FFF9EE`.
- The [concept board](concepts/git-multiverse.png) covers the opening, staging lesson, and practice. The [revised production landscape](../src/assets/multiverse-painted-landscape.png) is reused as the opening scenery and a quiet chapter-edge treatment. UI, commands, and graphs remain live code.
- Slow transform-only sky drift provides atmosphere. The opening history route uses flat blue marks without glow. Short state arrivals explain staging and inspection. All motion has equivalent static results and respects reduced motion.

## Learning and interaction

The original 35 slides, 12 exercises plus sandbox, progressive hints, explicit Continue, presenter notes, UF EMBS branding, direct links, and version-2 progress remain. Practice has one active tool, selected with Terminal / Files / History, beside a live repository companion. On narrow screens it stacks below the active tool and Continue stays close to the task.

The companion displays actual working contents, index contents, staged changes, conflict alternatives, and remote references. Commit inspection does not switch branches. History derives from all stored commits and actual parents, including inactive routes and simulated remotes. Fast-forwards add no fake merge node; two-parent merges show both edges; reverts keep earlier checkpoints. File comparisons explicitly identify their source and destination and apply to the selected file.

Seven user-controlled lesson sequences reuse the same simulator with separate example repositories: snapshot, staging, branch, merge, conflict, remote, and revert. Each visual action shows its command; advancing the example never advances the slide or changes practice progress.

## Presentation

Present appears only in Slides. A separate 1200 by 675 slide canvas scales to available width and height. Browser fullscreen is requested, with an automatic in-window fallback if unsupported or rejected. Headers, tabs, notes, practice links, and footer remain outside the projected surface. Controls hide after inactivity and return on pointer or keyboard activity; they stay visible while focused. Escape and native fullscreen exit restore the current slide and Present-button focus. Background UI is inert while presenting.

## Intentional refinements from the generated concept

The reference is an art direction, not an image of a finished UI. The implementation preserves the existing two-row workshop navigation and full 35-slide deck. Lessons center one idea above the diagram, and practice puts the current goal above its tool. This reads better at classroom and mobile sizes than the compressed concept board. Supplied EMBS branding replaces generated lettering. The index correctly includes unchanged tracked files (the concept board abbreviated it to the selected change). Present is restricted to Slides even though the generated board placed it in practice. The landscape has no invented ruins or elaborate game story. Opening copy is limited to the agreed headline, the concise learning invitation, Begin the journey, and Resume practice when saved work exists.

## Verification coverage

The October 11 painted revision passed desktop Chromium review of the opening, staging interaction, practice history, native fullscreen, fallback, Escape, and focus restoration, plus tests, lint, and build. Mobile was deliberately not rechecked at the user?s request.

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
