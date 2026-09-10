# Writing content for this site

Two collections live under `src/content/`: **projects** and **notes**. Each entry
is a markdown file (or a folder containing `index.md` once you're adding images).
This doc covers every frontmatter field available in each.

---

## Projects — `src/content/projects/`

### File layout

For a project with no images, a flat file is fine:
```
src/content/projects/my-project.md
```

Once you're adding a cover image, gallery, or log-entry images, switch to a
folder so image paths can live next to the markdown file:
```
src/content/projects/my-project/
  index.md
  cover.png
  screenshot-1.png
```

### Frontmatter fields

```yaml
---
title: "Project Name"                # required
summary: "One or two sentences."     # required — shown on the homepage card
tags: ["Tag One", "Tag Two"]         # optional, default []
github: "https://github.com/..."     # optional — adds a "View on GitHub" button
demo: "https://..."                  # optional — adds a "Live demo" button
status: "active"                     # optional — "active" | "complete" | "archived" (default: "complete")
date: 2026-08-01                     # required — drives sort order on the homepage
featured: true                       # optional, default false (not currently used for layout, but reserved)

# Cover image — shown as the homepage card thumbnail and a banner on the project page.
# Path is relative to this file, so the image must sit next to it.
cover: "./cover.png"                 # optional
coverAlt: "Description for screen readers"   # optional

# Gallery — extra screenshots, rendered as a grid at the end of the page.
gallery:                             # optional, default []
  - src: "./screenshot-1.png"
    alt: "What this screenshot shows"
  - src: "./screenshot-2.png"
    alt: "..."

# Demo video — either a YouTube/Vimeo URL (auto-embeds as a responsive player)
# or a local file path like "/videos/my-demo.mp4" (put the file in public/videos/).
video: "https://www.youtube.com/watch?v=XXXXXXXXXXX"   # optional
videoCaption: "Full demo run"        # optional

# Build log — the chronological "here's what happened" timeline. This is the
# core storytelling device: don't just log milestones, log what broke and how
# you found the actual fix.
log:                                 # optional, default []
  - date: 2026-07-10
    title: "Short title for this entry"
    kind: "problem"                  # "problem" | "fix" | "milestone" | "note" (default: "note")
    body: >
      What happened, in a sentence or two. Use ">" for a multi-line folded
      string like this, or a plain quoted string for something short.
    image: "./log-photo.png"         # optional, same path rule as cover
    imageAlt: "Alt text"             # optional
    video: "https://youtu.be/..."    # optional — same YouTube/local-path rule as the top-level video field
---
```

**`kind` color coding on the site:** `problem` = red, `fix` = teal, `milestone` =
amber, `note` = gray. Use `problem` → `fix` pairs to tell the "where things went
wrong" story — that pairing is the whole point of the build log.

### Body content

Everything below the closing `---` is the project write-up, rendered as markdown.
Conventionally this site uses three sections (see any existing project for the
pattern), but it's just markdown — headings, images, code blocks, and LaTeX math
all work:

```markdown
## Why this project

...

## Approach

...

## What I'd do differently

...
```

**Inline images:** `![alt text](./photo.png)` — same relative-path rule as
`cover`, and only works if the markdown file is in its own folder.

**Math:** inline with `$...$`, block with `$$...$$` — rendered via KaTeX.
```
Inline: $G(s) = \frac{K_v}{s}$

Block:
$$
T(s) = \frac{K_v(K_p s + K_i)}{s^2 + K_v K_p s + K_v K_i}
$$
```

---

## Notes — `src/content/notes/`

Lighter-weight than projects — no build log, no gallery. For shorter write-ups,
learnings, or thoughts not tied to one project.

```yaml
---
title: "Note title"                  # required
summary: "One sentence."             # optional — shown in the notes list
tags: ["Tag"]                        # optional, default []
date: 2026-08-05                     # required
cover: "./cover.png"                 # optional
coverAlt: "..."                      # optional
---

Body content here — same markdown rules as projects (images, math, code all
work the same way).
```

---

## General rules

- **Restart the dev server** only when you change `src/content.config.ts`
  (schema changes) or `astro.config.mjs`. New markdown files, edits, and images
  hot-reload automatically.
- **Dates** use `YYYY-MM-DD` — no quotes needed.
- **Required fields left out** will fail the build with a clear schema error
  pointing at the file and field.
- To find every field and its type at a glance, `src/content.config.ts` is the
  source of truth — this doc mirrors it, but the schema file is what actually
  enforces it.
