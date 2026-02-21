# Prayas Patnaik - Portfolio Website

A modern, responsive portfolio with dark mode support and a scalable blog architecture.

## 📁 Project Structure

```
.
├── css/
│   └── styles.css             # All styling (responsive, dark mode, components)
├── js/
│   ├── dark-mode.js           # Dark mode toggle logic (shared across all pages)
│   └── script.js              # General utilities and smooth scroll
├── blog/
│   └── template.html          # Template for creating new blog posts
├── images/
│   ├── prayas.jpg             # Profile image
│   ├── projects/              # Project images
│   └── blog/                  # Blog post images
├── index.html                 # Home page
├── work.html                  # Work experience page
├── blog.html                  # Blog listing page
└── README.md                  # This file
```

## 🚀 How to Add Blog Posts

### Step 1: Create a new blog post
1. Copy `blog/template.html` and rename it (e.g., `blog/my-first-post.html`)
2. Edit the post with your content:
   - Update `<title>` and `<meta description>`
   - Update `<h1>` with your post title
   - Update the post metadata (date, reading time, category)
   - Write your content in the `<div class="post-content">`

### Step 2: Add the blog post to the listing
1. Open `blog.html`
2. Add a new blog card in the `.blog-grid` section:

```html
<article class="blog-card">
    <div class="blog-card-cover">🎯</div>
    <div class="blog-card-content">
        <h3>Your Blog Post Title</h3>
        <div class="blog-card-meta">February 21, 2025</div>
        <p>Brief description of your blog post...</p>
        <a href="blog/my-first-post.html">Read More →</a>
    </div>
</article>
```

### Step 3: Commit to Git
```bash
git add blog/my-first-post.html blog.html
git commit -m "Add blog post: my-first-post"
git push
```

## 🎯 Blog Post Best Practices

## 🛠️ Local Development

### Start a local server:
```bash
cd /path/to/portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Testing checklist before deploying:
- [ ] Dark mode toggle works
- [ ] All links work
- [ ] Responsive on mobile, tablet, and desktop
- [ ] No console errors (F12 → Console)
- [ ] Images load properly
- [ ] All pages have navigation

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎨 Customizing Colors

All colors use CSS variables in `css/styles.css`:

```css
:root {
    --bg-primary: #f4f4f4;      /* Light mode background */
    --text-primary: #333333;     /* Light mode text */
    /* ... more variables ... */
}

body.dark-mode {
    --bg-primary: #1e1e1e;      /* Dark mode background */
    /* ... override variables ... */
}
```

To change colors, update these variables in `css/styles.css`.

## 🔧 Adding More Pages

To add new pages (e.g., Projects, About):
1. Create a new `.html` file
2. Copy the navigation from an existing page
3. Link to `css/styles.css`
4. Add scripts for dark mode and utilities
5. Use existing CSS classes for consistency

## 📊 Git Workflow (Recommended)

```bash
# Start a new branch for each feature
git checkout -b feature/blog-post-title

# Make changes and test
# ...

# Commit with meaningful messages
git add .
git commit -m "Add blog post: Understanding MQTT in Embedded Systems"

# Push to GitHub
git push origin feature/blog-post-title

# Create a Pull Request on GitHub (optional)
# Then merge to main branch
```

## 🚀 Deploying to GitHub Pages

1. Push to the `main` branch
2. GitHub Pages automatically deploys from the root folder
3. Visit `https://prayaspatnaik21.github.io`

## 📝 Notes for Future Enhancements

- **Search**: Add client-side search for blog posts
- **Tags**: Add tag-based filtering for blog posts
- **Comments**: Integrate a comment system (e.g., Disqus)
- **Analytics**: Add Google Analytics for tracking
- **Social Sharing**: Add social media share buttons
- **Reading Time**: Auto-calculate reading time from word count
- **Table of Contents**: Auto-generate TOC for long posts