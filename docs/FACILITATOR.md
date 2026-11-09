# UF EMBS Git and GitHub workshop

## Outcome

Participants first learn Git and GitHub through a standalone visual lesson. A class group-project story gives the core commands a purpose. They then apply that knowledge to a GitHub profile README using real Git on their own computer: clone, edit, inspect, stage, commit, push, check the result, and repeat with less guidance.

The site is a visual presentation and participant guide. Its checkboxes record participant-reported progress only; it cannot inspect their computer or verify their GitHub work.

## Before the event

Send the site's Setup instructions in advance. Ask participants to bring a laptop and complete these steps:

- Create a GitHub account, verify email, and confirm sign-in.
- Install Git and check `git --version`.
- Configure the Git author name and email. Show where to copy the exact GitHub noreply email if participants want to keep their personal email out of public commits.
- Prepare HTTPS authentication: Git Credential Manager bundled with Git for Windows; GitHub CLI browser login on macOS/Linux.
- Check `nano --version` or choose an existing plain-text editor.
- Know how to open Git Bash on Windows or Terminal on macOS/Linux and choose a parent folder for the clone.

Offer a setup help period before the advertised workshop. Installation, email verification, account recovery, and authentication troubleshooting are not part of the 50-minute teaching budget.

Prepare an authorized demonstration repository for the class project story if you want to show live commands. Use the same three text files as the slides: project-notes.md, outline.md, and checklist.md in class-project. The example-team clone URL in the lesson is illustrative; do not ask attendees to clone it. Prepare a separate ordinary demo profile repository for the later personal activity. Keep browser and terminal text large, test the actual projector, and use no AI-generated backgrounds or illustrations.

Leave check-in slide 2 visible as people arrive. It uses the supplied QR image and the case-sensitive code `LATAAE6Q`. Complete as much check-in as possible before the advertised start so it does not consume the lesson or question buffer.

An optional advance push check can use a separate disposable repository owned by the participant: create it with a README, clone it, make a small non-sensitive edit, commit, push, and inspect the GitHub result. This is stronger than just checking installation or sign-in. A public clone alone does not prove that authenticated pushing works. Do not automatically create or delete participant repositories.

## Run sheet

| Minutes | Slides / view | Activity |
| --- | --- | --- |
| 0-2 | 1-2: intro and check-in | Welcome; finish check-in using QR and LATAAE6Q |
| 2-3 | 3: class group-project scenario | Introduce Gael, Maya, and Jordan and the shared presentation goal |
| 3-8 | 4-8: version control, Git, GitHub, repositories, Big 3 | Explain the tools using the established scenario; briefly preview add, commit, push |
| 8-10 | 9-10: clone and navigation | Maya shares the project; Gael brings down a copy |
| 10-18 | 11-16: edit, status, diff, stage, commit, history | Follow one location change through a complete local commit |
| 18-22 | 17-20: local versus shared, push, pull, branch concept | Share your change, receive Maya's update, briefly explain a separate line of work |
| 22-25 | 21-23: recap, explicit application transition, profile requirements | Review the commands, then introduce the personal README activity |
| 25-47 | Practice guide, seven checkpoints | Create/clone/edit/inspect/commit/push a profile README; repeat one small change |
| 47-50 | 24: closing | Check the published result, explain the workflow, find the reference |
| 50-60 | Questions and catch-up | Help people finish; no new required concepts |

This is a facilitation budget, not a guarantee validated with a beginner group. The lesson and activity are two separate parts; do not switch attendees into the guide after each command. Rehearse and shorten explanations or README content if needed. Protect the final ten minutes. Skip decorative Markdown work before skipping the second repetition.

## Teaching notes

Use the same vocabulary and visual positions throughout: computer/local on the left, GitHub/remote on the right. A repository includes project files and Git history. `git add` selects current file contents; it does not move the file away. If a file changes after staging, add it again to select the newer contents. A commit records a project snapshot, including unchanged tracked files, and stays local until pushed.

Keep the class group-project story continuous. You (Gael), Maya, and Jordan are classmates preparing a group presentation. Gael maintains project-notes.md, Maya maintains checklist.md, and Jordan maintains outline.md. Maya has shared a small class-project repository. You clone it, change the location in project-notes.md from Room 101 to Room 202, inspect the change, stage it, and commit with `Update presentation location`. GitHub still has the earlier version until you push. Maya later adds `Bring the presentation adapter` to checklist.md and publishes her commit. Your local files are clean, so the prepared `git pull` example brings her new commit down without a conflict. Do not introduce a conflict or divergent-history detour in this lesson.

Keep the Big 3 overview under a minute: add selects contents, commit records a local version, and push shares commits on GitHub. Saving in an editor does not create a commit. Set up the group-project scenario on slide 3, immediately after check-in, using its three plain-language sentences before introducing Git vocabulary. Explain the definitions in terms of that shared problem. After the Big 3 overview on slide 8, return to the project: Maya shares the link and Gael needs a local copy. For every command, read the situation and goal, show the command, then inspect the result. Ask a prediction question before revealing the result. Attendees can answer or discuss with a neighbor while keeping their own terminal work for the later activity.

| Story situation | Command / idea |
| --- | --- |
| You join Maya's project and need a copy | `git clone` |
| You edited notes and want to identify changed files | `git status` |
| You want to inspect the exact location change | `git diff` |
| You choose the finished notes for the next saved version | `git add` |
| You record the update with a useful message | `git commit` |
| You want to read the saved project versions | `git log` |
| Jordan and Maya need to see your committed update on GitHub | `git push` |
| Maya has published her checklist update and you need it locally | `git pull` |

The branch slide is a short concept preview: Jordan wants to try another presentation outline on a separate line of saved work. It is not a branch-command exercise. Transition explicitly at the end: now use this knowledge to build your own profile README.

Teach only the terminal commands needed in context. `cd` enters the clone, `ls` lists files, `cat` reads a text file, and `pwd` helps someone who is lost. The story uses project-notes.md; the personal activity uses README.md. Do not turn the opening into a shell lesson.

Use `nano README.md`. To save and exit: Ctrl+O, Enter, Ctrl+X. Explain that `^` means Ctrl, including on a Mac. Fallbacks are `notepad README.md` in Windows Git Bash, `open -e README.md` on macOS with plain-text format, or an existing Linux text editor. Check the exact filename; avoid `README.md.txt`.

Use `git commit -m "Introduce myself"` to avoid unexpectedly launching an editor for the commit message. Use `git push` on the original cloned branch; its upstream is already configured. Do not assume every account uses a branch called `main`. Do not run `git init` in an existing clone.

Keep the profile content small: a nickname, learning interests, and a goal are enough. Participants do not need to disclose contact details. Existing profile owners make a small addition and keep their current text. GitHub profile READMEs are unavailable for managed user accounts; those participants can use a regular practice repository for the same local workflow.

Ask short understanding questions at transitions:

- After editing: has Git saved a new version yet?
- After staging: what contents will the next commit record?
- After committing: has GitHub received the change yet?
- After pushing: can you find the same message in both histories?
- At the end: how would you publish one more change?

Detailed branch commands, pull requests, forks, conflicts, restore/revert and `git init` belong in follow-up learning. Do not add them as mandatory work for fast finishers. The profile activity does not need a pull unless there is a genuine online change to retrieve. Fast finishers can inspect their two commits and help neighbors explain the workflow.

## Help priorities

1. **Wrong folder:** check `pwd`, `ls` and `git status`; enter the clone. Do not initialize a new repository to hide a location problem.
2. **Unsaved edit:** save in nano and confirm with `cat README.md`.
3. **Empty diff:** use status to distinguish unchanged, unstaged and staged contents; use `git diff --staged` only when appropriate.
4. **Missing identity:** return to Setup and configure name/email, then retry the commit.
5. **Authentication:** confirm the remote URL belongs to the participant and that the browser/credential helper uses the same account. Public cloning and authenticated pushing are separate.
6. **Rejected push:** inspect the local and online changes with the participant. Do not suggest force push or discarding work. Stop the generic guide and help reconcile their actual state.
7. **Missing profile content:** first check the push and repository contents, then public visibility, username-matching repository name, and a nonempty root `README.md`.

Never ask participants to paste credentials into the workshop website, chat, or a projected terminal. Let them complete account sign-in themselves.

## Rehearsal and validation record

The revised 24-slide group-project flow passed unit tests, lint, and production build. Chromium Playwright checked all slides at desktop, mobile, narrow mobile, tablet, and 4:3 presentation sizes (120 layout checks), with no clipping, overlap, page overflow, or application errors. The slide sequence, explicit goals/results, and slide-to-guide-to-closing flow passed. Nine representative Axe accessibility scans, including the scenario at desktop/narrow mobile sizes and the Big 3 overview at desktop/mobile sizes, reported no WCAG A/AA or best-practice violations.

An earlier version of the two-person workflow was rehearsed with real Git using a temporary bare remote and two local clones: you publish Room 202; Maya pulls, adds a checklist reminder and pushes; you pull into a clean working tree. Both changes and the ordered history were preserved, and both clones ended at the same commit. No GitHub account, global configuration, or workspace repository was changed.

Historical handbook implementation checks passed on November 9, 2026, before this teaching-flow revision:

- Unit tests for curriculum links, validated progress, malformed data, and legacy routes; lint; production build.
- All 18 slides at desktop, mobile, and 4:3 projection sizes without clipping; all seven guide checkpoints plus setup/reference from 320 to 1440px without page overflow.
- Browser checks for checklist/platform persistence, clipboard success/failure, mobile checkpoint menu, troubleshooting, starter README, legacy notices, browser Back, keyboard/focus, fullscreen fallbacks, Escape, and blocked/malformed storage.
- Ten representative Axe accessibility scans with no WCAG A/AA or best-practice violations after corrections. No tested application runtime errors.
- Real Git workflow using a disposable local bare remote: clone, edit, inspect, stage, commit, push, repeat, then verify contents/history in a fresh clone. No GitHub account was changed.
- Windows nano 8.6 in a real PTY: edited a temporary Markdown file, used Ctrl+O, Enter, Ctrl+X, and verified the saved text.

Browser testing used local Chromium Playwright because the Browser plugin was unavailable. Content sources were checked against official GitHub/GitHub CLI documentation while authoring. These checks do not establish live GitHub authentication or profile rendering.

Before the live workshop, still verify:

- The complete create/clone/edit/commit/push/profile flow on an authorized demo GitHub account.
- Nano and editor fallback instructions on representative Windows, macOS and Linux laptops.
- Authentication with accounts that do not already have working cached credentials.
- The site's presentation on the physical projector and its visible font sizes.
- Timing with at least one participant who has not used Git or a terminal before.

Do not describe a temporary local bare-remote test as a live GitHub authentication or profile-rendering test. Installation checks, browser sign-in checks and successful push checks establish different things.

## Official references

- [Profile README requirements](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme)
- [Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [GitHub credential setup](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)
- [GitHub CLI authentication](https://cli.github.com/manual/gh_auth_login)
- [GitHub CLI installation on macOS](https://github.com/cli/cli/blob/trunk/docs/install_macos.md)
- [GitHub CLI installation on Linux](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)
- [Git for Windows](https://gitforwindows.org/)
- [Nano shortcuts](https://www.nano-editor.org/dist/latest/cheatsheet.html)
