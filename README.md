# Git & GitHub workshop / UF EMBS

A one-hour introduction to Git and GitHub for the University of Florida Engineering in Medicine & Biology Society. First, a standalone visual lesson introduces a class group-project scenario and explains Git and GitHub through that story. Then participants apply the workflow to a personal GitHub profile README.

The website provides **24 slides, including event check-in**, and **a separate practice guide with seven checkpoints**. Slide 2 uses the supplied event QR image and the case-sensitive code `LATAAE6Q`. Slide 3 introduces you (Gael), Maya, and Jordan preparing a class group presentation in the shared `class-project` repository. Practice happens afterward on participants' computers and GitHub accounts. The guide does not run Git or verify their work; completion checkboxes are personal reminders.

## Before the workshop

Send attendees the site's **Setup & reference** page in advance. They need a laptop, a GitHub account, Git, a configured author identity, HTTPS authentication, and nano or an existing plain-text editor. VS Code is not required.

The live plan contains about **25 minutes of teaching, 25 minutes of profile README practice, and ten minutes for questions and catch-up**. Account creation, installations, and authentication preparation happen beforehand. The timing still needs rehearsal with beginners.

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

- **Slides:** A three-sentence class group-project scenario immediately after check-in, followed by Git and GitHub definitions, repositories, and the Big 3 (add, commit, push). Each core command has an explicit situation, goal, command, and result: clone, status, diff, add, commit, log, push, and pull. A brief branch concept preview points toward later learning. Audience practice begins only after an explicit transition. Topic selection, notes, and fullscreen/in-window presentation remain available; arrows navigate and Escape exits.
- **Practice:** after the lesson, create the profile repository, clone, edit with nano or an existing editor, inspect, stage/commit, push/view, and repeat. Each checkpoint has commands, expected results, optional help, and a participant-controlled completion checkbox. Navigation is never gated by completion. The personal profile activity does not require an artificial teammate update or a pull.
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
| `src/data/workshop.ts` | Story slides, command scenarios, speaker notes, separate checkpoints, setup and reference |
| `src/App.tsx` | Shared navigation, progress, topics, presentation handoff |
| `src/lib/handbook.ts` | Validated v4 storage and canonical/legacy routing |
| `src/components/PracticeGuide.tsx` | Participant guide and checkpoint navigation |
| `src/components/SetupReference.tsx` | Platform setup, readiness, and reference |
| `src/components/CommandBlock.tsx` | Selectable commands, copy feedback and failure fallback |
| `src/components/SlideArtwork.tsx` | Authored story/command diagrams and the final profile activity visuals |
| `src/components/SlideCanvas.tsx` | Shared slide composition |
| `src/components/Presentation.tsx` | Projection scaling, fullscreen, keyboard and focus behavior |
| `src/index.css`, `src/App.css`, `src/components/SlideArtwork.css` | Tokens, handbook interface, slide/artwork layouts |
| `tests/handbook.test.mjs` | Curriculum links, state validation, and route behavior |

The old simulated repositories, terminal, editor, review exercises, and their models/tests have been retired. The earlier plans in `WORKSHOP_PLAN.md`, [the initial handbook implementation plan](design/PROFILE_README_IMPLEMENTATION_PLAN.md), and the historical sections of `design/DIRECTION.md` describe previous versions. The current two-part teaching sequence is documented in the facilitator guide and the current direction section.

## Validation

The revised 24-slide group-project lesson passes unit tests, lint, and the production build. Tests cover the teaching/practice boundary, command scenarios, check-in position, curriculum links, persistence, malformed data, and legacy routes. Local Chromium Playwright checked every slide at desktop (1440px), mobile (390px), narrow mobile (320px), tablet (768px), and 4:3 presentation sizes: 120 layout checks with no clipping, overlap, page overflow, or application errors. The complete slide sequence, explicit command goals/results, transition into the profile activity, and return to the closing slide passed. Nine representative Axe scans, including the scenario at desktop/narrow mobile sizes and the Big 3 at desktop/mobile sizes, reported no WCAG A/AA or best-practice violations. Verification used local Playwright because no browser connector was available.

An earlier independent real Git rehearsal used a temporary bare remote plus you/Maya clones: location update, inspect/stage/commit/push, Maya's checklist commit, and a clean pull that preserved both changes. Both clones ended with matching history. No network, GitHub account, global Git configuration, or workspace commits were involved.

The earlier handbook version passed unit checks, lint, and the production build. Its local Chromium Playwright checks covered the original 18 slides at desktop/mobile/4:3 projection, all seven guide checkpoints and both resource pages from 320 to 1440px, guide/setup persistence, clipboard success/failure, topic selection, legacy links, browser Back, keyboard/focus, fullscreen fallback, and malformed/blocked storage. Ten representative Axe scans had no WCAG A/AA or best-practice violations after corrections. These results are historical and do not establish that every revised story slide has been checked.

A disposable real Git repository with a local bare remote verified clone, edit, status/diff, staging, committing, pushing, and repeating. A fresh observer clone confirmed the published contents. Bundled Windows nano 8.6 was checked with a real edit and Ctrl+O, Enter, Ctrl+X. These checks did not change any GitHub account.

Live GitHub authentication/profile publication, macOS/Linux editor behavior, Safari, a physical projector, and timing with a beginner group still need rehearsal. See the facilitator guide before the event.
