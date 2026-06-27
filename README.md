# Prayas Patnaik - Portfolio Website

A modern, responsive portfolio built with **Jekyll** and hosted on **GitHub Pages**.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/prayaspatnaik21/prayaspatnaik21.github.io.git
   cd prayaspatnaik21.github.io
   ```

2. **Install dependencies**
   ```bash
   gem install bundler
   bundle install
   ```

3. **Run the local server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open in browser**
   - Visit `http://localhost:4000`

## 📁 Project Structure

```
.
├── _layouts/              # Page templates (default.html, post.html)
├── _posts/                # Blog posts (Markdown files)
├── _config.yml            # Jekyll configuration
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       └── main.js        # JavaScript utilities
├── index.md               # Homepage
├── about.md               # About page
├── portfolio.md           # Portfolio/projects page
├── blog.md                # Blog listing
├── contact.md             # Contact page
├── Gemfile                # Ruby dependencies
└── README.md              # This file
```

## 📝 Adding Blog Posts

1. **Create a new file** in `_posts/` with format: `YYYY-MM-DD-title.md`
   ```
   _posts/2025-03-15-my-new-post.md
   ```

2. **Add frontmatter** (metadata) at the top:
   ```yaml
   ---
   layout: post
   title: My Blog Post Title
   date: 2025-03-15
   category: "Category Name"
   reading_time: 5
   excerpt: "Brief description of your post"
   ---
   ```

3. **Write your content** in Markdown below the frontmatter

4. **Commit and push**:
   ```bash
   git add _posts/
   git commit -m "Add blog post: My Blog Post Title"
   git push
   ```

The post will automatically appear on the blog page!

## 🎨 Customizing the Theme

### Update Site Information
Edit `_config.yml`:
```yaml
title: Your Name
description: Your tagline
author: Your Name
email: your@email.com
url: https://yoursite.github.io
```

### Modify Styling
Edit `assets/css/style.css`:
- Color variables at the top
- Global styles
- Component-specific styles

### Add/Edit Pages
1. Create a new `.md` file in the root directory
2. Add frontmatter with layout: `default`
3. Add link to navigation in `_layouts/default.html`

## 🔗 Navigation

The main navigation is in `_layouts/default.html`. To add new pages:

```html
<li><a href="{{ site.url }}/new-page/">New Page</a></li>
```

## 🚀 Deployment

GitHub Pages automatically builds and deploys your site when you push to the `main` branch.

**Steps:**
1. Make changes locally
2. Test with `bundle exec jekyll serve`
3. Commit and push to `main` branch
4. Visit your site: `https://prayaspatnaik21.github.io`

## 📋 Useful Commands

```bash
# Build the site
bundle exec jekyll build

# Serve locally with live reload
bundle exec jekyll serve

# Clean build (remove old files)
bundle exec jekyll clean

# Build with drafts
bundle exec jekyll serve --drafts
```

## 💡 Tips

- **Markdown syntax**: Use [GitHub Flavored Markdown](https://github.github.com/gfm/)
- **Code blocks**: Use triple backticks with language: ` ```python `
- **Links**: Use `[text](url)` format
- **Images**: Use `![alt text](image-url)`
- **Live preview**: Changes are reflected automatically when using `jekyll serve`

## 🎯 File Types

- **Markdown (.md)**: For pages and blog posts
- **HTML (.html)**: For complex layouts (in `_layouts/`)
- **YAML (.yml)**: For configuration and frontmatter
- **CSS (.css)**: For styling
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
