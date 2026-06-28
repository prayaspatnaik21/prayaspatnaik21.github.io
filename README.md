# Prayas Patnaik - Portfolio Website

Personal portfolio hosted on GitHub Pages with Jekyll-powered Markdown blog posts.

Live site: `https://prayaspatnaik21.github.io`

## GitHub Pages Setup

In the GitHub repo, go to **Settings > Pages** and set:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

Because this is the `prayaspatnaik21.github.io` user site repo, the public URL will be `https://prayaspatnaik21.github.io`.

## Local Development

Use Ruby 3.x for local Jekyll builds. This repo includes `.ruby-version` set to Ruby 3.3.6 because GitHub Pages' dependency set is not currently compatible with Ruby 4.x.

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000`.

To preview unpublished drafts:

```bash
bundle exec jekyll serve --livereload --drafts
```

## Add a Blog Post

Create a Markdown file in `_posts`:

```text
_posts/YYYY-MM-DD-short-title.md
```

Use this front matter:

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

Write the post below the front matter in Markdown. After you commit and push to `main`, GitHub Pages builds the post and lists it automatically on `blog.html`.

## Drafts

Unpublished notes live in `_drafts`. Drafts are not public unless you run Jekyll with `--drafts` locally.

To publish a draft, copy or move it into `_posts` and rename it with a date:

```text
_posts/2026-06-28-my-post-title.md
```

## Main Files

- `index.html`: homepage
- `work.html`: work experience
- `blog.html`: auto-generated list of Markdown posts
- `_posts/`: published Markdown posts
- `_drafts/`: unpublished Markdown drafts
- `_layouts/`: Jekyll page templates
- `css/styles.css`: site styling
- `assets/resume.docx`: resume linked from navigation

## Deploy Workflow

```bash
git add -A
git commit -m "Update portfolio site"
git push origin main
```

GitHub Pages usually rebuilds within a minute or two after the push.
