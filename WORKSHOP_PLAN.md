# UF EMBS Git Workshop

Original planning brief, October 8, 2026. The application is now implemented. The visual direction and multi-panel practice layout below were superseded by the user's feedback: use a restrained GitHub-style interface and introduce one task at a time. See `design/DIRECTION.md` for the current specification.

## Agreed direction

- A browser-only workshop for UF EMBS, designed for 60–90 minutes.
- Assume attendees have never used a terminal, but include meaningful collaboration, conflicts, and recovery.
- Two main tabs: Slides and Practice. A compact reference sheet is accessible from either tab.
- No installation, login, GitHub account, or external service required for exercises.
- Dark developer-tool aesthetic, using EMBS blue `#00629b` and purple `#772583`.
- Use the supplied EMBS, Git, and GitHub logos.
- Plan first; review a visual concept before implementing the application.

## Learning outcome and story

By the end, attendees should understand how to inspect changes, stage intentionally, create commits, develop on branches, merge work, resolve a conflict, and explain how Git differs from GitHub.

Use one fictional repository throughout: `embs-pulse`, a wearable sensor project. Example files are `README.md`, `sensor-config.json`, `team-notes.md`, and `.gitignore`. Edits should involve readable descriptions and simple settings; programming knowledge is unnecessary. All sensor settings and data are fictional teaching examples.

Use a few named teammates consistently. Their contributions provide reasons to inspect changes, create branches, and resolve disagreements. Keep scenarios short and specific rather than adding elaborate game lore.

## Session structure

Every chapter follows: explanation → prediction → guided task → visible result → optional stretch task.

| Minutes | Chapter | Core exercise | Optional stretch |
| --- | --- | --- | --- |
| 0–5 | Why Git; Git versus GitHub | Compare numbered final files with a readable history | Identify what a commit records |
| 5–10 | Your first terminal | Run `pwd`, `ls`, and `cat README.md`; introduce command, argument, Enter, and output | Explore `help` without a suggested command |
| 10–22 | First meaningful commit | Initialize the project, edit a file, inspect status, stage, and commit | Stage one file while deliberately leaving another out |
| 22–30 | Inspect before saving | Find an accidental change with status and diff; inspect history | Change a file after staging and predict which version gets committed |
| 30–40 | Work on a branch | Create a feature branch, commit a change, and switch back to main | Explain why uncommitted edits can remain when switching branches |
| 40–52 | Merge and resolve | Compare a clean merge with a prepared conflict; edit the resolution, stage, and commit | Describe what each conflict side represents |
| 52–57 | GitHub collaboration | Walk through a simulated pull request: diff, comment, review, merge | Predict where a teammate would see the change |
| 57–60 | Recap and transfer | Short understanding check and a take-home command reference | Explain the workflow without relying on the animation |

For a 90-minute session, add three ten-minute modules:

1. **Remotes and synchronization:** a seeded teammate update; distinguish fetch, pull, and push using a simulated remote.
2. **Recover from mistakes:** unstage a file, discard an unstaged edit, and undo a committed change using revert. Explain the consequences before performing each operation.
3. **Independent capstone:** inspect the repository, fix a setting on a branch, commit only the intended files, and merge successfully with less guidance.

Keep stretch exercises available in the 60-minute session for fast finishers. No automatic countdown or requirement that everyone finish at the same speed.

## App structure

### Shared shell

- Compact EMBS branding and workshop title in the header.
- Slides / Practice tab switch, chapter navigation, and access to the reference sheet.
- Remember the current slide and exercise independently when switching tabs.
- Show progress without grades, public rankings, or mandatory timers.
- Persist progress on the same device; provide an explicit restart action.
- Direct navigation to chapters and exercises, so late arrivals can join the current lesson.

### Slides

Plan approximately 22–26 core slides plus optional extension slides. Use several intentional layouts: opening, concept, annotated command, comparison, prediction, worked example, and exercise handoff.

- One main teaching idea per slide.
- Large typography, short explanations, and generous diagram space for projection.
- Animate the file → staging → commit model and branch history step by step.
- Use real, selectable text for commands and copy buttons where useful.
- Presenter mode: hide app navigation, enlarge content, and offer keyboard navigation and fullscreen.
- Speaker notes are available to the presenter without appearing in the projected slide layout.
- Practice handoffs link directly to the relevant exercise; participants can return to the originating slide.

### Practice

Desktop layout:

- Left: chapter list, task goal, and optional stretch goal.
- Center: editable files and diff tabs above the terminal.
- Right: working directory, staging area, and commit/branch history.

Use a coherent workspace with fine separators rather than many nested cards. Let participants collapse secondary panels and enlarge the terminal or file editor. At smaller widths, show Files / Terminal / History as accessible panel tabs. Desktop is the primary workshop experience; smaller screens still support reading and completing tasks.

Each exercise includes:

- A concrete problem, a seeded repository state, and a visible completion goal.
- Command history, predictable focus, and a terminal transcript.
- Three levels of optional help: conceptual nudge → relevant command → worked example.
- Explanations of errors and results in plain language.
- A reset for the current exercise that does not erase other progress.
- Optional guided command suggestions that can be hidden at any time.
- Success determined by repository state, allowing more than one valid supported command sequence.

Exercise formats: predict a result, investigate a mistake, perform a task, recover from a mistake, and explain the outcome. Do not make every exercise multiple choice.

### Open sandbox and reference

An optional sandbox uses the same supported commands with a fresh project. Make the supported command set discoverable. The reference connects familiar exercise scenarios to commands and includes a later path to practicing Git locally and on GitHub.

## Simulation requirements

The app is a clearly labeled Git learning simulator. The terminal is not a system shell, and GitHub screens represent simulated collaboration.

Build a shared repository model rather than hardcoded success messages:

- File contents in the working directory and staging area are separate snapshots.
- Commits store tree snapshots, parent relationships, and messages.
- Branches are references to commits; the current branch and HEAD remain consistent.
- Status and diff are derived from the model.
- Stage → edit again → commit behaves consistently with Git.
- Seeded clean merges and conflict cases have deterministic outcomes.
- Unresolved conflicts prevent completing the merge.
- Simulated remote refs and pull requests derive from local and remote state when extension modules are implemented.

Initial terminal scope:

- Helpers: `help`, `clear`, `pwd`, `ls`, `cat`.
- Core: `git init`, `git status`, `git diff`, `git diff --staged`, `git add`, `git commit -m`, `git log`, `git branch`, `git switch`, `git switch -c`, `git merge`.
- Extension: selected `git restore`, `git revert`, `git remote`, `git fetch`, `git pull`, and `git push` operations required by authored exercises.

Support quoted commit messages and common supported command variants. Handle typos, empty commits, unknown branches, and unsupported flags with helpful explanations. Do not pretend unsupported commands succeeded. Start with a small real model and a documented command subset rather than claiming full Git compatibility.

## Visual direction

Concept: a welcoming developer workspace for a biomedical engineering club. GitHub familiarity comes from the hierarchy, repository navigation, code/diff presentation, and restrained surfaces; EMBS supplies the identity.

### Palette

| Role | Proposed color |
| --- | --- |
| Page background | `#0d1117` |
| Primary surface | `#161b22` |
| Raised surface | `#1c2330` |
| Subtle border | `#30363d` |
| Primary text | `#f0f6fc` |
| Secondary text | `#a7b0bd` |
| EMBS blue | `#00629b` |
| EMBS purple | `#772583` |
| Bright blue/cyan accent | `#58c8f3` |
| Bright lilac accent | `#c38de0` |
| Success | `#56d364` |
| Warning | `#e3b341` |
| Error | `#f78181` |

The exact EMBS colors anchor branding and filled accents. Brighter related tones support small labels, graph lines, selected states, and focus on dark surfaces. Validate contrast in the rendered UI; communicate status with labels and icons as well as color.

### Type and composition

- A readable sans serif such as Inter for navigation and lesson text; JetBrains Mono for commands, filenames, and terminal output. Bundle chosen fonts for consistent rendering.
- Clear heading hierarchy, left-aligned instructional content, and tabular numbers for progress.
- Restrained 8–12px corner radii, thin borders, and a consistent spacing scale.
- Slide content significantly larger than practice UI; verify slide legibility at projector scale.
- Blue/cyan indicates the active task and current work. Purple/lilac distinguishes alternate branches and chapter accents. Semantic success and error colors remain separate.
- Short motion explains changes: a file enters staging, a commit appears, a branch splits, a merge reconnects. All outcomes remain understandable with reduced motion.
- The memorable visual detail is the live repository history, reused across lessons and exercises.

## Assets

Inspected existing assets:

- `src/assets/embs_logo.png`: transparent club mark with purple and blue artwork; use in the shared header and opening/closing slides. Preserve its colors and proportions.
- `src/assets/git.png`: transparent orange Git symbol; use in the Git introduction and relevant concept slides.
- `src/assets/github.png`: square GitHub image with a dark background; use within a deliberate dark tile and avoid presenting it as a transparent icon.
- `src/assets/hero.png`: starter illustration, not part of the workshop direction.

Optional generated imagery: one restrained wearable-sensor or biomedical circuit illustration for the opening slide, with a composition that leaves space for the title. Additional teammate scenario illustrations are optional only if they materially improve the lesson. Generate after the visual concept is selected.

Keep learning diagrams, code, labels, logos, and interactive graphs as real UI/vector elements rather than generated images.

## Quality bar

- Finished slide layouts and usable exercises receive equal attention.
- Keyboard-accessible tabs, file controls, terminal, hints, and slide navigation.
- Visible focus, useful labels, readable contrast, and reduced-motion support.
- Preserve input focus and avoid disruptive auto-scrolling during commands.
- No progress loss when changing tabs or reloading on the same device.
- Verify the full core workshop path, partial staging, staged-versus-working edits, branch transitions, clean merges, conflict resolution, hints, resets, and progress restoration.
- Visually inspect desktop, narrower laptop, mobile fallback, and presentation mode.
- Review the slide deck for instructional consistency as well as visual polish.

## Implementation sequence

1. Review a visual concept showing both a representative teaching slide and a practice workspace.
2. Establish design tokens, shared navigation, and representative slide layouts in the existing React/TypeScript/Vite project.
3. Build and verify a vertical slice: one lesson, editable files, staging, terminal commands, a visible commit, feedback, and progress persistence.
4. Extend the shared model and author the remaining core exercises and slides.
5. Add optional remote, recovery, and capstone modules.
6. Refine imagery, motion, presentation mode, responsive behavior, and accessibility; verify the full workshop.

No account system, live multiplayer, leaderboard, or instructor dashboard is needed for this workshop version. Hosting and any real GitHub integration can be decided separately when the workshop is ready to share.
