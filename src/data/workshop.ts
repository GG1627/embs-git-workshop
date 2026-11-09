export type WorkshopSlide = {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  visual: string;
  scenario?: string;
  goal?: string;
  result?: string;
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
    id: "welcome", section: "Start here", title: "Intro to Git & GitHub",
    subtitle: "Track changes. Share your work. Work together.", visual: "welcome",
    notes: "Welcome UF EMBS. This workshop has two parts: first a visual introduction to Git and GitHub through a class group-project story; then everyone applies the workflow to a GitHub profile README. Teach the whole story before opening Practice. Plan about 25 minutes for explanation, 25 for the README activity, and ten for questions and catch-up. Installation, accounts, and authentication should be prepared beforehand.",
  },
  {
    id: "check-in", section: "Start here", title: "Check in for the workshop.",
    subtitle: "Scan the QR code, then enter the event code.", visual: "check-in",
    notes: "Leave this slide visible as attendees arrive. The event code is LATAAE6Q, exactly as shown, with uppercase letters and a final Q. It is case-sensitive. The supplied QR image is unchanged. Finish check-in before starting the lesson so attendance does not interrupt the story.",
  },
  {
    id: "team-project", section: "The scenario", title: "Scenario: A class group project",
    subtitle: "Gael, Maya, and Jordan are preparing a class presentation.", visual: "team-project",
    scenario: "You (Gael) are working with Maya and Jordan on a group presentation for class.\nEveryone is contributing project notes, a presentation outline, and a preparation checklist, so you need to keep track of everyone's changes.\nYour goal is to combine your work and make sure everyone has the latest version.",
    notes: "Introduce the scenario immediately after check-in, before defining Git or GitHub. Read the three sentences: Gael (you), Maya, and Jordan are preparing a group presentation for class. Gael handles project notes, Maya handles the preparation checklist, and Jordan handles the outline. Keep this opening free of Git vocabulary. Refer back to these people and goals throughout the definitions. After the Big 3 overview, explain that Maya has already shared class-project on GitHub and sends Gael the link. The example files are project-notes.md, outline.md, and checklist.md. Later Gael changes the room from 101 to 202, Jordan needs the new details, Maya publishes an adapter reminder, and Jordan considers another outline on a branch. The example URL is fictional; participants use their own profile repositories in the activity.",
  },
  {
    id: "versions", section: "The basics", title: "Why use version control?",
    subtitle: "Keep a history of changes instead of making final_final copies.", visual: "versions",
    notes: "Refer back to Gael, Maya, and Jordan's group presentation. Everyone needs the current project notes, outline, and checklist. Copies with final_final filenames make it difficult to know which version is current or what changed. Version control records a readable history of changes. The example uses ordinary text files, so no programming experience is needed. Avoid teaching recovery commands here.",
  },
  {
    id: "what-git", section: "The basics", title: "What is Git?",
    subtitle: "A tool that records versions of your project.", visual: "what-git",
    notes: "Git is a version-control tool on your computer. A repository holds project files and the history Git keeps for them. Saved project versions are commits. You can compare versions and inspect their messages. Git works locally without GitHub or an internet connection. Saving a file in an editor does not automatically create a commit.",
  },
  {
    id: "what-github", section: "The basics", title: "What is GitHub?",
    subtitle: "A website for hosting Git repositories and collaborating.", visual: "what-github",
    notes: "GitHub is a website that hosts Git repositories and helps people share, discuss, and review work. It is separate from Git. Git records versions locally; GitHub can hold the team's online copy. A local commit does not appear on GitHub until you push it. Later we will use GitHub for a real profile repository, but the teaching story comes first.",
  },
  {
    id: "repository", section: "The basics", title: "What is a repository?",
    subtitle: "Repository = project files + Git history.", visual: "repository",
    notes: "Repo is short for repository. A repository includes project files and their saved history. In the class project, Gael maintains project-notes.md, Maya maintains checklist.md, and Jordan maintains outline.md. Markdown is ordinary text with simple formatting. Do not explain .git internals or ask learners to create a repository yet.",
  },
  {
    id: "big-three", section: "The basics", title: "The Big 3: add, commit, push",
    subtitle: "Select changes. Record a version. Share your commits.", visual: "big-three",
    notes: "Briefly preview the workflow the group will use. git add selects current file contents for the next commit. git commit records the staged project snapshot on your computer. git push sends commits to a remote repository, GitHub in this workshop. Saving in an editor changes a file but does not stage, commit, or push it. Git can record versions without GitHub. Keep this overview under a minute. Next, return to the class project: Maya has shared its repository, and Gael needs a local copy. Teach each command in detail when its task arises.",
  },
  {
    id: "clone", section: "Get the project", title: "Copy a repository with git clone",
    subtitle: "git clone", visual: "clone",
    scenario: "Maya shared the class project on GitHub and sends you (Gael) the link.",
    goal: "Get the files and Git history onto your computer.",
    result: "A local class-project folder contains the files and their history.",
    notes: "Use git clone once to copy an existing GitHub repository and its history to your computer. It creates the project folder and configures origin as the remote and the checked-out branch's upstream. Show the example command and the new local copy. The example-team/class-project address is illustrative; participants will clone their own real profile repository later. Do not run git init inside a clone.",
  },
  {
    id: "navigate", section: "Get the project", title: "Open the project folder and read its files",
    subtitle: "cd, ls, cat", visual: "navigate",
    scenario: "You cloned the repository. Now find the presentation details.",
    goal: "Enter class-project, list its files, and read the notes.",
    result: "The notes show the current presentation location: Room 101.",
    notes: "cd class-project enters the new folder, ls lists its files, and cat project-notes.md reads the notes. The notes currently say Location: Room 101. Explain the space between a command and its argument. These shell commands help navigate; they are not Git commands. Keep this explanation brief. pwd can help someone who is lost during the activity.",
  },
  {
    id: "edit", section: "Make a change", title: "Edit and save the presentation location",
    subtitle: "Edit the file, then save it.", visual: "edit",
    scenario: "The group agrees to move the presentation from Room 101 to Room 202.",
    goal: "Update project-notes.md and save the file.",
    result: "Your file says Room 202. You have not created a Git commit yet.",
    notes: "Show the note changing from Location: Room 101 to Location: Room 202. The file is saved on your computer. No new Git commit exists yet. Use an ordinary text edit in the story rather than turning this into an editor lesson; Practice will teach nano. Maya updates the checklist later, after your location change has been shared.",
  },
  {
    id: "status", section: "Inspect the change", title: "Check changed files with git status",
    subtitle: "git status", visual: "status",
    scenario: "You saved the new location in the project notes.",
    goal: "Find out which files Git sees as changed.",
    result: "Git lists project-notes.md as modified and not staged.",
    notes: "git status reports the branch and which files are changed or staged. It does not change files. The output shows project-notes.md as modified and not staged. This answers which file changed, not which lines. Your branch name can differ from the example in the eventual activity. Do not ask the audience to open Practice yet.",
  },
  {
    id: "diff", section: "Inspect the change", title: "See exactly what changed with git diff",
    subtitle: "git diff", visual: "diff",
    scenario: "Git reports that project-notes.md has changed.",
    goal: "Check that only the intended location line changed.",
    result: "The diff shows Room 101 removed and Room 202 added.",
    notes: "git diff shows working edits compared with staged contents. Before staging in this example, it shows the edits since the last commit. Minus marks the removed Room 101 line; plus marks the added Room 202 line. Status tells you which file; diff tells you what changed. If a pager opens, q returns to the prompt. Read the diff before committing.",
  },
  {
    id: "staging", section: "Record a version", title: "Select changes with git add",
    subtitle: "git add project-notes.md", visual: "staging",
    scenario: "You checked the location update. It is ready to record.",
    goal: "Include the current notes in your next commit.",
    result: "The current project-notes.md contents are staged for the next commit.",
    notes: "git add project-notes.md stages its current contents. The file remains in the working folder; staging selects a copy of the contents for the next commit. Unchanged tracked files remain part of the project snapshot too. If you edit the file again, add it again to select the newer contents. Keep selective staging clear without introducing partial hunks.",
  },
  {
    id: "commit", section: "Record a version", title: "Record a version with git commit",
    subtitle: 'git commit -m "Update presentation location"', visual: "commit",
    scenario: "The location update is staged for your next commit.",
    goal: "Record the update with a message that describes it.",
    result: "A new commit is saved on your computer. GitHub has not received it.",
    notes: "git commit records the staged project snapshot with an author and descriptive message. Use git commit -m \"Update presentation location\". The -m flag supplies the message and the quotes keep its words together. It records selected contents, not every working edit. The new commit exists locally. Ask whether Maya can see it on GitHub yet; the answer is no.",
  },
  {
    id: "history", section: "Record a version", title: "View commit history with git log",
    subtitle: "git log --oneline", visual: "history",
    scenario: "You committed the presentation location update.",
    goal: "Find your new commit and the version before it.",
    result: "Your update appears first, above the initial project commit.",
    notes: "git log --oneline lists short commit identifiers and messages, with the newest first. Show Update presentation location above Start class project. The identifiers are examples and differ in real repositories. Reading history does not change files. The local history still has a commit GitHub has not received. Press q if a pager opens.",
  },
  {
    id: "local", section: "Work together", title: "Does committing update GitHub?",
    subtitle: "A local commit reaches GitHub when you push it.", visual: "local",
    scenario: "Jordan opens GitHub and still sees Room 101. Your commit is only on your computer.",
    notes: "Jordan needs the presentation details but still sees Room 101 on GitHub. Compare the histories: Gael's local copy has Start class project plus Update presentation location; GitHub has only Start class project. An editor save updates a file, a commit records a local version, and a push shares commits. A clean working tree does not mean GitHub is current. Ask how Gael can share the new location with Jordan and Maya.",
  },
  {
    id: "push", section: "Work together", title: "Share commits with git push",
    subtitle: "git push", visual: "push",
    scenario: "Jordan needs the new location. Your update is only on your computer.",
    goal: "Send your commit to the shared repository on GitHub.",
    result: "GitHub has your commit and shows Room 202 in the notes.",
    notes: "git push sends commits to the configured upstream. This cloned branch already has one, so use git push. Show GitHub now containing Update presentation location and Room 202. Jordan and Maya can see the new details on GitHub and pull the commit into their own copies. Authentication and write permission are required; the later profile exercise uses the participant's own repository. Push shares commits, not unsaved or uncommitted edits.",
  },
  {
    id: "pull", section: "Work together", title: "Get teammate updates with git pull",
    subtitle: "git pull", visual: "pull",
    scenario: "Maya commits and pushes an adapter reminder to checklist.md.",
    goal: "Bring her new commit into your local copy.",
    result: "Your checklist includes the adapter reminder; the location stays Room 202.",
    notes: "After your location update is shared, Maya brings that commit into her copy, adds Bring the presentation adapter to checklist.md, commits and pushes. Your working tree is clean and you have no newer local commits, so this prepared story can fast-forward. git pull fetches shared commits and integrates them into the current branch. It brings Maya's saved checklist update into your local copy while preserving the location change. Pull is not the same as a GitHub pull request. Divergent histories and conflicts need additional care; keep those out of this introductory example.",
  },
  {
    id: "branch", section: "Work together", title: "What is a branch?",
    subtitle: "A separate line of saved work.", visual: "branch",
    scenario: "Jordan wants to try a different presentation outline while keeping the current version.",
    notes: "Jordan maintains outline.md and wants to try an alternative presentation outline. A branch names a line of saved work, giving the group a way to develop an idea before combining it with the main version. It is not a separate physical folder, and creating or switching branches does not automatically save uncommitted edits. This is a brief concept preview. Branch commands, merging, pull requests, and conflicts are follow-up topics.",
  },
  {
    id: "recap", section: "The workflow", title: "Review the Git workflow",
    subtitle: "Copy the project. Inspect changes. Record versions. Share updates.", visual: "recap",
    notes: "Close the teaching story. Clone gets a project once. Status and diff inspect changes. Add selects contents. Commit records a version. Log reads history. Push shares your commits; pull brings in teammates' commits. Ask when you would use push versus pull, and which action actually creates a saved version. Keep explanations to about 25 minutes including the transition. Next, apply this workflow to a new, personal project.",
  },
  {
    id: "apply", section: "Your turn", title: "Practice: Create your GitHub profile README",
    subtitle: "Use the Git workflow in your own repository.", visual: "apply", practice: "create",
    notes: "This is the first activity handoff. The independent teaching portion is complete. Switch to Practice now and allow about 25 minutes for the seven-checkpoint README activity. The class project repository was an example; participants create or open their own GitHub profile repository. They reuse clone, status, diff, add, commit, log, and push. There is no teammate update in this solo exercise, so pull is not a required checkbox.",
  },
  {
    id: "profile", section: "Your turn", title: "What is a GitHub profile README?",
    subtitle: "A public README that appears on your profile.", visual: "profile", practice: "create",
    notes: "A profile README uses a public repository whose name matches the participant's GitHub username, with a nonempty README.md in its root. Create it on GitHub with Add README enabled, or preserve and update an existing profile repository. Include only information the participant wants public. Practice contains the detailed instructions, nano save/exit steps, command reference, and help. GitHub managed user accounts can use an ordinary repository for the Git exercise instead.",
  },
  {
    id: "repeat", section: "Your turn", title: "Practice the workflow again",
    subtitle: "Add a learning goal, then commit and push your change.", visual: "repeat", practice: "repeat",
    notes: "After the first successful profile push, ask learners to add one learning goal and repeat the workflow with less guidance. Check local history and the published profile. Ask what editor save, commit, and push each do; ask why pull was useful in the team story. Close the planned work by minute 50 and protect the final ten minutes for questions and catch-up. Do not fill the buffer with new mandatory topics.",
  },
];
export const starterReadme = `# Hi, I'm Alex

I'm interested in engineering and how technology can help people.

## What I'm learning
- Git and GitHub with UF EMBS
`;

export const checkpoints: Checkpoint[] = [
  {
    id: "create", title: "Create your profile repository.", shortTitle: "Create your repo", summary: "Apply the workflow from the lesson to a project of your own.", duration: "~2 min", slide: "profile",
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
    id: "clone", title: "Bring the repository to your computer.", shortTitle: "Clone your repo", summary: "Clone once, then work inside the new folder.", duration: "~3 min", slide: "clone",
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
    id: "edit", title: "Write your introduction.", shortTitle: "Edit the README", summary: "Use a few lines of Markdown. Keep it personal and simple.", duration: "~4 min", slide: "edit",
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
    id: "inspect", title: "Look before you commit.", shortTitle: "Inspect the change", summary: "Find the changed file, then read its changed lines.", duration: "~3 min", slide: "diff",
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
    id: "commit", title: "Save a version with Git.", shortTitle: "Stage & commit", summary: "Select the README contents, then record a named snapshot.", duration: "~4 min", slide: "commit",
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
    id: "publish", title: "Publish your introduction.", shortTitle: "Push & view profile", summary: "Send the commit to GitHub and see the result on your profile.", duration: "~4 min", slide: "push",
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
    id: "repeat", title: "Make one more change.", shortTitle: "Try it again", summary: "Add a learning goal and repeat the workflow with fewer prompts.", duration: "~3 min", slide: "repeat",
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
  { command: "git pull", meaning: "Bring shared commits into your current branch. In the lesson, this gets Maya's checklist update." },
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
    text: "Replace the example address. For privacy, copy your exact GitHub noreply address from GitHub Settings > Emails. It may include a numeric ID; do not invent an address from your username.",
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
