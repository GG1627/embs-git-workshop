# Workshop visual concepts

Generated with the built-in ImageGen tool. Each board shows a teaching slide above a practice workspace. These are design references, not working application screenshots. Implementation will use the supplied logos and real text, controls, and diagrams.

- [A — Graphite workspace](concepts/a-graphite-workspace.png): closest to the GitHub aesthetic, with restrained charcoal surfaces and cyan navigation.
- [B — Editorial lab](concepts/b-editorial-lab.png): recommended; larger teaching typography, more open diagram composition, and a carefully aligned practice workspace.
- [C — Engineering notebook](concepts/c-engineering-notebook.png): stronger purple emphasis and more technical framing.

The user rejected A–C because they displayed too much information and felt over-designed. They are retained as historical exploration only. The implemented direction is described in `DIRECTION.md` and illustrated by `concepts/d-github-slides.png` and `concepts/d-github-practice.png`. The user delegated final aesthetic decisions. Generated sample history is not a substitute for the application's actual repository model.

## Shared generation brief

High-fidelity UI mockups for the UF EMBS Git Workshop, a 60–90-minute browser-only workshop for students without terminal experience. Two complete desktop screenshots per board: Slides and Practice. Shared EMBS / UF branding, Git Workshop title, Slides / Practice / Reference navigation, and seven chapters: Start here, Meet the terminal, Your first commit, Read the changes, Branch out, Bring it together, GitHub & beyond.

Teaching slide: “Changes become history.” and “Edit your files. Stage what matters. Commit a snapshot.” Show Working files → Staging area → Commit history, README.md and sensor-config.json, command examples `git add sensor-config.json` and `git commit -m "Update sensor settings"`, Previous / Next controls, slide counter, presentation control, and Try it in Practice.

Practice: “Save your sensor update” and “Commit the sensor setting. Leave your notes out.” Show task steps, hints and reset, sensor-config.json and team-notes.md editor tabs plus Diff, JSON settings, terminal with git status, modified files, empty staging area, and commit history with a main branch label. Label the experience Git learning simulator.

Palette anchors are #00629b and #772583, with readable cyan #58c8f3 and lilac #c38de0. Typography combines readable sans and monospace code. Require real-product clarity, practical React/CSS implementation, fine borders, restrained corner radii, aligned panels, and readable educational diagrams. Avoid device mockups, perspective, new logos, decorative card grids, fake metrics, badges, excessive glow, and unrelated product areas.

### A direction

Graphite background #0d1117, surfaces #161b22, borders #30363d. GitHub-inspired professional tool, compact shared header, chapter sidebar, generous teaching gutters, cyan primary action, subtle blue active chapter, and muted purple branch lines. Spacious teaching diagram with minimally framed elements; tidy divided practice panels.

### B direction

Near-black #101116 and graphite #191b23. Larger editorial teaching typography and more breathing room. Open, carefully typeset diagram with thin linework and cyan arrows; restrained purple commit graph. Practice combines a task rail, precise editor/terminal alignment, and a readable repository inspector. High-end editorial hierarchy with product precision.

### C direction

Subtly purple-tinted background #121019, surfaces #1c1927, and lavender-gray borders. Technical sans headings, monospace lesson numerals, purple selections and cyan active details. Precise scientific diagram connections, purposeful grouping, and a laptop-friendly practice layout.
