# Prayas Patnaik - Portfolio Website

A modern, responsive portfolio website with a yellow + white theme, dark mode toggle, blog support, and hosted on **GitHub Pages**.

Live site: `https://prayaspatnaik21.github.io`

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup & Local Development](#setup--local-development)
3. [How the Site Works](#how-the-site-works)
4. [Making Changes](#making-changes)
5. [Adding a New Blog Post](#adding-a-new-blog-post)
6. [Editing the Homepage](#editing-the-homepage)
7. [Editing the Work Page](#editing-the-work-page)
8. [Changing Colors / Theme](#changing-colors--theme)
9. [Adding New Pages](#adding-new-pages)
10. [Navigation](#navigation)
11. [Dark Mode](#dark-mode)
12. [Images](#images)
13. [Deployment](#deployment)
14. [File Reference](#file-reference)
15. [Common Tasks Cheatsheet](#common-tasks-cheatsheet)

---

## Project Structure

```
.
├── index.html              # Homepage (main landing page)
├── work.html               # Work experience page
├── blog.html               # Blog listing page (shows all blog post cards)
├── css/
│   └── styles.css          # ALL styling lives here (themes, layout, responsive)
├── js/
│   ├── dark-mode.js        # Dark/light mode toggle logic
│   └── script.js           # Greeting animation + smooth scroll
├── images/
│   └── prayas.jpg          # Profile photo
├── assets/
│   └── resume.docx         # Resume file (linked from nav)
├── blog/
│   ├── template.html       # Copy this to create a new blog post
│   ├── getting-started-camera-isp.html  # Example blog post
│   └── index.md            # (Jekyll blog listing - used when deployed via Jekyll)
├── _posts/
│   └── 2025-03-01-getting-started.md    # Jekyll markdown blog post
├── _layouts/
│   ├── default.html        # Base Jekyll layout (wraps markdown pages)
│   └── post.html           # Blog post Jekyll layout
├── _config.yml             # Jekyll configuration (site title, URL, plugins)
├── Gemfile                 # Ruby dependencies for Jekyll
├── .gitignore              # Files excluded from git
└── README.md               # This file
```

### What each folder does:

| Folder/File | Purpose |
|---|---|
| `index.html` | The homepage visitors see first. Contains hero section, experience, education, CTA. |
| `work.html` | Detailed work experience page. |
| `blog.html` | Shows blog post cards in a grid. Each card links to a post in `blog/`. |
| `blog/` | Contains individual blog post HTML files. One file = one post. |
| `css/styles.css` | Single CSS file for the entire site. All colors, layout, responsive rules. |
| `js/dark-mode.js` | Handles dark mode toggle + saves preference to localStorage. |
| `js/script.js` | Greeting animation on homepage + smooth scroll for anchor links. |
| `images/` | Store all images here. Referenced as `images/filename.jpg`. |
| `assets/` | Resume and other downloadable files. |
| `_posts/` | Jekyll markdown posts (only used when site is built with Jekyll). |
| `_layouts/` | Jekyll layout templates (only used when site is built with Jekyll). |
| `_config.yml` | Jekyll settings: site title, description, URL, plugins. |

---

## Setup & Local Development

### Prerequisites

- **macOS**: Ruby comes pre-installed. You need Bundler and Jekyll.
- **Any OS**: Python 3 works for quick local preview.

### Option A: Jekyll (Full Build — Recommended for Mac)

This is how GitHub Pages builds your site.

```bash
# 1. Clone the repo
git clone https://github.com/prayaspatnaik21/prayaspatnaik21.github.io.git
cd prayaspatnaik21.github.io

# 2. Install Ruby dependencies
gem install bundler
bundle install

# 3. Start local server with live reload
bundle exec jekyll serve --livereload

# 4. Open browser
# http://localhost:4000
```

Every time you save a file, the browser auto-refreshes.

### Option B: Python (Quick Preview — No Ruby needed)

```bash
# Navigate to the site folder
cd prayaspatnaik21.github.io

# Start a simple HTTP server
python3 -m http.server 8000

# Open browser
# http://localhost:8000
```

For auto-refresh with Python:
```bash
pip install livereload
python3 -c "from livereload import Server; s = Server(); s.watch('.'); s.serve(root='.', port=8000)"
```

### Option C: Just Open the File

Double-click `index.html` in Finder/Explorer. Works for basic viewing but links may not work correctly (use a server for full testing).

---

## How the Site Works

This site uses **standalone HTML files** for the main pages (`index.html`, `work.html`, `blog.html`, and files in `blog/`). These are complete HTML documents with their own `<head>`, `<nav>`, `<main>`, `<footer>`.

- **CSS**: All pages link to `css/styles.css` (or `../css/styles.css` for pages in subfolders like `blog/`).
- **JavaScript**: All pages include `js/dark-mode.js` for theme toggle. Homepage also includes `js/script.js` for animations.
- **No build step needed**: The HTML files are what visitors see. GitHub Pages serves them directly.
- **Jekyll is optional**: Jekyll processes `_posts/*.md` files into blog pages (useful if you want to write posts in Markdown). The standalone HTML blog posts in `blog/` work without Jekyll.

---

## Making Changes

### General Workflow

1. Open the file you want to edit in any text editor (VS Code, Sublime, etc.)
2. Make your changes
3. Save the file
4. Check in browser (refresh or let livereload do it)
5. Commit and push:
   ```bash
   git add -A
   git commit -m "Describe what you changed"
   git push origin main
   ```
6. Wait ~1 minute for GitHub Pages to rebuild. Check your live site.

### Key Rule

Every page is self-contained HTML. When you edit one page, you don't affect others. If you want to change something that appears on ALL pages (like the nav bar), you must edit it in each HTML file.

---

## Adding a New Blog Post

### Step 1: Copy the template

```bash
cp blog/template.html blog/your-post-title.html
```

### Step 2: Edit the new file

Open `blog/your-post-title.html` and update:

1. **`<title>`** tag (line 10):
   ```html
   <title>Your Post Title - Prayas Patnaik</title>
   ```

2. **`<meta name="description">`** (line 7):
   ```html
   <meta name="description" content="Brief summary of your post for search engines.">
   ```

3. **`<h1>`** (line 36):
   ```html
   <h1>Your Post Title</h1>
   ```

4. **Post meta** (lines 37-41):
   ```html
   <div class="post-meta">
       <strong>Published:</strong> June 28, 2026 |
       <strong>Reading Time:</strong> 7 min |
       <strong>Category:</strong> Image Processing
   </div>
   ```

5. **Content** (inside `<div class="post-content">`):
   Write your article using these HTML tags:
   ```html
   <h2>Section Heading</h2>
   <p>Paragraph text goes here.</p>

   <h3>Sub-heading</h3>

   <ul>
       <li>Bullet point</li>
       <li>Another bullet point</li>
   </ul>

   <ol>
       <li>Numbered item 1</li>
       <li>Numbered item 2</li>
   </ol>

   <strong>Bold text</strong>
   <em>Italic text</em>
   <code>inline code</code>

   <!-- Code block -->
   <pre><code>def my_function():
       return "Hello World"
   </code></pre>

   <!-- Image -->
   <img src="../images/my-image.jpg" alt="Description of image">

   <!-- Link -->
   <a href="https://example.com" target="_blank">Link text</a>
   ```

### Step 3: Add a card to blog.html

Open `blog.html` and find the `<div class="blog-grid">` section. Add a new card ABOVE the existing ones (newest first):

```html
<article class="blog-card">
    <div class="blog-card-cover">📷</div>
    <div class="blog-card-content">
        <h3>Your Post Title</h3>
        <div class="blog-card-meta">June 28, 2026</div>
        <p>Brief description of what the post is about (1-2 sentences).</p>
        <a href="blog/your-post-title.html">Read More →</a>
    </div>
</article>
```

**Emoji ideas for blog-card-cover**: 📷 (camera), 🔧 (tools), 💡 (ideas), 📊 (data), 🖥️ (code), 🎨 (design), ⚡ (performance)

### Step 4: Commit and push

```bash
git add blog/your-post-title.html blog.html
git commit -m "Add blog post: Your Post Title"
git push origin main
```

---

## Editing the Homepage

Open `index.html`. The structure is:

```
<nav>           → Navigation bar
<section class="header">    → Profile photo + name + contact links
<section class="card">      → "What I Do" section
<section class="card">      → "Professional Experience" section
<section class="card">      → "Education" section
<section class="card cta">  → "Explore My Work" call-to-action
<footer>        → Footer with copyright
```

### To add a new job:

Find the "Professional Experience" `<section class="card">` and add a new `<div class="job">` block:

```html
<div class="job">
    <h3>Job Title</h3>
    <p>Company Name • Start Date – End Date</p>
    <ul>
        <li>Achievement or responsibility 1.</li>
        <li>Achievement or responsibility 2.</li>
        <li>Achievement or responsibility 3.</li>
    </ul>
</div>
```

Place it ABOVE existing jobs (newest first).

### To update contact links:

Find `<p class="contact">` and edit the `<a>` tags:

```html
<p class="contact">
    <a href="mailto:your@email.com">Email</a> |
    <a href="tel:+1234567890">Phone</a> |
    <a href="https://github.com/yourusername">GitHub</a> |
    <a href="https://linkedin.com/in/yourprofile/">LinkedIn</a>
</p>
```

### To change the profile photo:

1. Place your new photo in `images/` (e.g., `images/new-photo.jpg`)
2. Update the `<img>` tag in `index.html`:
   ```html
   <img src="images/new-photo.jpg" class="profile-img" id="profileImg" alt="Your Name">
   ```

---

## Editing the Work Page

Open `work.html`. Same structure as homepage but focused on detailed work experience. Add/edit `<div class="job">` blocks.

---

## Changing Colors / Theme

All colors are CSS variables at the top of `css/styles.css`:

```css
:root {
    --bg-primary: #ffffff;        /* Page background */
    --bg-secondary: #fffef5;     /* Card background */
    --text-primary: #1a1a1a;     /* Main text color */
    --text-secondary: #555555;   /* Muted text */
    --border-color: #1a1a1a;     /* Borders */
    --box-shadow: rgba(0,0,0,0.08);
    --job-bg: #fffdf0;           /* Job card background */
    --job-border: #ffd700;       /* Yellow accent (left border of job cards) */
    --job-text: #b8860b;         /* Job title color */
    --nav-hover: #fff3b0;        /* Nav hover background */
    --nav-bg: #ffd700;           /* Navigation bar background (yellow) */
    --nav-text: #1a1a1a;         /* Navigation text color */
}
```

**To change the accent color**: Replace all `#ffd700` values with your preferred color.

**Dark mode colors** are under `body.dark-mode { ... }` — same variable names, different values.

### Color meanings:
- `#ffd700` = Gold/Yellow (accent color)
- `#1a1a1a` = Near-black (text)
- `#ffffff` = White (background)
- `#fffef5` = Warm white (card background)
- `#b8860b` = Dark goldenrod (headings in cards)

---

## Adding New Pages

1. Create a new HTML file (e.g., `projects.html`) at the root level.
2. Use this skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description for search engines.">
    <title>Page Title - Prayas Patnaik</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="index.html" class="nav-brand">Prayas Patnaik</a>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="work.html">Work</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="assets/resume.docx" target="_blank">Resume</a></li>
                <li><button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">🌙</button></li>
            </ul>
        </div>
    </nav>

    <main class="container">
        <section class="header">
            <h1>Your Page Title</h1>
            <p>Subtitle or description</p>
        </section>

        <section class="card">
            <h2>Section Title</h2>
            <p>Your content here.</p>
        </section>
    </main>

    <footer>
        <div class="social-links">
            <a href="https://github.com/prayaspatnaik21" target="_blank">GitHub</a>
            <a href="https://www.linkedin.com/in/prayas-patnaik-245a49123/" target="_blank">LinkedIn</a>
            <a href="mailto:prayaspatnaik21@gmail.com">Email</a>
        </div>
        <p>&copy; 2026 Prayas Patnaik</p>
    </footer>

    <script src="js/dark-mode.js"></script>
</body>
</html>
```

3. Add a link to it in the nav on ALL existing pages (index.html, work.html, blog.html).

---

## Navigation

The nav bar is duplicated in each HTML file. To add/remove/change links, you must edit it in each HTML file:

- `index.html` (line ~17-26)
- `work.html` (line ~12-21)
- `blog.html` (line ~13-22)
- `blog/template.html` (line ~14-24) — so future posts get the right nav
- `blog/getting-started-camera-isp.html` (line ~14-23)
- Any future blog posts in `blog/`

> **Important**: The footer (social links at bottom) is ALSO duplicated in each file. If you change your GitHub, LinkedIn, or email, update the `<footer>` in every HTML file too.

Current nav structure:
```html
<ul class="nav-links">
    <li><a href="work.html">Work</a></li>
    <li><a href="blog.html">Blog</a></li>
    <li><a href="assets/resume.docx" target="_blank">Resume</a></li>
    <li><button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">🌙</button></li>
</ul>
```

**For pages inside `blog/` folder**, use `../` prefix for all links:
```html
<li><a href="../work.html">Work</a></li>
<li><a href="../blog.html">Blog</a></li>
<li><a href="../assets/resume.docx" target="_blank">Resume</a></li>
```

---

## Dark Mode

- Default: **Light mode** (yellow nav + white background)
- Toggle: Click the 🌙/☀️ button in the nav
- Persistence: User's choice is saved in browser `localStorage` — survives page refreshes and navigation
- Implementation: `js/dark-mode.js` adds/removes the `dark-mode` class on `<body>`
- Styling: `body.dark-mode { ... }` in `css/styles.css` overrides the CSS variables

If you ever need to reset: Open browser DevTools (F12) → Console → type `localStorage.clear()` → refresh.

---

## Images

1. Place images in the `images/` folder
2. Reference from root-level pages: `<img src="images/photo.jpg" alt="Description">`
3. Reference from `blog/` pages: `<img src="../images/photo.jpg" alt="Description">`
4. Recommended: Optimize images before adding (compress to < 500KB)
5. Supported formats: `.jpg`, `.png`, `.webp`, `.gif`

---

## Deployment

GitHub Pages automatically deploys when you push to the `main` branch.

```bash
# Full workflow
git add -A
git commit -m "Your commit message"
git push origin main
```

**Deployment takes ~1 minute.** Check status at:
`https://github.com/prayaspatnaik21/prayaspatnaik21.github.io/actions`

### If site doesn't update:
1. Check GitHub Actions for build errors
2. Hard-refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. Clear browser cache
4. Verify `_config.yml` has correct `url` setting

---

## File Reference

### Files you'll edit frequently:
| File | When to edit |
|---|---|
| `index.html` | Update experience, skills, contact info |
| `work.html` | Add/update detailed work entries |
| `blog.html` | Add new blog post cards |
| `blog/*.html` | Write new blog posts |
| `css/styles.css` | Change colors, spacing, fonts |
| `images/` | Add new photos |
| `assets/resume.docx` | Replace with updated resume |

### Files you rarely need to touch:
| File | Purpose |
|---|---|
| `js/dark-mode.js` | Dark mode logic (only change if you modify theme behavior) |
| `js/script.js` | Greeting animation (only change if you modify animations) |
| `_config.yml` | Jekyll config (only change if you rename the site or change URL) |
| `Gemfile` | Ruby deps (don't touch unless Jekyll breaks) |
| `.gitignore` | Git exclusions (don't touch) |
| `_layouts/` | Jekyll templates (only matters for `_posts/` markdown posts) |

---

## Common Tasks Cheatsheet

| Task | Action |
|---|---|
| Add a new blog post | Copy `blog/template.html` → edit → add card to `blog.html` |
| Add a new job | Edit `index.html` or `work.html`, add `<div class="job">` block |
| Change nav links | Edit nav `<ul>` in ALL HTML files |
| Update resume | Replace `assets/resume.docx` |
| Change profile photo | Replace `images/prayas.jpg` (keep same filename) or update `<img>` tag |
| Change accent color | Edit `--job-border` and `--nav-bg` in `css/styles.css` |
| Change site title | Edit `<title>` in each HTML file + `_config.yml` |
| Add an image to a blog post | Put image in `images/`, reference as `<img src="../images/file.jpg">` |
| Test locally (Mac) | `bundle exec jekyll serve --livereload` then open `localhost:4000` |
| Test locally (any) | `python3 -m http.server 8000` then open `localhost:8000` |
| Deploy | `git add -A && git commit -m "msg" && git push origin main` |

---

## CSS Classes Reference

Use these classes in your HTML for consistent styling:

| Class | Used on | Effect |
|---|---|---|
| `container` | `<main>` | Centers content, max-width 900px |
| `header` | `<section>` | Centered header with padding |
| `card` | `<section>` | White card with shadow and rounded corners |
| `job` | `<div>` | Left-bordered card for job/experience entries |
| `cta` | `<section>` | Centered call-to-action card |
| `btn` | `<a>` | Yellow button style |
| `blog-card` | `<article>` | Blog post preview card |
| `blog-post` | `<article>` | Full blog post content container |
| `post-content` | `<div>` | Blog post body (handles h2, p, code, pre styling) |
| `back-link` | `<a>` | "← Back to Blog" link style |
| `profile-img` | `<img>` | Circular profile photo |
| `contact` | `<p>` | Contact links row |
| `social-links` | `<div>` | Footer social links |

---

## Responsive Breakpoints

The site is responsive with two breakpoints in `css/styles.css`:

- **Tablet** (`max-width: 768px`): Smaller fonts, reduced padding, single-column blog grid
- **Mobile** (`max-width: 480px`): Stacked nav, minimal padding, compact cards

No changes needed — it works automatically. Test by resizing your browser window.
- **JS (.js)**: For interactivity

## 📚 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Liquid Template Documentation](https://shopify.github.io/liquid/)

## 🔗 Links

- **GitHub**: [prayaspatnaik21](https://github.com/prayaspatnaik21)
- **LinkedIn**: [Prayas Patnaik](https://www.linkedin.com/in/prayas-patnaik-245a49123/)
- **Email**: [prayaspatnaik21@gmail.com](mailto:prayaspatnaik21@gmail.com)

---

**Built with Jekyll & GitHub Pages** | Last Updated: June 2026
