---
layout: post
title: How I Add Notes to This Site
date: 2026-06-28
category: "Site Notes"
reading_time: 2
excerpt: "A short reference for publishing Markdown posts on this GitHub Pages portfolio."
---

This site is set up so a new blog post is just a Markdown file.

Create a file in `_posts` with this naming format:

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

Then write the post below it in Markdown. When the file is committed and pushed to GitHub, GitHub Pages builds the post and adds it to the blog page automatically.
