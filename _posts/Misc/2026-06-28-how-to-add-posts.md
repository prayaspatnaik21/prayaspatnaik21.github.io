---
layout: post
title: How I Add Notes to This Site
date: 2026-06-28
category: "Site Notes"
reading_time: 2
excerpt: "A short reference for publishing Markdown posts on this GitHub Pages portfolio."
---

This site is set up so a new blog post is just a Markdown file.

Published posts live in `_posts`. Drafts live in `_drafts` until they are ready.

Create a published post in `_posts` with this naming format:

```text
YYYY-MM-DD-short-title.md
```

Add front matter at the top:

```yaml
---
layout: post
title: Your Post Title
date: 2026-06-28
category: "Image Processing"
reading_time: 5
excerpt: "One sentence summary for the blog page."
---
```

If the post contains equations, add:

```yaml
math: true
```

Then write the post below the front matter in Markdown. When the file is committed and pushed to GitHub, GitHub Pages builds the post and adds it to the blog page automatically.

The old `blog/` HTML files are not the normal publishing path anymore. New notes should be Markdown files in `_posts`.
