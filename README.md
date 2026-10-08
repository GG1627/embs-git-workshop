# UF EMBS Git Workshop

A browser-only introduction to Git for the University of Florida Engineering in Medicine & Biology Society. Attendees need no downloads, editor, or account.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open the URL printed by Vite, usually `http://127.0.0.1:5173`.

```sh
npm run test
npm run lint
npm run build
```

The test command uses Node's TypeScript stripping; Node 22.6 or newer is required. The existing Vite toolchain may require a more recent Node 22 release.

## Workshop

- **Slides:** 26 core slides for a roughly one-hour session, plus nine slides for a 30-minute extension. Keyboard navigation and optional speaker notes are included.
- **Practice:** 12 guided or goal-based exercises and an open sandbox. Each task introduces one step at a time, with progressive hints and a reset.
- **Core:** terminal basics, initialization, intentional staging/commits, diff, branches, merges, conflicts, and simulated pull-request review.
- **Extension:** simulated fetch/pull/push, restore, revert, and an independent capstone.
- **Reference:** commands, simulator limits, and links for moving to real Git and GitHub.

Progress is stored locally in the attendee's browser. Changing between tabs preserves each exercise. A lesson or exercise can be selected from its picker. Direct links such as `/#slides/9` and `/#practice/conflict` make it easy to join the current lesson.

## What the simulator does

Working files, staging, and commits use separate snapshots. Branches refer to commits; commit history includes parent relationships. Command output and task success come from repository state. Students can make mistakes, correct them, and use supported alternative sequences.

This is a teaching simulation, not a full shell or Git implementation. It never executes system commands or contacts GitHub. Supported syntax is listed by `help` and in the reference. Remote operations and pull requests are local simulations. Merge conflict sections may cover a whole file. Revert supports clean single-parent commits. Unsupported commands and flags return an explanation.

## Edit the workshop

- `src/data/lessons.ts`: slide text, diagrams, chapter assignments, exercise links, and speaker notes.
- `src/data/exercises.ts`: scenarios, repository seeds, instructions, hints, and completion conditions.
- `src/lib/git.ts`: the shared repository model and terminal command execution.
- `src/components/`: terminal, file editor, slide diagrams, pull request, dialogs, and icons.
- `src/App.tsx`: navigation, exercise progression, persistence, and direct links.
- `src/App.css` and `src/index.css`: the GitHub-inspired visual system and responsive layouts.
- `design/DIRECTION.md`: current design specification and concept references.

## Share

`npm run build` creates a static site in `dist/`. It can be hosted on a static hosting provider without a backend. No hosting service or deployment is configured yet.
