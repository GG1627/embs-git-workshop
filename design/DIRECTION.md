# Current design direction

The user's correction supersedes the original concept boards: reduce the information on screen, use GitHub's repository interface as the visual reference, and choose accents that fit naturally. Color choices are delegated to the implementer.

## References

- [GitHub Primer color guidance](https://primer.style/product/getting-started/foundations/color-usage/)
- [GitHub repository reference](https://github.com/skills/introduction-to-github)
- [Revised slide concept](concepts/d-github-slides.png)
- [Revised practice concept](concepts/d-github-practice.png)
- [Exact revised ImageGen prompts](revised-imagegen-prompts.json)

The concepts were generated with the built-in ImageGen tool. They are design references; the app is implemented with real HTML, CSS, SVG, text, and supplied logos.

## Locked visual system

Neutral GitHub-like dark surfaces: `#010409` header, `#0d1117` canvas, `#161b22` secondary surface, `#30363d` borders, `#e6edf3` foreground, `#919ba6` muted text. Blue `#58a6ff` is for links and focus; green `#238636` is for successful forward actions; muted orange `#f78166` marks the selected tab.

Use system sans typography and system monospace code. Standard controls use 14px text, 6px corners, fine borders, and ordinary hover/focus states. The original EMBS logo supplies purple/blue identity without recoloring the application. The supplied Git and GitHub logos appear in relevant teaching slides.

## Content and interaction

- Two primary views, Slides and Practice, with Reference as a utility.
- Chapter and exercise lists open on request rather than occupying a permanent sidebar.
- Each slide contains one teaching idea, a short explanation, and one diagram or example.
- Each exercise exposes its current instruction and one working surface. Files and history replace the terminal when requested instead of appearing beside it.
- Explicit Continue lets students read the result before moving on.
- Hints are opt-in; deeper material remains available in later lessons and optional extensions.
- Slides use the regular application layout. The Present button and fullscreen mode were removed at the user's request.
- Progress persists on the same browser/device. Each exercise has its own repository state.
- URLs identify slides and exercises, for example `#slides/9` and `#practice/conflict`.

## Deliberate implementation refinements

- Supplied EMBS logo replaces the generated placeholder mark.
- A centered 1100px reading column keeps lessons and exercises manageable on laptop screens.
- The authored deck contains 35 slides, including nine optional extension slides, rather than the mockup's illustrative counter.
- A subtle command-input placeholder helps attendees recognize where to type.
- History is introduced after the first commit lesson, rather than exposed immediately.
- Presenter notes, keyboard navigation, reference material, success feedback, and reset dialogs use the same quiet control system.
