export type Tree = Record<string, string>;
export type Commit = {
  id: string;
  message: string;
  parents: string[];
  tree: Tree;
};
export type Repo = {
  initialized: boolean;
  files: Tree;
  index: Tree;
  commits: Commit[];
  branches: Record<string, string | null>;
  branch: string;
  conflicts: string[];
  mergeParent: string | null;
  remoteTip: string | null;
  tracking: string | null;
};
export type Result = {
  repo: Repo;
  output: string;
  ok: boolean;
  action: string;
};
export const initialFiles: Tree = {
  "README.md": "# EMBS Pulse\n\nA wearable sensor project by UF EMBS.\n",
  "sensor-config.json": '{\n  "sampleRate": 50,\n  "unit": "Hz"\n}\n',
  "team-notes.md":
    "# Team notes\n\nDiscuss the prototype at our next meeting.\n",
};
export function createRepo(initialized = true): Repo {
  const tree = { ...initialFiles };
  return {
    initialized,
    files: tree,
    index: initialized ? { ...tree } : {},
    commits: initialized
      ? [
          {
            id: "a1b2c3d",
            message: "Initial project",
            parents: [],
            tree: { ...tree },
          },
        ]
      : [],
    branches: { main: initialized ? "a1b2c3d" : null },
    branch: "main",
    conflicts: [],
    mergeParent: null,
    remoteTip: null,
    tracking: null,
  };
}
export function head(repo: Repo): Commit | undefined {
  return repo.commits.find((c) => c.id === repo.branches[repo.branch]);
}
export function changed(a: Tree, b: Tree): string[] {
  return [...new Set([...Object.keys(a), ...Object.keys(b)])]
    .filter((k) => a[k] !== b[k])
    .sort();
}
export function staged(repo: Repo) {
  return changed(head(repo)?.tree ?? {}, repo.index);
}
export function unstaged(repo: Repo) {
  return changed(repo.index, repo.files);
}
export function commit(
  repo: Repo,
  message: string,
  parents = [repo.branches[repo.branch]].filter((id): id is string => !!id),
): Commit {
  const id = (0xd4e5f60 + repo.commits.length * 0x11213).toString(16).slice(-7);
  const c = { id, message, parents, tree: { ...repo.index } };
  repo.commits.push(c);
  repo.branches[repo.branch] = id;
  return c;
}
export function seededBranch(
  repo: Repo,
  name: string,
  edits: Tree,
  message: string,
): Repo {
  const original = repo.branch;
  repo.branches[name] = repo.branches[original];
  repo.branch = name;
  repo.files = { ...repo.files, ...edits };
  repo.index = { ...repo.files };
  commit(repo, message);
  repo.branch = original;
  repo.files = { ...head(repo)!.tree };
  repo.index = { ...repo.files };
  return repo;
}
function ancestors(repo: Repo, id: string | null): Set<string> {
  const seen = new Set<string>();
  const queue = id ? [id] : [];
  while (queue.length) {
    const next = queue.shift()!;
    if (seen.has(next)) continue;
    seen.add(next);
    queue.push(...(repo.commits.find((c) => c.id === next)?.parents ?? []));
  }
  return seen;
}
export function history(repo: Repo): Commit[] {
  const reachable = ancestors(repo, repo.branches[repo.branch]);
  return repo.commits.filter((c) => reachable.has(c.id)).toReversed();
}
function tokenize(input: string): string[] | null {
  const tokens: string[] = [];
  let word = "";
  let quote = "";
  let active = false;
  for (const ch of input.trim()) {
    if (quote) {
      if (ch === quote) quote = "";
      else word += ch;
      active = true;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      active = true;
    } else if (/\s/.test(ch)) {
      if (active) {
        tokens.push(word);
        word = "";
        active = false;
      }
    } else {
      word += ch;
      active = true;
    }
  }
  if (quote) return null;
  if (active) tokens.push(word);
  return tokens;
}
export function diffTrees(before: Tree, after: Tree): string {
  const files = changed(before, after);
  if (!files.length) return "No differences.";
  return files
    .map((file) => {
      const a = (before[file] ?? "").trimEnd().split("\n"),
        b = (after[file] ?? "").trimEnd().split("\n");
      return (
        `diff --git a/${file} b/${file}\n--- a/${file}\n+++ b/${file}\n` +
        Array.from({ length: Math.max(a.length, b.length) }, (_, i) =>
          a[i] === b[i]
            ? ` ${a[i] ?? ""}`
            : [
                a[i] === undefined ? "" : `-${a[i]}`,
                b[i] === undefined ? "" : `+${b[i]}`,
              ]
                .filter(Boolean)
                .join("\n"),
        ).join("\n")
      );
    })
    .join("\n\n");
}
function mergeLines(base: string, ours: string, theirs: string): string | null {
  const b = base.split("\n"),
    o = ours.split("\n"),
    t = theirs.split("\n");
  if (b.length !== o.length || b.length !== t.length) return null;
  const lines: string[] = [];
  for (let i = 0; i < b.length; i++) {
    if (o[i] === t[i] || t[i] === b[i]) lines.push(o[i]);
    else if (o[i] === b[i]) lines.push(t[i]);
    else return null;
  }
  return lines.join("\n");
}
function merge(
  repo: Repo,
  target: string,
  name: string,
): { output: string; ok: boolean } {
  if (staged(repo).length || repo.mergeParent)
    return {
      output:
        "Commit or unstage pending changes before merging in this simulator.",
      ok: false,
    };
  const localEdits = unstaged(repo);
  const preserveEdits = (tree: Tree) => {
    const working = { ...tree };
    for (const file of localEdits) {
      if (repo.files[file] === undefined) delete working[file];
      else working[file] = repo.files[file];
    }
    return working;
  };
  const current = repo.branches[repo.branch];
  const oursAnc = ancestors(repo, current),
    theirsAnc = ancestors(repo, target);
  if (oursAnc.has(target)) return { output: "Already up to date.", ok: true };
  const theirs = repo.commits.find((c) => c.id === target)!;
  if (!current || theirsAnc.has(current)) {
    if (localEdits.some((f) => (head(repo)?.tree ?? {})[f] !== theirs.tree[f]))
      return {
        output:
          "Your local changes would be overwritten by the merge. Commit or restore them first.",
        ok: false,
      };
    const working = preserveEdits(theirs.tree);
    repo.branches[repo.branch] = target;
    repo.files = working;
    repo.index = { ...theirs.tree };
    return {
      output: `Updating ${current ?? "empty"}..${target}\nFast-forward`,
      ok: true,
    };
  }
  const baseId = [...theirsAnc].find((id) => oursAnc.has(id));
  if (!baseId)
    return { output: "These histories have no common ancestor.", ok: false };
  const base = repo.commits.find((c) => c.id === baseId)!.tree,
    ours = head(repo)!.tree;
  const next: Tree = {};
  const conflicts: string[] = [];
  for (const file of new Set([
    ...Object.keys(base),
    ...Object.keys(ours),
    ...Object.keys(theirs.tree),
  ])) {
    const b = base[file],
      o = ours[file],
      t = theirs.tree[file];
    let value: string | undefined;
    if (o === t || t === b) value = o;
    else if (o === b) value = t;
    else {
      const combined =
        b !== undefined && o !== undefined && t !== undefined
          ? mergeLines(b, o, t)
          : null;
      if (combined !== null) value = combined;
      else {
        conflicts.push(file);
        value = `<<<<<<< HEAD\n${(o ?? "").trimEnd()}\n=======\n${(t ?? "").trimEnd()}\n>>>>>>> ${name}\n`;
      }
    }
    if (value !== undefined) next[file] = value;
  }
  if (localEdits.some((f) => next[f] !== ours[f]))
    return {
      output:
        "Your local changes would be overwritten by the merge. Commit or restore them first.",
      ok: false,
    };
  repo.files = preserveEdits(next);
  repo.index = { ...next };
  if (conflicts.length) {
    repo.conflicts = conflicts;
    repo.mergeParent = target;
    for (const file of conflicts) {
      if (ours[file] !== undefined) repo.index[file] = ours[file];
      else delete repo.index[file];
    }
    return {
      output:
        conflicts
          .map((f) => `CONFLICT (content): Merge conflict in ${f}`)
          .join("\n") + "\nResolve the file, then use git add and git commit.",
      ok: false,
    };
  }
  commit(repo, `Merge branch '${name}'`, [current, target]);
  return {
    output: `Merge made by the 'ort' strategy.\n${changed(ours, next).length} file(s) changed.`,
    ok: true,
  };
}
export function execute(original: Repo, input: string): Result {
  const repo: Repo = structuredClone(original);
  const args = tokenize(input);
  let action = "";
  const done = (output: string, ok = true): Result => ({
    repo,
    output,
    ok,
    action,
  });
  if (!args)
    return done(
      "Close the quotation mark in your command, then try again.",
      false,
    );
  if (!args.length) return done("");
  const [program, cmd, ...rest] = args;
  if (program === "clear" && args.length === 1) return done("");
  if (program === "help")
    return done(
      'Terminal: pwd, ls, cat <file>, clear\nGit: init, status, diff [--staged], add <file|.>, commit -m "message", log [--oneline], branch, switch [-c] <branch>, merge <branch>, restore [--staged] <file>, revert <commit>, remote, fetch, pull, push\nThis is a learning simulator with a supported command subset. Edit files using View files.',
    );
  if (program === "pwd" && args.length === 1) {
    action = "pwd";
    return done("/home/embs/embs-pulse");
  }
  if (program === "ls" && args.length === 1) {
    action = "ls";
    return done(Object.keys(repo.files).join("  "));
  }
  if (program === "cat" && args.length === 2) {
    action = `cat:${cmd}`;
    return repo.files[cmd] !== undefined
      ? done(repo.files[cmd])
      : done(`cat: ${cmd}: No such file. Run ls to see filenames.`, false);
  }
  if (program !== "git")
    return done(
      `Command not found: ${program}. Type help for available commands.`,
      false,
    );
  action = cmd ?? "";
  if (cmd === "init" && !rest.length) {
    const existing = repo.initialized;
    repo.initialized = true;
    return done(
      `${existing ? "Reinitialized" : "Initialized"} Git repository in /home/embs/embs-pulse/.git/`,
    );
  }
  if (!repo.initialized)
    return done(
      "Not a Git repository yet. Run git init to start tracking this project.",
      false,
    );
  if (cmd === "status" && !rest.length) {
    const s = staged(repo).filter((f) => !repo.conflicts.includes(f)),
      u = unstaged(repo).filter((f) => !repo.conflicts.includes(f)),
      untracked = u.filter((f) => repo.index[f] === undefined);
    const label = (f: string, base: Tree, next: Tree) =>
      `${base[f] === undefined ? "new file" : next[f] === undefined ? "deleted" : "modified"}: ${f}`;
    let output = `On branch ${repo.branch}\n`;
    if (!head(repo)) output += "\nNo commits yet\n";
    if (repo.conflicts.length)
      output +=
        "\nUnmerged paths:\n" +
        repo.conflicts.map((f) => `  both modified: ${f}`).join("\n") +
        "\n";
    if (s.length)
      output +=
        "\nChanges to be committed:\n" +
        s
          .map((f) => `  ${label(f, head(repo)?.tree ?? {}, repo.index)}`)
          .join("\n") +
        "\n";
    const tracked = u.filter((f) => !untracked.includes(f));
    if (tracked.length)
      output +=
        "\nChanges not staged for commit:\n" +
        tracked.map((f) => `  ${label(f, repo.index, repo.files)}`).join("\n") +
        "\n";
    if (untracked.length)
      output +=
        "\nUntracked files:\n" +
        untracked.map((f) => `  ${f}`).join("\n") +
        "\n";
    if (!s.length && !u.length && !repo.conflicts.length)
      output += repo.mergeParent
        ? "\nAll conflicts fixed. Run git commit to finish the merge."
        : "\nnothing to commit, working tree clean";
    return done(output);
  }
  if (
    cmd === "diff" &&
    (!rest.length ||
      (rest.length === 1 && ["--staged", "--cached"].includes(rest[0])))
  ) {
    const trackedWorking = Object.fromEntries(
      Object.keys(repo.index)
        .filter((f) => f in repo.files)
        .map((f) => [f, repo.files[f]]),
    );
    return done(
      rest.length
        ? diffTrees(head(repo)?.tree ?? {}, repo.index)
        : diffTrees(repo.index, trackedWorking),
    );
  }
  if (cmd === "add" && rest.length && rest.every((a) => !a.startsWith("-"))) {
    const files = rest.includes(".")
      ? [...new Set([...Object.keys(repo.files), ...Object.keys(repo.index)])]
      : rest;
    if (files.some((f) => !(f in repo.files) && !(f in repo.index)))
      return done(
        "A filename does not match. Run ls to check the spelling.",
        false,
      );
    for (const file of files) {
      if (repo.files[file] !== undefined) repo.index[file] = repo.files[file];
      else delete repo.index[file];
      repo.conflicts = repo.conflicts.filter((f) => f !== file);
    }
    return done("");
  }
  if (
    cmd === "commit" &&
    rest.length === 2 &&
    rest[0] === "-m" &&
    rest[1].trim()
  ) {
    if (repo.conflicts.length)
      return done(
        "You have unmerged files. Resolve and stage them before committing.",
        false,
      );
    if (!staged(repo).length && !repo.mergeParent)
      return done(
        "Nothing staged to commit. Use git status, then git add <file>.",
        false,
      );
    const parents = [repo.branches[repo.branch], repo.mergeParent].filter(
      (id): id is string => !!id,
    );
    const count = staged(repo).length;
    const c = commit(repo, rest[1], parents);
    repo.mergeParent = null;
    return done(
      `[${repo.branch} ${c.id}] ${c.message}\n${count} file(s) changed.`,
    );
  }
  if (
    cmd === "log" &&
    (!rest.length || (rest.length === 1 && rest[0] === "--oneline"))
  )
    return done(
      history(repo)
        .map((c) =>
          rest.length
            ? `${c.id} ${c.message}`
            : `commit ${c.id}\n    ${c.message}`,
        )
        .join("\n\n") || "No commits yet.",
    );
  if (cmd === "branch" && !rest.length)
    return done(
      Object.keys(repo.branches)
        .map((b) => `${b === repo.branch ? "*" : " "} ${b}`)
        .join("\n"),
    );
  if (cmd === "branch" && rest.length === 1 && !rest[0].startsWith("-")) {
    if (rest[0] in repo.branches || !/^[\w/-]+$/.test(rest[0]))
      return done(
        "Choose a new branch name using letters, numbers, slashes, or hyphens.",
        false,
      );
    if (!head(repo))
      return done("Create your first commit before branching.", false);
    repo.branches[rest[0]] = repo.branches[repo.branch];
    return done("");
  }
  if (
    cmd === "switch" &&
    (rest.length === 1 || (rest.length === 2 && rest[0] === "-c"))
  ) {
    const name = rest.at(-1)!;
    const isNew = rest.length === 2;
    if (repo.mergeParent)
      return done("Finish the current merge before switching branches.", false);
    if (isNew) {
      if (name in repo.branches || !/^[\w/-]+$/.test(name) || !head(repo))
        return done(
          "Use a new branch name after creating a first commit.",
          false,
        );
      repo.branches[name] = repo.branches[repo.branch];
    }
    if (!(name in repo.branches))
      return done(
        `Unknown branch: ${name}. Run git branch to list branches.`,
        false,
      );
    const previous = head(repo)?.tree ?? {},
      next = repo.commits.find((c) => c.id === repo.branches[name])?.tree ?? {};
    const dirty = [...new Set([...staged(repo), ...unstaged(repo)])];
    if (dirty.some((f) => previous[f] !== next[f])) {
      if (isNew) delete repo.branches[name];
      return done(
        "Your local changes would be overwritten. Commit or restore them first.",
        false,
      );
    }
    const nextFiles = { ...next },
      nextIndex = { ...next };
    for (const f of dirty) {
      if (repo.files[f] === undefined) delete nextFiles[f];
      else nextFiles[f] = repo.files[f];
      if (repo.index[f] === undefined) delete nextIndex[f];
      else nextIndex[f] = repo.index[f];
    }
    repo.branch = name;
    repo.files = nextFiles;
    repo.index = nextIndex;
    return done(
      `${isNew ? "Switched to a new" : "Switched to"} branch '${name}'`,
    );
  }
  if (cmd === "merge" && rest.length === 1 && !rest[0].startsWith("-")) {
    const target =
      repo.branches[rest[0]] ??
      (rest[0] === "origin/main" ? repo.tracking : null);
    if (!target)
      return done(
        `Unknown branch: ${rest[0]}. Run git branch to see available branches.`,
        false,
      );
    const result = merge(repo, target, rest[0]);
    return done(result.output, result.ok);
  }
  if (
    cmd === "restore" &&
    (rest.length === 1 || (rest.length === 2 && rest[0] === "--staged"))
  ) {
    if (repo.mergeParent)
      return done("Finish this exercise’s merge before using restore.", false);
    const file = rest.at(-1)!;
    const source = rest.length === 2 ? (head(repo)?.tree ?? {}) : repo.index;
    const destination = rest.length === 2 ? repo.index : repo.files;
    if (!(file in destination) && !(file in source))
      return done("Unknown file. Run ls to check its name.", false);
    if (source[file] === undefined) delete destination[file];
    else destination[file] = source[file];
    return done("");
  }
  if (cmd === "revert" && rest.length === 1 && !rest[0].startsWith("-")) {
    const c =
      rest[0] === "HEAD"
        ? head(repo)
        : repo.commits.find((c) => c.id.startsWith(rest[0]));
    if (
      !c ||
      c.parents.length !== 1 ||
      staged(repo).length ||
      unstaged(repo).length
    )
      return done(
        "Use a single-parent commit and a clean working tree for revert in this simulator.",
        false,
      );
    const parent = repo.commits.find((p) => p.id === c.parents[0])!;
    const current = head(repo)!.tree;
    if (changed(parent.tree, c.tree).some((f) => current[f] !== c.tree[f]))
      return done(
        "This revert would need a conflict resolution. This simulator supports clean reverts only.",
        false,
      );
    for (const file of changed(parent.tree, c.tree)) {
      if (parent.tree[file] === undefined) delete repo.files[file];
      else repo.files[file] = parent.tree[file];
    }
    repo.index = { ...repo.files };
    const revert = commit(repo, `Revert "${c.message}"`);
    return done(`[${repo.branch} ${revert.id}] ${revert.message}`);
  }
  if (
    cmd === "remote" &&
    (!rest.length || (rest.length === 1 && rest[0] === "-v"))
  )
    return done(
      repo.remoteTip
        ? rest.length
          ? "origin  https://github.com/uf-embs/embs-pulse.git (simulated)"
          : "origin"
        : "No remote configured for this exercise.",
    );
  if (
    ["fetch", "pull", "push"].includes(cmd) &&
    (!rest.length ||
      (rest[0] === "origin" &&
        rest.length <= 2 &&
        (!rest[1] || rest[1] === "main")))
  ) {
    if (!repo.remoteTip)
      return done(
        "This exercise has no remote. Try the remote collaboration exercise.",
        false,
      );
    if (cmd === "push") {
      const local = repo.branches[repo.branch];
      if (
        repo.branch !== "main" ||
        !local ||
        !ancestors(repo, local).has(repo.remoteTip)
      )
        return done(
          "Push rejected: integrate the remote changes on main first.",
          false,
        );
      repo.remoteTip = local;
      repo.tracking = local;
      return done("To simulated origin\nmain -> main");
    }
    repo.tracking = repo.remoteTip;
    if (cmd === "fetch")
      return done(
        "From simulated origin\nUpdated origin/main. Your working files have not changed.",
      );
    const result = merge(repo, repo.tracking, "origin/main");
    return done(result.output, result.ok);
  }
  return done(
    `Unsupported command or arguments. Type help to see this simulator’s command subset.`,
    false,
  );
}
