# Git and GitHub workshop: profile README redesign

Current flow revision: the user subsequently requested a standalone visual Git/GitHub lesson followed by the README activity. The current 24-slide deck includes check-in as slide 2, a three-sentence class group-project scenario with Gael, Maya, and Jordan as slide 3, definitions, a Big 3 overview (add, commit, push), command scenarios (including pull), a brief branch concept, a recap, and an explicit transition to Practice. Budget approximately 25 minutes for teaching, 25 minutes for the profile activity, and ten minutes for questions/catch-up. The original interleaved 18-slide storyboard below is historical; see docs/FACILITATOR.md for the current run sheet.

Status: implemented following the user's instruction on November 9, 2026. The approved Workshop handbook direction, 18-slide deck, real README guide, setup/reference, routing, and source retirement are in place. See README.md and docs/FACILITATOR.md for verification and remaining live rehearsal checks. This document retains the agreed implementation specification below.

## 1. Purpose and boundaries

Deliver a comfortable one-hour beginner workshop that teaches Git and GitHub through a real profile README repository. Participants leave with a local repository, commits they made, and changes published to their GitHub profile.

The website has two main views: **Slides** for visual teaching and **Practice** for a participant guide. Setup and a concise reference are supporting destinations. The work happens in the participant's real terminal, text editor, and GitHub account.

Agreed constraints:

- No AI-generated images, including backgrounds, concept images, or replacement illustrations. Use authored HTML, CSS, SVG, existing official/club logos, and genuine screenshots only where useful.
- No VS Code requirement. Teach editing README.md with nano, with an existing plain-text editor as a fallback.
- One continuing profile README activity, replacing the simulator and independent exercise scenarios in the main experience.
- Plan 50 minutes of content and practice, leaving ten minutes for questions and catch-up.
- Keep installation/account/authentication setup outside those 50 minutes. Explain this expectation in advance.
- Stay in the existing React/TypeScript/Vite application. No backend, account system, GitHub integration, or new hosting requirement.

The core outcome is create repository -> clone -> edit -> inspect -> stage -> commit -> push -> inspect profile -> repeat. Branches, pull requests, conflicts, recovery, forks, and local repository initialization are follow-up topics rather than required hands-on work.

## 2. Approved visual direction: Workshop handbook

Use an editorial classroom handout as the visual reference: clear headings, deliberate spacing, short instructions, and diagrams that explain the current concept.

Proposed foundation, to be checked for contrast in the browser:

| Role | Treatment |
| --- | --- |
| Page | Warm white, approximately #FAF9F6 |
| Surface | White with restrained warm-gray dividers |
| Main text | Charcoal, approximately #20242A |
| Secondary text | Slate, approximately #59616D |
| Primary accent | EMBS blue #00629B |
| Secondary accent | EMBS purple #772583, used sparingly |
| Commands | Dark charcoal background, light monospace text |
| Success / differences | Accessible green and red paired with text, symbols, and line markings |
| Typography | Bold sans-serif headings, readable sans-serif body, monospace commands |

Use a system font stack initially to avoid an external font dependency. Aim for 17-18px guide body text with comfortable line height. Projection slides use substantially larger text and diagrams. Maintain modest corner radii, flat surfaces, and fine rules. Avoid gradients, scenery, decorative patterns, oversized landing-page artwork, nested cards, or decorative terminal windows.

One recognizable visual detail: a consistent README file symbol travels through the diagrams from laptop to staging, commit history, and GitHub. The laptop and GitHub remain in consistent positions across related slides. Blue indicates the current action; purple distinguishes the remote/shared side where appropriate.

The design skill's search supports readable documentation patterns, neutral surfaces, and clear type. Its generic search/contact/marketing patterns are not applicable to this workshop and will not be added.

## 3. Information architecture and navigation

Shared header: existing UF EMBS logo/identity, Slides, Practice, and a small Setup & reference link. No extra landing page or dashboard.

Slides:

- Short topic picker, current position, previous/next controls, presenter notes, and Present.
- Preserve keyboard navigation, fullscreen fallback, Escape behavior, focus restoration, reduced-motion support, and projection scaling.
- Link to the matching practice checkpoint at a few natural pauses.
- Keep participant instructions and speaker notes outside the projected content.

Practice:

- Desktop: compact checkpoint sidebar and one readable instruction column.
- Mobile: the same guide with a compact checkpoint menu; command blocks scroll internally if needed.
- Each checkpoint contains a goal, numbered actions, the relevant command, expected result, and collapsed troubleshooting.
- Show progress only when the participant chooses Mark complete. Allow free navigation and return to earlier steps.
- Label this as a guide; do not imply that the website can inspect local files, authenticate GitHub, or verify a push.
- Keep clipboard feedback accessible and provide selectable commands if copying is unavailable.

Use stable topic/checkpoint URLs. Preserve the current position independently in Slides and Practice. Existing legacy links should open a relevant new topic where a clear equivalent exists; obsolete simulator links should lead to the practice introduction with a short explanation.

## 4. Setup guide and editor choice

Author concise platform-specific setup for Windows Git Bash, macOS Terminal, and Linux terminal. Keep the live exercise commands consistent across these shells.

Before arrival, participants should:

1. Create a GitHub account and confirm they can sign in.
2. Install Git and check git --version.
3. Configure their Git author name and email; explain the GitHub noreply email option because commits and the profile repository will be public.
4. Set up one documented HTTPS authentication route for their platform. Prefer bundled Git Credential Manager on Windows; choose and verify a clear browser-based route for macOS/Linux while authoring those instructions. Do not present SSH, tokens, CLI, and credential helpers as equally weighted choices for beginners.
5. Check nano --version. If unavailable, use a documented existing plain-text editor fallback rather than adding a mandatory editor installation.
6. Know where to open the terminal and where to put the cloned folder.

Distinguish installed Git, signed-in GitHub, configured author identity, and permission to push. A successful clone of a public repository does not prove push authentication works. Include troubleshooting for the first authenticated push and an optional advance verification procedure.

Teach only the nano controls needed for the activity:

    nano README.md

Type/edit text; Ctrl+O writes the file; Enter confirms the filename; Ctrl+X exits. Explain that the ^ symbol in nano means Ctrl. Avoid relying on newer shortcuts such as Ctrl+S, which may differ across installed versions. Use git commit -m so a commit does not unexpectedly launch another editor.

No requirement to publish contact details or other private information. A name or nickname, learning interests, and a small project goal are enough. Existing profile README owners edit their existing repository without replacing its contents.

## 5. Live workshop schedule

| Minutes | Activity |
| --- | --- |
| 0-7 | Show the finished profile; explain Git versus GitHub, repositories, and local versus remote |
| 7-14 | Create the profile repository on GitHub, clone it, enter its folder, and find README.md |
| 14-21 | Edit a short personal introduction with nano; save and exit |
| 21-35 | Explain and practice status, diff, staging, commit, and reading history |
| 35-42 | Push, inspect the GitHub commit, and view the updated profile |
| 42-47 | Make and publish a second small change with less guidance |
| 47-50 | Explain the workflow back; point to next steps |
| 50-60 | Questions, troubleshooting, and catch-up |

This is a proposed facilitation budget, not a tested guarantee. Rehearse it with beginners and shorten the opening or README content if the first run overruns. No new required topics should consume the buffer.

## 6. Slide storyboard

Target 18 core slides. Each slide has one teaching idea and one dominant visual. Most visible copy consists of a short headline plus a few labels or one command. Definitions and caveats that need sentences belong in presenter notes or the guide. Do not shrink text to force extra content onto a slide.

| # | Topic | Main visual |
| --- | --- | --- |
| 1 | Build your GitHub profile | Authored example profile with a tiny README excerpt |
| 2 | Why keep versions? | Two README versions and a readable change history |
| 3 | Git and GitHub | Laptop with Git versus shared repository on GitHub |
| 4 | What is a repository? | README file plus commit history inside a project folder |
| 5 | Our profile repository | username/username and a small resulting profile preview |
| 6 | Clone | Copy from the GitHub repository to the laptop; git clone |
| 7 | Find the file | Short cd / ls / cat sequence annotated by purpose |
| 8 | Edit and save | Small nano excerpt with the three save/exit actions |
| 9 | Ask Git what changed | Simplified git status output with changed README highlighted |
| 10 | Read a diff | Before/after README lines with + and - markings |
| 11 | Choose the next commit | README contents copied into staging using git add README.md |
| 12 | Record a commit | Selected content becomes a labeled saved snapshot; git commit -m |
| 13 | Read the history | Two or three commits and git log --oneline |
| 14 | Local is not online yet | Local history ahead of the GitHub copy |
| 15 | Push | Commits move to GitHub; git push |
| 16 | See the result | Updated repository and profile, explicitly linked to the push |
| 17 | Your turn again | A second small README change and the familiar workflow |
| 18 | What you can do now | Edit -> inspect -> stage -> commit -> push; next-step links |

Teach staging as selecting a version of file contents, not moving the file away from the working folder. A commit records a project snapshot and stays local until pushed. A clean working tree does not necessarily mean GitHub is up to date.

Use simple click-controlled reveals only where they clarify a transition. No automatic animations or autoplay. Every diagram must remain understandable with reduced motion. Include text alternatives and avoid color-only meanings.

## 7. Practice checkpoint content

Use one simple starter README, for example a heading, a sentence about interests, and one learning goal. Teach only headings, plain text, and a short list. No badges, statistics widgets, generated graphics, external embeds, or profile-decoration dependencies.

Checkpoints:

1. **Create your profile repository.** Public repository whose name matches the GitHub username, with a nonempty root README.md. If it already exists, use it.
2. **Clone your repository.** Copy its HTTPS URL, choose a parent folder, run git clone, then cd into the clone. Explain clone versus creating another empty folder. Do not run git init inside the clone.
3. **Read and edit README.md.** Brief ls/cat introduction as needed, nano editing, save and exit, optional editor fallback.
4. **Inspect your change.** git status, git diff, and what the changed lines mean. Provide q-to-exit help if output opens in a pager.
5. **Stage and commit.** git add README.md, then git commit -m "Introduce myself". Explain that editor save, staging, and commit are separate actions. Keep git diff --staged in contextual help/reference.
6. **Publish and inspect.** git push, browser refresh, repository history, then the GitHub profile. Use the upstream configured by cloning instead of assuming every participant's default branch is called main.
7. **Do it again.** Add one learning goal or interest, inspect, stage, commit, push, and check the result with fewer prompts.

Troubleshooting must cover wrong folder, missing Git/nano, README.md.txt, unsaved nano edits, nothing staged, missing author identity, incorrect clone URL, push authentication/access errors, README visibility/name/content requirements, and an existing profile repository. Handle a rejected push without suggesting force push or discarding existing work; direct the participant to facilitator help for divergent changes.

The guide should use expected observations rather than exact hashes or brittle copies of full terminal output. Never run pasted commands automatically or request GitHub credentials.

## 8. Implementation sequence

1. **Establish a safe working baseline.** Inspect current AGENTS.md instructions and the existing dirty working tree. Preserve unrelated work. Identify code to reuse before removing anything; do not reset the repository.
2. **Author the curriculum.** Replace the oversized deck with the storyboard, notes, concise practice checkpoints, setup instructions, reference, and the facilitation schedule. Keep IDs stable and link related topics.
3. **Establish the handbook styles.** Consolidate tokens, typography, spacing, buttons, command blocks, and diagram primitives. Replace the layered App.css/Workshop.css overrides with a coherent maintained style structure. Remove generated artwork from the active interface and imports; do not delete historical design assets without a separate reason.
4. **Build the shared shell and practice guide.** Replace simulator-driven app state with slide position, guide checkpoint, explicit completion checkboxes, and setup/platform preferences. Keep persistence local and optional for use. Implement the guide, copying, reference, troubleshooting, and deep links.
5. **Build the visual slide deck.** Implement reusable SVG/HTML visual primitives, the 18 slide compositions, presenter notes, and checkpoint handoffs. Adapt and retain the existing accessible presentation behavior.
6. **Retire unused simulator code.** Once the new flow is working, remove unused terminal/editor/repository/PR simulator components, their models, and tests that cover only removed features. Retain any reusable icon, presentation, dialog, and navigation code that still fits. Update package scripts accordingly.
7. **Handle old saved state and URLs.** Use a new versioned storage key; leave old simulator records intact. Never convert old simulated completions into claims of real Git work. Map compatible topic links; explain obsolete practice links. Ensure malformed storage does not break startup.
8. **Verify and document.** Run the checks below; update README.md and design/DIRECTION.md to the final implemented behavior and actual validation results. Keep hosting/deployment outside this task unless subsequently requested.

## 9. Validation and acceptance

- Run the repository's applicable test, lint, and production build commands after updating scripts for the new architecture.
- Add focused tests for stable/valid curriculum links, routing and persisted-state handling where behavior is nontrivial. Do not retain tests that require the old 59-slide curriculum or simulated exercises.
- Walk the actual commands in a disposable local repository, using a temporary bare remote to verify clone/edit/commit/push without changing a user's GitHub account. Verify nano editing and save/exit where the test environment supports it. Document platform checks that remain untested.
- Manually verify GitHub repository creation/profile requirements against official documentation. Only claim an end-to-end live GitHub push/profile check if it has actually been performed on an authorized test account; otherwise record it as a remaining rehearsal check.
- Inspect rendered opening, concept, diff/staging, command, practice, setup, and help screens at phone, tablet, and laptop widths. Check all slides in presentation mode, including 4:3 projection and fullscreen fallback.
- Exercise keyboard navigation, visible focus, skip link, topic/checkpoint switching, clipboard success/failure, checkbox persistence, browser back/deep links, notes, Escape, and fullscreen focus restoration. Check contrast, reduced motion, diagram alternatives, wrapping, and overflow.
- No runtime console errors; no page-level horizontal overflow; no clipped projected teaching content; no generated-image dependencies in the active UI.
- The site never claims it has verified the participant's local repository or GitHub account. The participant can freely navigate and use the guide without completing checkboxes.
- Final delivery includes the implemented site, a concise facilitator run sheet, advance setup instructions, and a clear record of checks performed and any remaining live rehearsal items.

## 10. Source references for authoring

- Profile README requirements: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
- Cloning: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
- HTTPS credential setup: https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git
- Git for Windows: https://gitforwindows.org/
- Git for Windows editor/credential-manager installer options: https://gitforwindows.org/silent-or-unattended-installation
- Apple command-line editor guidance: https://support.apple.com/guide/terminal/use-command-line-text-editors-apdb02f1133/mac
- Nano shortcuts: https://www.nano-editor.org/dist/latest/cheatsheet.html

Recheck current platform installation and authentication instructions during implementation. Do not freeze volatile download versions into the workshop copy.
