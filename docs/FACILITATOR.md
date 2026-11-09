# UF EMBS Git and GitHub workshop

## Outcome

Participants create or update a GitHub profile README using real Git on their own computer. They clone a repository, edit a file, inspect the change, stage it, commit it, push it, and check the published result. They repeat the workflow once with less guidance.

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

Prepare your own ordinary demo profile repository with a short README, using an account authorized for demonstration. Keep browser and terminal text large. Have the Practice guide open alongside the presentation, and test the actual projector. Use no AI-generated backgrounds or illustrations.

An optional advance push check can use a separate disposable repository owned by the participant: create it with a README, clone it, make a small non-sensitive edit, commit, push, and inspect the GitHub result. This is stronger than just checking installation or sign-in. A public clone alone does not prove that authenticated pushing works. Do not automatically create or delete participant repositories.

## Run sheet

| Minutes | Slides | Participant work |
| --- | --- | --- |
| 0-7 | 1-4: result, history, Git/GitHub, repository | Meet the small README project; explain local versus remote |
| 7-14 | 5-7: profile repository, clone, navigation | Create their username-matching repository, clone, enter folder, list files |
| 14-21 | 8: edit and save | Write a brief introduction with nano; save and exit |
| 21-35 | 9-13: status, diff, stage, commit, history | Inspect, stage, commit, read history |
| 35-42 | 14-16: local, push, published | Push, inspect GitHub, visit profile |
| 42-47 | 17: repeat | Add a learning goal and publish another commit with less prompting |
| 47-50 | 18: recap | Explain save versus commit versus push; find the take-home reference |
| 50-60 | Questions and catch-up | Help people finish; no new required concepts |

This is a facilitation budget, not a guarantee validated with a beginner group. Rehearse and shorten opening explanations or README content if needed. Protect the final ten minutes. Skip decorative Markdown work before skipping the second repetition.

## Teaching notes

Use the same vocabulary and visual positions throughout: computer/local on the left, GitHub/remote on the right. A repository includes project files and Git history. `git add` selects current file contents; it does not move the file away. If a file changes after staging, add it again to select the newer contents. A commit records a project snapshot, including unchanged tracked files, and stays local until pushed.

Teach only the terminal commands needed in context. `cd` enters the clone, `ls` lists files, `cat` reads the README, and `pwd` helps someone who is lost. Do not turn the opening into a shell lesson.

Use `nano README.md`. To save and exit: Ctrl+O, Enter, Ctrl+X. Explain that `^` means Ctrl, including on a Mac. Fallbacks are `notepad README.md` in Windows Git Bash, `open -e README.md` on macOS with plain-text format, or an existing Linux text editor. Check the exact filename; avoid `README.md.txt`.

Use `git commit -m "Introduce myself"` to avoid unexpectedly launching an editor for the commit message. Use `git push` on the original cloned branch; its upstream is already configured. Do not assume every account uses a branch called `main`. Do not run `git init` in an existing clone.

Keep the profile content small: a nickname, learning interests, and a goal are enough. Participants do not need to disclose contact details. Existing profile owners make a small addition and keep their current text. GitHub profile READMEs are unavailable for managed user accounts; those participants can use a regular practice repository for the same local workflow.

Ask short understanding questions at transitions:

- After editing: has Git saved a new version yet?
- After staging: what contents will the next commit record?
- After committing: has GitHub received the change yet?
- After pushing: can you find the same message in both histories?
- At the end: how would you publish one more change?

Branches, pull requests, forks, conflicts, restore/revert and `git init` belong in follow-up learning. Do not add them as mandatory work for fast finishers. Fast finishers can inspect their two commits and help neighbors explain the workflow.

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

Implementation checks passed on November 9, 2026:

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
