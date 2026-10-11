# Git Multiverse: redesign and implementation brief

Latest agreed direction, October 10, 2026. Prepared for the user's handoff to Astra with High reasoning.

## Objective and authorization

Refine and implement an expressive redesign of the existing UF EMBS Git Workshop: a calm, painterly pixel-art world of floating islands and branching histories. Make Git concepts tangible through interactions connected to the real teaching simulator. Add a slides-only presentation mode.

The user likes the existing simple learning flow but finds the visual identity too close to GitHub. They explicitly chose Git Multiverse, supplied the Altura landscape reference, approved exploring floating islands, and asked for this implementation handoff. At the time this brief was written, only planning and documentation changes were requested; implementation is the next phase when the user invokes the handoff prompt.

This brief supersedes the GitHub visual direction and the earlier removal of presentation mode in `design/DIRECTION.md`. Historical multi-panel layouts in `WORKSHOP_PLAN.md` and rejected concept boards are not current visual requirements.

## Visual reference

Inspect [the supplied Altura reference](references/altura-pixel-landscape.png) before designing. This is a workspace copy of `C:\Users\gael8\Downloads\Altura_ Ideas for a Wider World.png`.

Borrow its mood and art treatment, rather than its page layout, copy, branding, airplane, or exact scenery:

- Expansive depth, soft atmospheric distance, painterly pixel edges, and a quiet sense of adventure.
- Dusk blue and lavender shadows balanced with peach, apricot, pale gold, and warm ivory.
- Expressive, spacious typography and a small number of clear controls.
- Warm light against cool scenery; detailed illustration with a calm overall composition.

The artwork should feel like an illustrated animated film or a lovingly painted game landscape. Avoid reducing the reference to coarse eight-bit blocks, arcade styling, neon space imagery, or an ordinary dashboard with pixel decorations.

Use floating islands at different depths, cloud banks, softly lit rocky surfaces, and thin luminous routes. Establish a coherent landscape across the experience, reducing scenery behind reading and operational surfaces. Keep foreground text and tools consistently legible.

### Starting palette and typography

These are exploratory roles, not locked color values. Refine them against the actual artwork and contrast checks:

| Role | Starting color |
| --- | --- |
| Deep ink / terminal | `#202943` |
| Dusk blue | `#405A83` |
| Lavender | `#A394C2` |
| Peach light | `#F4B58F` |
| Pale gold | `#F8D69B` |
| Warm ivory | `#FFF4DE` |

Try an elegant expressive display face for opening and chapter titles, a readable sans for explanations and controls, and a clear monospace for commands. Pixel art does not require pixelated text. Avoid using decorative fonts for command input or projecting body text over busy clouds.

## Product and teaching foundations

This is an existing React/TypeScript/Vite application, not a new marketing website. It teaches students with no terminal experience. The workshop works entirely in the browser without accounts or installation.

- Keep Slides, Practice, and an accessible Reference utility.
- Maintain one teaching idea per slide and one current task per exercise.
- Keep one primary working surface in practice: Terminal, Files, or History. Add a focused visual companion rather than rebuilding the previously rejected dense dashboard.
- Preserve the 35-slide deck, exercise coverage, optional extension material, and open sandbox; improve wording and presentation where useful.
- Preserve the wearable sensor project, `embs-pulse`, with readable settings and team notes. Avoid inventing an elaborate game story that competes with learning.
- Keep actual Git terminology alongside short analogies. Students should be able to transfer their understanding to real Git.
- Preserve progressive hints, explicit Continue, individual exercise resets, reference material, presenter notes, keyboard operation, and responsive access.
- Preserve local progress and routes such as `#slides/9` and `#practice/conflict`. If stored state must change, provide a compatible migration.
- Retain UF EMBS identity and supplied logos where appropriate; the interface should have its own identity.

## Composition and motion

### Opening

A generous pixel-painted sky with islands receding into the distance. One readable luminous history path connects a few checkpoints. Large type can retain "Your project. With a memory." A concise invitation leads into the workshop; returning learners can resume without navigating a long decorative introduction.

Give the landscape a clear focal point and intentional negative space. A few slow cloud layers or a tiny traveler can create atmosphere. Do not make users wait through an intro animation.

### Lessons

Use a few intentional layouts: opening, concept, command, comparison, worked example, and practice handoff. Each gets a large heading, a short explanation, and a substantial diagram or example.

Teach with short user-controlled visual steps where helpful: reveal the selected staging snapshot, advance a commit, compare two versions, or show branch divergence. Offer visible buttons and keyboard access. Keep slide advancement distinct from advancing an illustration so the presenter can predict what Next does.

Use quieter scenery and solid or sufficiently opaque reading areas. Let illustrative routes, island silhouettes, light, and typography carry the identity rather than repeated nested cards.

### Practice

Place the current goal close to the active tool. Pair it with a compact, contextual visual of the relevant repository state. On desktop this can sit alongside the tool; on small screens stack it or expose a labeled view without forcing constant switching.

The interaction loop is: act -> see the actual change -> understand its meaning -> continue when ready.

Prioritize animations caused by learner actions. Ambient movement is slower and quieter. Keep terminal input responsive and focused; command execution must not wait for animation. Respect reduced motion and provide equivalent static results.

## Visual teaching model

Use a consistent vocabulary. Separate the atmospheric landscape from the state diagram: decorative islands may represent the journey, but visible commit nodes and labeled routes must accurately represent repository history.

| Concept | Analogy and visual behavior | Accuracy requirement |
| --- | --- | --- |
| Working files | The project being edited now | Show current contents and pending edits, including untracked files |
| Staging | Composing the next snapshot | Show the index contents; staging does not move or delete working files |
| Commit | A saved checkpoint | The snapshot comes from the index, not automatically from every working file |
| Branch | A named route from a shared checkpoint | A branch is a reference to a commit; creating it alone does not invent new commits or duplicate all history |
| Switch | Follow another route | Update the active branch and display the simulator's actual file behavior |
| Diff | Compare two moments | Clearly identify what is being compared and show real changed content |
| Merge | Bring histories together | Display actual ancestry; distinguish a fast-forward from a two-parent merge |
| Conflict | Competing edits in the same place | Show both real alternatives and let the learner edit a resolution |
| Restore | Discard a pending edit | Show what will be replaced; this is different from undoing a commit |
| Revert | Add a new checkpoint undoing a change | Keep earlier history visible; do not animate history being erased |
| Remote | A shared history elsewhere | Keep fetch, pull, and push distinct and clearly simulated |

Use labels and shape as well as color to distinguish states. Analogy copy should be brief and contextual, with optional deeper explanations rather than paragraphs repeated on every screen.

### Signature interaction 1: intentional staging

Use the existing first-commit exercise:

1. Show the modified `sensor-config.json` and `team-notes.md`.
2. `git add sensor-config.json` selects the sensor change inside a "Next snapshot" composition. Team notes remain outside; both still exist in working files.
3. A successful commit creates the actual new checkpoint and updates the active branch reference.
4. Selecting the checkpoint reveals the saved snapshot. Clearly show that the notes remain uncommitted.

Support inspecting or previewing state visually. If a visual control performs a Git action, route it through the same simulator and show its corresponding command; do not create an independent shortcut with different semantics. Keep typing real commands central to terminal-learning tasks.

### Signature interaction 2: alternate histories

Creating a feature branch adds its label at the current checkpoint. New commits cause its route to diverge from main. Switching branches updates the active-route marker and file view. Inspecting a checkpoint shows its message, snapshot, and relationships without silently changing branches.

The History view should display the relevant full commit graph and branch references, not fabricate a second history from a decorative animation. Inspect `repo.commits` and `repo.branches`; the current `history(repo)` helper returns only commits reachable from the active branch.

### Signature interaction 3: conflicts and reconciliation

When the simulator reports a conflict, highlight the actual competing sensor settings and their source branches. Let the learner compare and edit the resolution through the existing file workflow. Resolve -> stage -> commit produces the actual merged history. Explain that Git needs a content decision rather than presenting conflicts as punishment or failure.

Extend this cause-and-effect treatment across other lessons and exercises with context-specific visuals. These three are the quality bar, not the only exercises that should receive the redesign.

## Slides-only presentation mode

This is explicitly requested and supersedes previous guidance removing a Present button.

- Add a discoverable Present control in Slides.
- Render only the current slide's title, explanation, and teaching visual in presentation mode. Hide the site header, tabs, footer, chapter toolbar, notes, and practice UI.
- Use the browser Fullscreen API when supported. Provide an in-window presentation fallback when unavailable or rejected.
- Scale composition for projection without clipping or requiring scroll at common laptop/projector sizes. Aim for 16:9 while adapting to other ratios.
- Arrow keys navigate slides; visible accessible controls remain available and may fade during inactivity, reappearing on pointer activity or keyboard focus.
- Escape restores the normal layout. Handle native fullscreen exit and presentation fallback consistently.
- Preserve the current slide, progress, route, and focus when entering or exiting. Do not steal navigation keys from focused controls or dialogs.
- Presenter notes remain outside the projected slide. A separate presenter window is optional future scope, not required for this pass.
- Practice remains in the regular application layout and never automatically enters fullscreen.

## Code map and implementation approach

Read applicable `AGENTS.md` and relevant design, React, image, and testing skills before implementation. Inspect existing assets and code before replacing components.

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Navigation, persistence, exercise progression, routes, presentation integration |
| `src/App.css`, `src/index.css` | Existing GitHub styling; replace with the new visual system |
| `src/components/SlideVisual.tsx` | Teaching diagrams and visual sequences |
| `src/components/Terminal.tsx` | Command input and transcript |
| `src/components/Files.tsx` | File editing and differences |
| `src/components/PullRequest.tsx` | Simulated review and merge |
| `src/components/Picker.tsx` | Lessons, exercises, reference dialogs |
| `src/data/lessons.ts`, `src/data/exercises.ts` | Teaching content, scenarios, hints, checks |
| `src/lib/git.ts` | Source of truth for repository state and execution |
| `tests/git.test.mjs` | Existing simulator checks |

Refine the visual direction into a coherent opening, a representative lesson, and a representative practice composition before broadly restyling. Use the reference image as an art-direction input for any generated scenery. Generate reusable artwork and layers rather than rendering functional UI as an image. Keep text, commands, controls, and state diagrams live and accessible.

Prefer the existing stack, SVG for accurate interactive diagrams, and lightweight image layers/CSS for scenery. Add dependencies only when they materially help. Derive visuals from repository state; successful supported alternative command sequences must work too. Animation events may emphasize changes, but persistent rendered state must still be correct after reload, reset, or switching exercises.

Update current design documentation and README to reflect the implemented result. Do not deploy, publish, or discard unrelated working-tree changes as part of this task.

## Verification and completion

Run `npm run test`, `npm run lint`, and `npm run build`. Visually inspect the actual app at desktop and mobile sizes using the available browser tooling. Exercise normal and reduced-motion views, keyboard navigation, primary practice workflows, persistence, and presentation entry/exit including native Escape and fallback mode.

Meaningful additional checks should cover new logic such as graph derivation or presentation behavior; avoid tests that merely repeat static styling.

The redesign is complete when:

- The opening unmistakably expresses the reference's calm painterly pixel mood with floating islands.
- Lessons and practice share that identity and remain readable and simple to navigate.
- Learner actions visibly affect accurate repository state, especially staging, branching, and conflicts.
- Every exercise remains usable; visuals and analogies help teach rather than obscure the real commands.
- Slides work as a clean, readable presentation; practice retains its normal workspace.
- Existing learning content, progress, direct links, and simulator behavior remain functional.
- Required checks pass and visible issues discovered during browser verification are fixed.

## Ready-to-paste handoff prompt

Read `design/GIT_MULTIVERSE_BRIEF.md` and inspect `design/references/altura-pixel-landscape.png`. This is our agreed redesign direction for the existing UF EMBS Git Workshop and supersedes the old GitHub styling and previous removal of presentation mode. Refine the direction, then implement it across the actual app: calm painterly pixel-art floating islands, dusk blue/lavender/peach colors, accurate interactive Git visualizations and helpful analogies, plus slides-only presentation mode with browser fullscreen and an in-window fallback. Keep the learning flow simple and preserve the simulator, exercises, progress, and direct links. Use the relevant skills, create the needed visual assets, verify the rendered experience in the browser, and run the existing tests, lint, and build. Make routine design decisions and carry the implementation through; ask only if a material unresolved choice blocks progress. Do not deploy. Finish with what changed, validation results, and any remaining limitations.
