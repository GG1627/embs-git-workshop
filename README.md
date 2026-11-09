# Git & GitHub workshop / UF EMBS

A one-hour introduction to Git and GitHub for the University of Florida Engineering in Medicine & Biology Society. Participants create a profile README, clone their own repository, edit Markdown with nano, inspect changes, commit, push, and repeat the workflow.

The website provides **18 visual teaching slides** and **one practice guide with seven checkpoints**. Practice happens on participants' computers and GitHub accounts. The guide does not run Git or verify their work; completion checkboxes are personal reminders.

## Before the workshop

Send attendees the site's **Setup & reference** page in advance. They need a laptop, a GitHub account, Git, a configured author identity, HTTPS authentication, and nano or an existing plain-text editor. VS Code is not required.

The live plan contains 50 minutes of explanation and practice plus ten minutes for questions and catch-up. Account creation, installations, and authentication preparation happen beforehand. The timing still needs rehearsal with beginners.

See [the facilitator guide](docs/FACILITATOR.md) for the run sheet, advance setup message, teaching prompts, and troubleshooting.

## Run locally

Use a current Node.js LTS release and npm.

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173`.

```sh
npm test
npm run lint
npm run build
```

Build output in `dist/` is a static site. No backend or runtime network service is required. GitHub and documentation links open external sites; the workshop itself does not request credentials. No hosting or deployment has been configured.

## Workshop structure

- **Slides:** visual explanations, topic selection, optional presenter notes, and fullscreen/in-window presentation. Arrow keys navigate; Escape exits presentation. The same authored diagrams adapt to narrow screens and a fixed 16:9 projection canvas.
- **Practice:** create the profile repository, clone, edit, inspect, stage/commit, push/view, and repeat. Each checkpoint has commands, expected results, optional help, and a participant-controlled completion checkbox. Navigation is never gated by completion.
- **Setup:** Windows Git Bash, macOS Terminal, and Linux instructions; Git author identity and email privacy; HTTPS authentication; editor checks; personal readiness checklist.
- **Reference:** the small command set used during the session and links for learning branches and pull requests afterward.

The handbook uses warm white, charcoal, EMBS blue/purple, dark command blocks, and custom HTML/CSS/SVG diagrams. No AI-generated images are imported by the application. Historical design assets remain in the repository as references.

## Links and progress

Examples: `/#slides/staging`, `/#practice/commit`, `/#setup`, and `/#reference`.

Slide and guide positions are remembered independently. Guide checkmarks, setup checkmarks, and platform selection are stored only in this browser under `uf-embs-git-workshop-v4`. Storage failures do not block navigation. The old v2/v3 simulator records remain untouched and are not converted into real-world completions.

Compatible legacy lesson links map to the corresponding new topic. Retired simulator activities lead to the new guide with an explanation. URLs are replaced with their canonical destination while preserving browser Back behavior.

## Editing

| File | Purpose |
| --- | --- |
| `src/data/workshop.ts` | Slides, speaker notes, checkpoints, setup guides, command reference |
| `src/App.tsx` | Shared navigation, progress, topics, presentation handoff |
| `src/lib/handbook.ts` | Validated v4 storage and canonical/legacy routing |
| `src/components/PracticeGuide.tsx` | Participant guide and checkpoint navigation |
| `src/components/SetupReference.tsx` | Platform setup, readiness, and reference |
| `src/components/CommandBlock.tsx` | Selectable commands, copy feedback and failure fallback |
| `src/components/SlideArtwork.tsx` | The 18 authored teaching diagrams |
| `src/components/SlideCanvas.tsx` | Shared slide composition |
| `src/components/Presentation.tsx` | Projection scaling, fullscreen, keyboard and focus behavior |
| `src/index.css`, `src/App.css`, `src/components/SlideArtwork.css` | Tokens, handbook interface, slide/artwork layouts |
| `tests/handbook.test.mjs` | Curriculum links, state validation, and route behavior |

The old simulated repositories, terminal, editor, review exercises, and their models/tests have been retired. The earlier plans in `WORKSHOP_PLAN.md` and the historical sections of `design/DIRECTION.md` describe previous versions. The current redesign is specified in [the implementation plan](design/PROFILE_README_IMPLEMENTATION_PLAN.md).

## Validation

The implementation passes unit checks, lint, and the production build. Browser validation uses local Chromium Playwright because the Browser plugin is unavailable. Checked surfaces include all 18 slides at desktop, mobile, and 4:3 projection; all seven guide checkpoints and both resource pages from 320 to 1440px; guide/setup persistence; clipboard success/failure; topic selection; legacy links; and browser Back. Keyboard/focus checks cover slide arrows, topic dialogs, notes, skip navigation, presentation focus containment, Escape and focus restoration, unavailable/rejected fullscreen, and malformed/blocked storage. Ten representative Axe scans report no WCAG A/AA or best-practice violations after contrast and accessible-name fixes.

A disposable real Git repository with a local bare remote verified clone, edit, status/diff, staging, committing, pushing, and repeating. A fresh observer clone confirmed the published contents. Bundled Windows nano 8.6 was checked with a real edit and Ctrl+O, Enter, Ctrl+X. These checks did not change any GitHub account.

Live GitHub authentication/profile publication, macOS/Linux editor behavior, Safari, a physical projector, and timing with a beginner group still need rehearsal. See the facilitator guide before the event.
