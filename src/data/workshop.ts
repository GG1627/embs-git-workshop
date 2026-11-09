export type WorkshopSlide = {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  visual: string;
  notes: string;
  practice?: string;
};

export type GuideBlock = {
  title: string;
  text?: string;
  command?: string;
  expected?: string;
  link?: { label: string; href: string };
};
export type HelpItem = { title: string; text: string };
export type Checkpoint = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  duration: string;
  slide: string;
  blocks: GuideBlock[];
  help: HelpItem[];
};
export type Platform = "windows" | "mac" | "linux";
export type SetupGuide = {
  label: string;
  terminal: string;
  blocks: GuideBlock[];
};

export const slides: WorkshopSlide[] = [
  {
    id: "welcome", section: "Start here", title: "Make your first GitHub profile.",
    subtitle: "A little about you. A real Git workflow.", visual: "welcome",
    notes: "Welcome UF EMBS. Show the finished example and explain the outcome: one real repository on your computer and GitHub, containing a README you wrote. The website is our guide; it cannot see your terminal or check your work. Account, installation and authentication setup should be finished beforehand. We will take our time and repeat the workflow. No programming experience or VS Code is required.",
  },
  {
    id: "versions", section: "Start here", title: "Remember what changed.",
    subtitle: "A history you can read, one change at a time.", visual: "versions",
    notes: "Ask what people usually do when they want to keep an earlier version of a file. Git records versions of a project and lets you compare them. Focus on remembering what changed and why, rather than teaching every recovery command. Our example will start as a short introduction and gain a learning goal.",
  },
  {
    id: "tools", section: "Start here", title: "Git saves. GitHub shares.",
    subtitle: "Two tools. Two places. One project.", visual: "tools",
    notes: "Git is the version-control tool on your computer. GitHub is a website that hosts Git repositories and supports collaboration. Git works locally without an internet connection; GitHub is not required to make a commit. Today we use both. Keep laptop/local on the left and GitHub/remote on the right throughout the deck.",
  },
  {
    id: "repository", section: "Start here", title: "A project, with a memory.",
    subtitle: "Repository = files + Git history.", visual: "repository",
    notes: "Repository, or repo, means the project and the history Git keeps for it. Our project is intentionally small: README.md is an ordinary text file in Markdown format. The repository can contain more files later. Saving text in an editor and saving a version in Git are separate actions. Avoid .git internals.",
  },
  {
    id: "profile", section: "Get your project", title: "Your username. Your repository.",
    subtitle: "A public README that appears on your profile.", visual: "profile", practice: "create",
    notes: "A profile README needs a public repository whose name matches your GitHub username, with a nonempty README.md in its root. Use New repository, choose your own account as owner, enter your username as the name, choose Public and enable Add README. If someone already has a profile repository, use it and preserve their existing content. Only include information they want public. Managed user accounts do not support profile READMEs; ask the facilitator for an ordinary practice repository instead.",
  },
  {
    id: "clone", section: "Get your project", title: "Bring it to your computer.",
    subtitle: "Clone copies the files and their history.", visual: "clone", practice: "clone",
    notes: "Open Code on the participant's own repository, select HTTPS and copy the URL. Choose an existing parent folder in Git Bash on Windows or Terminal on macOS/Linux. Run git clone with that URL. Replace placeholders with the real username; do not type the dollar prompt. Cloning makes the project folder and configures origin and the checked-out branch's upstream. No git init is needed inside the clone. A public clone can succeed without authenticating, so this alone does not verify push access.",
  },
  {
    id: "navigate", section: "Get your project", title: "Find your README.",
    subtitle: "Enter the folder. List the files. Read one.", visual: "navigate",
    notes: "Use cd followed by the cloned folder's name to enter it. ls lists files; cat README.md reads text. pwd is a help command if someone is unsure where they are. Explain the command and filename separated by a space, then let participants try. These commands help us find our project; they are not a separate terminal course.",
  },
  {
    id: "edit", section: "Make a change", title: "Write a little about yourself.",
    subtitle: "Edit README.md. Save. Exit.", visual: "edit", practice: "edit",
    notes: "Open nano README.md. Replace the starter with a heading and two short lines, or add to an existing profile. A nickname and learning interest are enough. Markdown headings begin with # and a space; a list item begins with - and a space. Teach Ctrl+O, Enter, Ctrl+X, and explain ^ means Ctrl. Use Control even on a Mac. If nano is unavailable, use an existing plain-text editor. This is a file save, not yet a Git commit. Keep this brief so profile decoration does not take over the workshop.",
  },
  {
    id: "status", section: "Save with Git", title: "Ask Git what it sees.",
    subtitle: "git status", visual: "status",
    notes: "Run git status. It should show README.md as modified and not staged. Status describes changed and selected files without changing anything. Have participants point to their README in the output. Their branch name may differ from the example; that is fine. A clean working tree later will mean no pending file changes, not necessarily that everything has reached GitHub.",
  },
  {
    id: "diff", section: "Save with Git", title: "Read the actual change.",
    subtitle: "git diff", visual: "diff", practice: "inspect",
    notes: "Minus lines are removed text; plus lines are added text. Ask a participant to describe their change before saving it. git diff compares working edits with staged contents; before staging here, that means changes since the last commit. It is not the history itself. If a pager opens, press q to return to the prompt. No output can mean the file was not saved or its changes were already staged.",
  },
  {
    id: "staging", section: "Save with Git", title: "Choose the next snapshot.",
    subtitle: "git add README.md", visual: "staging",
    notes: "Staging selects the current contents of README.md for the next commit. The file stays in the working folder. A repository snapshot also includes unchanged tracked files. If the participant edits again after staging, git add README.md again to select the newer version. Avoid introducing partial hunks or advanced staging. Ask what has been saved so far: editor contents are saved, the next commit is selected, but no new commit exists yet.",
  },
  {
    id: "commit", section: "Save with Git", title: "Give the change a name.",
    subtitle: 'git commit -m "Introduce myself"', visual: "commit", practice: "commit",
    notes: "A commit records a project snapshot with an author and message. -m supplies the message, and the quotes keep its words together. It saves the staged contents, not every working edit. The commit remains local. If author identity is missing, return to setup and configure name/email, using the participant's GitHub noreply email if desired. If nothing is staged, check status, save the edit and stage it first. Pause for everyone to see a successful commit.",
  },
  {
    id: "history", section: "Save with Git", title: "There is your history.",
    subtitle: "git log --oneline", visual: "history",
    notes: "The newest commit appears first in this short log. The short identifier names the commit; each participant's identifier will differ. Read the message and distinguish the new introduction from the initial README commit. Looking at history does not change the files. Press q if the output opens in a pager. Do not introduce HEAD, resetting, or detached checkout.",
  },
  {
    id: "local", section: "Share your work", title: "Saved here. Not shared yet.",
    subtitle: "A commit stays on your computer until you push.", visual: "local",
    notes: "Ask participants to predict whether their profile has changed yet. Compare the local history with the GitHub history: the new commit is only local. Repeat the distinction: save updates a file, commit records a version, push sends commits to GitHub. A clean working tree does not prove that the remote is up to date.",
  },
  {
    id: "push", section: "Share your work", title: "Send your commit to GitHub.",
    subtitle: "git push", visual: "push", practice: "publish",
    notes: "Because we cloned this repository and kept its original branch, git push normally uses its configured upstream. Complete the browser sign-in if prompted, using the same GitHub account that owns the repository. GitHub account passwords are not used directly as HTTPS Git passwords. Troubleshoot authentication rather than force pushing. If the remote has additional changes, stop and ask the facilitator to inspect them; do not discard work. Make time for this first authenticated push.",
  },
  {
    id: "published", section: "Share your work", title: "Your profile, updated.",
    subtitle: "Refresh GitHub. Find the commit. Visit your profile.", visual: "published",
    notes: "Check the repository README and commit history first, then open the participant's profile. The profile displays the nonempty README from their public username-matching repository. The website's Mark complete is only their own checklist, not automatic verification. If the README appears in the repository but not the profile, check its name, visibility, root filename and content. Congratulate the group on the concrete result without spending the remaining session on decoration.",
  },
  {
    id: "repeat", section: "Make it stick", title: "One more change. Your turn.",
    subtitle: "Add a learning goal, then publish it.", visual: "repeat", practice: "repeat",
    notes: "Give five minutes to add one learning goal or interest and repeat edit, status/diff, add, commit, push. Keep the guide available but avoid dictating each command immediately. Ask what each action does and where the change exists after it. Fast finishers can inspect their two commits and explain the distinction between file save, commit and push to a neighbor. Do not add branches or conflict exercises into the buffer.",
  },
  {
    id: "recap", section: "Make it stick", title: "You can do this again.",
    subtitle: "Edit. Inspect. Stage. Commit. Push.", visual: "recap",
    notes: "End the planned teaching by minute 50. Ask: what records the version, what uploads it, and how do you check a change before saving it? Point to the guide and reference for later practice. Branches, pull requests and collaboration are good next steps, not extra requirements today. Keep the final ten minutes for questions and catch-up. The proposed timing still needs a beginner rehearsal and real GitHub/account checks on the workshop devices.",
  },
];

export const starterReadme = `# Hi, I'm Alex

I'm interested in engineering and how technology can help people.

## What I'm learning
- Git and GitHub with UF EMBS
`;

export const checkpoints: Checkpoint[] = [
  {
    id: "create", title: "Create your profile repository.", shortTitle: "Create your repo", summary: "Make the GitHub home for your introduction.", duration: "3 min", slide: "profile",
    blocks: [
      { title: "Open a new repository.", text: "Sign in to GitHub, open New repository, and choose your own account as the owner.", link: { label: "New repository on GitHub", href: "https://github.com/new" } },
      { title: "Use your exact GitHub username.", text: "For example, if your username is alex-rivera, name the repository alex-rivera. Choose Public and turn on Add README. Then create the repository.", expected: "A public repository at github.com/YOUR-USERNAME/YOUR-USERNAME, with a README.md file." },
      { title: "Already have a profile README?", text: "Open that repository and keep its contents. You will make a small addition rather than replace your existing profile." },
    ],
    help: [
      { title: "GitHub says the repository already exists.", text: "Use the existing repository under your own account. You do not need to delete it or create another copy." },
      { title: "What should I make public?", text: "Your profile repository and its history are public. A nickname and learning interests are enough; leave out contact details or anything you want to keep private." },
      { title: "My account is managed by an organization.", text: "GitHub profile READMEs are unavailable for managed user accounts. Ask the facilitator about using a normal practice repository instead; the same Git commands still apply." },
    ],
  },
  {
    id: "clone", title: "Bring the repository to your computer.", shortTitle: "Clone your repo", summary: "Clone once, then work inside the new folder.", duration: "4 min", slide: "clone",
    blocks: [
      { title: "Copy your HTTPS repository URL.", text: "On your repository, choose Code, select HTTPS, and copy the URL. Open Git Bash on Windows or Terminal on macOS/Linux in the parent folder where you want the project." },
      { title: "Clone your own repository.", text: "Replace both YOUR-USERNAME placeholders, or paste the HTTPS URL you just copied after git clone. Do not copy a $ prompt.", command: "git clone https://github.com/YOUR-USERNAME/YOUR-USERNAME.git", expected: "Git creates a folder with your username and downloads README.md plus its Git history." },
      { title: "Enter the new folder.", text: "Replace YOUR-USERNAME with the folder Git created.", command: "cd YOUR-USERNAME", expected: "Your terminal is now inside the cloned repository. There is no need to run git init." },
      { title: "Find the README.", command: "ls", expected: "README.md appears in the file list." },
    ],
    help: [
      { title: "The folder already exists.", text: "If you already cloned this repository, enter that folder and run git status. Do not clone into it again. If it is an unrelated folder, choose a different parent folder with the facilitator." },
      { title: "Repository not found or the URL is wrong.", text: "Open your repository in the browser and copy its HTTPS URL again. Check the owner and repository name. A URL ending in /blob/ or /README.md is a file link, not a clone URL." },
      { title: "Where am I?", text: "Run pwd to print the current folder and ls to see its contents. Use cd .. to go up one folder. Ask for help before moving or deleting files." },
      { title: "Git is not recognized.", text: "Return to Setup. On Windows, open Git Bash after installing Git for Windows. Close and reopen the terminal if you just installed Git." },
    ],
  },
  {
    id: "edit", title: "Write your introduction.", shortTitle: "Edit the README", summary: "Use a few lines of Markdown. Keep it personal and simple.", duration: "7 min", slide: "edit",
    blocks: [
      { title: "Read the starting file.", command: "cat README.md", expected: "The existing README text prints in your terminal." },
      { title: "Open the file in nano.", text: "Use the starter below as inspiration. Replace Alex with your name or nickname and write one sentence about your interests. If you already have a profile, add a short learning goal to it.", command: "nano README.md" },
      { title: "Save, then exit.", text: "Press Ctrl+O to write the file, Enter to confirm README.md, then Ctrl+X to exit. The ^ symbol in nano means Ctrl; use the Control key on a Mac too.", expected: "You return to the terminal prompt. Your edited file is saved on your computer." },
      { title: "Check that your words were saved.", command: "cat README.md", expected: "The text you just wrote appears. Saving the file has not created a Git commit yet." },
    ],
    help: [
      { title: "nano is not available.", text: "Use an existing plain-text editor. In Windows Git Bash: notepad README.md. On macOS: open -e README.md, keeping it as plain text. On Linux, open README.md with an installed text editor. Save the file in the cloned folder; no VS Code installation is required." },
      { title: "I am stuck inside nano.", text: "Ctrl+O, then Enter, saves. Ctrl+X exits. If nano asks whether to save a modified buffer, press Y and then Enter to confirm the filename." },
      { title: "My file became README.md.txt.", text: "The filename must be README.md. Enable filename extensions in your file browser and ask the facilitator to help rename the file without replacing existing work." },
      { title: "How much Markdown should I use?", text: "A # heading, a short paragraph and a - list item are plenty. Keep a space after # or -. You can polish the profile after the workshop." },
    ],
  },
  {
    id: "inspect", title: "Look before you commit.", shortTitle: "Inspect the change", summary: "Find the changed file, then read its changed lines.", duration: "5 min", slide: "diff",
    blocks: [
      { title: "Check the repository status.", command: "git status", expected: "README.md is listed as modified under changes not staged for commit." },
      { title: "Read the difference.", command: "git diff", expected: "Lines beginning with - were removed. Lines beginning with + were added. Your new introduction appears here." },
      { title: "Explain the change.", text: "Before continuing, describe one changed line to a neighbor. Does the diff contain only the text you meant to change? If not, edit and save README.md again." },
    ],
    help: [
      { title: "Not a git repository.", text: "You are probably outside the cloned folder. Run pwd and ls, then cd into the folder created by git clone. Do not use git init as a repair step." },
      { title: "git diff shows nothing.", text: "Run git status. If there are no changes, make sure you saved README.md in the cloned folder. If the file is already staged, git diff --staged shows the selected change instead." },
      { title: "The terminal is showing a page of output.", text: "Git may open a pager for long output. Press q to close it and return to the prompt. This does not delete or undo anything." },
    ],
  },
  {
    id: "commit", title: "Save a version with Git.", shortTitle: "Stage & commit", summary: "Select the README contents, then record a named snapshot.", duration: "9 min", slide: "commit",
    blocks: [
      { title: "Stage the README.", command: "git add README.md", expected: "Usually there is no output. The current README contents are selected for your next commit; the file stays in its folder." },
      { title: "Check what is selected.", command: "git status", expected: "README.md is under changes to be committed. If you edit it again, run git add README.md again to select the newer contents." },
      { title: "Record your commit.", command: 'git commit -m "Introduce myself"', expected: "Git prints a new commit identifier and a summary of the changed file. The commit is saved locally." },
      { title: "Find your saved version.", command: "git log --oneline", expected: "Your new message appears above the initial commit. Your commit identifier will differ from everyone else's. Press q if a pager opens." },
    ],
    help: [
      { title: "Git asks who I am.", text: "Return to Setup and configure your Git author name and email. Use the exact GitHub noreply email from your GitHub email settings if you want to keep your personal email private. Then retry the commit." },
      { title: "No changes added to commit.", text: "Save your README in the editor, run git status, then git add README.md. Retry the commit after status lists the file under changes to be committed." },
      { title: "Nothing to commit, working tree clean.", text: "You may already have committed the change. Check git log --oneline for your message. If it is there, continue to publishing; a clean working tree does not prove that GitHub has the commit yet." },
      { title: "Can I inspect the staged version?", text: "Yes: git diff --staged compares selected contents with the last commit. git diff alone shows working edits that are not staged." },
    ],
  },
  {
    id: "publish", title: "Publish your introduction.", shortTitle: "Push & view profile", summary: "Send the commit to GitHub and see the result on your profile.", duration: "7 min", slide: "push",
    blocks: [
      { title: "Push your local commit.", text: "The clone already has an upstream configured. If a browser sign-in opens, use the GitHub account that owns this repository and complete the prompt.", command: "git push", expected: "The push finishes without an error. GitHub now has the commit from your computer." },
      { title: "Check the repository on GitHub.", text: "Refresh your repository page. Find your introduction in README.md and your message in the commit history.", expected: "The text and commit message match what you saved locally." },
      { title: "Visit your profile.", text: "Open your GitHub profile from your avatar menu. Your README should appear there. Mark this checkpoint complete once you have checked it yourself.", expected: "Your introduction appears on your profile. This guide cannot verify your computer or GitHub account." },
    ],
    help: [
      { title: "Authentication failed or permission denied.", text: "Check that you are signed in as the repository owner and cloned your own HTTPS URL. Return to the platform authentication instructions in Setup. GitHub account passwords are not accepted directly for HTTPS Git authentication. Ask for help rather than sharing credentials." },
      { title: "The push was rejected.", text: "The online repository may contain changes that your local copy does not have. Stop and ask the facilitator to inspect both versions. Do not force push or discard changes to get past the message." },
      { title: "The profile is still empty.", text: "First check that the pushed text appears in the repository. Then check that the repository is public, its name matches your username, and README.md is nonempty and in the repository root. Refresh the profile page." },
      { title: "The clone worked, so why does push ask me to sign in?", text: "A public repository can be downloaded without signing in. Pushing changes requires authentication and permission to write. These are separate checks." },
    ],
  },
  {
    id: "repeat", title: "Make one more change.", shortTitle: "Try it again", summary: "Add a learning goal and repeat the workflow with fewer prompts.", duration: "5 min", slide: "repeat",
    blocks: [
      { title: "Add one small detail.", text: "Open README.md again and add a learning goal or interest. Save and exit your editor. Keep existing text you want to preserve.", command: "nano README.md" },
      { title: "Inspect, select, record, share.", text: "Try the sequence yourself. Check your change, stage README.md, commit with a message such as Add a learning goal, then push. The reference is here if you need a reminder." },
      { title: "Check both places.", command: "git log --oneline", expected: "Your second commit appears in your local history. Refresh GitHub and your profile to check the published result too." },
      { title: "Explain the workflow.", text: "Which action saves a file? Which records a version? Which sends commits to GitHub? Tell a neighbor what happened at each step." },
    ],
    help: [
      { title: "I need the command sequence again.", text: 'After editing and saving: git status, git diff, git add README.md, git commit -m "Add a learning goal", then git push. Run each command separately and read its result.' },
      { title: "I finished early.", text: "Read your two commit messages and compare the local and GitHub histories. Help a neighbor explain save versus commit versus push, or plan another small README improvement for later." },
    ],
  },
];

export const reference: Array<{ command: string; meaning: string }> = [
  { command: "pwd", meaning: "Print the current folder." },
  { command: "cd FOLDER", meaning: "Enter a folder. Replace FOLDER with its name; cd .. goes up one level." },
  { command: "ls", meaning: "List the files in this folder." },
  { command: "cat README.md", meaning: "Read the README in the terminal." },
  { command: "git clone HTTPS-URL", meaning: "Copy a repository and its Git history to your computer. Replace HTTPS-URL with your repository URL." },
  { command: "nano README.md", meaning: "Edit the README. Ctrl+O, Enter saves; Ctrl+X exits." },
  { command: "git status", meaning: "See working changes, staged changes, and branch information." },
  { command: "git diff", meaning: "Compare working edits with staged contents." },
  { command: "git add README.md", meaning: "Select the current README contents for the next commit." },
  { command: "git diff --staged", meaning: "Compare selected contents with the last commit." },
  { command: 'git commit -m "Describe the change"', meaning: "Record a local project snapshot with a message." },
  { command: "git log --oneline", meaning: "Read the saved history. Press q if a pager opens." },
  { command: "git push", meaning: "Send local commits to this branch's configured upstream on GitHub." },
];

export const setupChecklist: string[] = [
  "I can sign in to my GitHub account.",
  "Git is installed and git --version works.",
  "My Git author name and email are configured.",
  "My HTTPS authentication method is ready.",
  "nano works, or I have a plain-text editor ready.",
  "I know how to open my terminal and choose a project folder.",
];

const identityBlocks: GuideBlock[] = [
  {
    title: "Set your commit author name.",
    text: "Replace Your Name with the name you want attached to your public commits. This configures Git; it does not sign you in to GitHub.",
    command: 'git config --global user.name "Your Name"',
  },
  {
    title: "Choose your commit email.",
    text: "Replace the example address. For privacy, copy your exact GitHub noreply address from GitHub Settings → Emails. It may include a numeric ID; do not invent an address from your username.",
    command: 'git config --global user.email "YOUR-GITHUB-NOREPLY-EMAIL"',
    link: { label: "Find your GitHub email settings", href: "https://github.com/settings/emails" },
  },
  {
    title: "Check your author identity.",
    command: "git config --get user.name\ngit config --get user.email",
    expected: "Your chosen name and email are printed. They will be recorded in future commits, including this public profile repository.",
  },
];

const accountBlock: GuideBlock = {
  title: "Create a GitHub account.",
  text: "Sign up before the workshop, finish email verification, and make sure you can sign in. Bring your laptop and your sign-in method. A nickname and learning interests are enough for your public profile.",
  link: { label: "Create a GitHub account", href: "https://github.com/signup" },
};

const authCheckBlock: GuideBlock = {
  title: "Check the GitHub CLI sign-in.",
  command: "gh auth status",
  expected: "GitHub CLI reports your own GitHub account as logged in. This checks sign-in, not permission to push to every repository.",
};

export const setupGuides: Record<Platform, SetupGuide> = {
  windows: {
    label: "Windows", terminal: "Git Bash",
    blocks: [
      accountBlock,
      {
        title: "Install Git for Windows.",
        text: "Use the official installer and keep Git Credential Manager enabled. Then open Git Bash from the Start menu. Reopen the terminal if Git was just installed.",
        link: { label: "Get Git for Windows", href: "https://gitforwindows.org/" },
      },
      { title: "Check Git.", command: "git --version", expected: "A Git version is printed." },
      ...identityBlocks,
      {
        title: "Prepare GitHub sign-in.",
        text: "Git for Windows includes Git Credential Manager. On your first authenticated push, follow its browser sign-in and choose the account that owns your repository. Your GitHub account password is not used directly as a Git HTTPS password. A public clone can work before you sign in.",
        link: { label: "GitHub credential setup", href: "https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git" },
      },
      {
        title: "Check your text editor.", command: "nano --version",
        expected: "Nano reports a version. If unavailable, use notepad README.md from the cloned repository during practice; save as plain text with the exact filename README.md.",
      },
      { title: "Choose your project folder.", text: "Open an existing folder in File Explorer and use Open Git Bash here, or use cd in Git Bash to reach it. Clone the repository into this parent folder during practice. You do not need VS Code." },
    ],
  },
  mac: {
    label: "macOS", terminal: "Terminal",
    blocks: [
      accountBlock,
      {
        title: "Check or install Git.", command: "git --version",
        text: "Open Terminal. If macOS prompts you to install Command Line Tools, finish that before the workshop, then run the check again.",
        expected: "A Git version is printed.",
        link: { label: "Official Git installation guidance", href: "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" },
      },
      ...identityBlocks,
      {
        title: "Install GitHub CLI for browser sign-in.",
        text: "Use the official macOS installation instructions before the workshop. If you already use Homebrew, the command is brew install gh. GitHub CLI handles authentication here; the practice itself still uses Git commands.",
        link: { label: "Install GitHub CLI on macOS", href: "https://github.com/cli/cli/blob/trunk/docs/install_macos.md" },
      },
      {
        title: "Connect Git to your GitHub account.", command: "gh auth login",
        text: "Choose GitHub.com, HTTPS, Yes when asked to authenticate Git, and Login with a web browser. Finish the browser steps using your own account. Keep the sign-in code private.",
        expected: "The browser sign-in finishes and the terminal confirms your account.",
      },
      authCheckBlock,
      {
        title: "Check your text editor.", command: "nano --version",
        expected: "Nano reports a version. If unavailable, use open -e README.md from the cloned repository to edit with TextEdit. Keep the file as plain text and preserve its .md extension.",
      },
      { title: "Choose your project folder.", text: "Use an existing folder, such as Documents. In Terminal, use cd to enter that parent folder before cloning. You do not need VS Code." },
    ],
  },
  linux: {
    label: "Linux", terminal: "Terminal",
    blocks: [
      accountBlock,
      {
        title: "Check or install Git.", command: "git --version",
        text: "If Git is missing, install it using your distribution's package manager before the workshop. Installation commands vary by distribution.",
        expected: "A Git version is printed.",
        link: { label: "Official Git installation guidance", href: "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" },
      },
      ...identityBlocks,
      {
        title: "Install GitHub CLI for browser sign-in.",
        text: "Follow the official instructions for your Linux distribution. GitHub CLI handles authentication here; you will still use Git commands for the workshop.",
        link: { label: "Install GitHub CLI on Linux", href: "https://github.com/cli/cli/blob/trunk/docs/install_linux.md" },
      },
      {
        title: "Connect Git to your GitHub account.", command: "gh auth login",
        text: "Choose GitHub.com, HTTPS, Yes when asked to authenticate Git, and Login with a web browser. Finish the browser steps using your own account. Keep the sign-in code private.",
        expected: "The browser sign-in finishes and the terminal confirms your account.",
      },
      authCheckBlock,
      {
        title: "Check your text editor.", command: "nano --version",
        expected: "Nano reports a version. If it is missing, use an existing plain-text editor to open README.md in the cloned repository. There is no required editor installation.",
      },
      { title: "Choose your project folder.", text: "Use an existing folder you can find again. Open your terminal there, or use cd to enter it. Clone into this parent folder during practice. You do not need VS Code." },
    ],
  },
};
