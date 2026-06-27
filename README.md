# Prayas Patnaik - Portfolio Website

A modern, responsive portfolio with dark mode support, animated greeting messages, and a scalable blog architecture.

## 📁 Project Structure

```
.
├── css/
│   ├── styles.css              # All styling (responsive, dark mode, components)
│   └── ...
├── js/
│   ├── dark-mode.js            # Dark mode toggle logic
│   └── script.js               # Main app utilities, smooth scroll, greeting animations
├── blog/
│   └── template.html           # Template for creating new blog posts
├── images/
│   ├── prayas.jpg              # Profile image
│   ├── projects/               # Project images
│   └── blog/                   # Blog post images
├── assets/
│   └── resume.docx             # Resume file
├── index.html                  # Home page (main portfolio)
├── work.html                   # Work experience / detailed roles
├── blog.html                   # Blog listing page
├── script.js                   # Legacy script (dark mode toggle)
├── styles.css                  # Legacy stylesheet
└── README.md                   # This file
```

## 🎯 Features

- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with persistent storage
- **Animated Greeting**: Profile image animation with greeting message on home page
- **Blog System**: Easy-to-use blog post template and grid layout
- **Professional Typography**: Clean, readable fonts with proper contrast
- **Smooth Scrolling**: Smooth navigation between sections
- **CSS Variables**: Centralized color and styling management

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

## 🛠️ Local Development

### Start a local server:
```bash
cd /path/to/portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customizing Colors

All colors use CSS variables in `css/styles.css`:

```css
:root {
    --bg-primary: #f4f4f4;      /* Light mode background */
    --bg-secondary: #ffffff;    /* Light mode card background */
    --text-primary: #333333;    /* Light mode text */
    --text-secondary: #666666;  /* Light mode secondary text */
    --border-color: #333333;    /* Border color */
    --box-shadow: rgba(0,0,0,0.1);  /* Shadow color */
    --job-bg: #f9f9f9;          /* Job card background */
    --job-border: blue;         /* Job card border */
    --job-text: darkblue;       /* Job title color */
    --nav-hover: #e0e0e0;       /* Navigation hover color */
}

body.dark-mode {
    --bg-primary: #1e1e1e;      /* Dark mode background */
    --bg-secondary: #2d2d2d;    /* Dark mode card background */
    --text-primary: #e0e0e0;    /* Dark mode text */
    --text-secondary: #b0b0b0;  /* Dark mode secondary text */
    --border-color: #e0e0e0;    /* Dark mode border */
    --box-shadow: rgba(0,0,0,0.3);  /* Dark mode shadow */
    --job-bg: #3a3a3a;          /* Dark mode job card background */
    --job-border: #6699ff;      /* Dark mode job border */
    --job-text: #99ccff;        /* Dark mode job title */
    --nav-hover: #444444;       /* Dark mode hover */
}
```

To change colors, update these variables in `css/styles.css`.

## 🔧 Adding More Pages

To add new pages (e.g., Projects, About):
1. Create a new `.html` file
2. Copy the navigation from an existing page (`index.html`, `work.html`, or `blog.html`)
3. Link to `css/styles.css`
4. Add scripts for dark mode and utilities:
   ```html
   <script src="js/dark-mode.js"></script>
   <script src="js/script.js"></script>
   ```
5. Use existing CSS classes (`.card`, `.job`, `.blog-card`, etc.) for consistency

## 📋 Page Structure

### index.html (Home Page)
- Hero section with profile image and animated greeting
- "What I Do" section
- Professional experience summary
- Education section
- Call-to-action linking to blog

### work.html (Work Experience)
- Detailed professional experience with multiple roles
- Role descriptions with bullet points
- Companies, dates, and locations

### blog.html (Blog Listing)
- Grid layout for blog cards
- Card template with emoji/icon cover
- Links to individual blog posts

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

## 🎯 Key Technologies

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with variables, animations, and responsive design
- **JavaScript**: Dark mode toggle, smooth scrolling, and greeting animations
- **GitHub Pages**: Automatic deployment

## 📝 File Organization Notes

- **Legacy files** (`script.js`, `styles.css` in root): These are older versions. The main stylesheets are in `css/styles.css` and `js/` folder.
- **Dark mode**: Implemented in `js/dark-mode.js` using localStorage for persistence
- **Animations**: CSS animations for greeting message (`popOut`, `fadeInScale`, `wave`, `bounce`)

## 🔗 Links

- **GitHub**: https://github.com/prayaspatnaik21
- **LinkedIn**: https://www.linkedin.com/in/prayas-patnaik-245a49123/
- **Email**: prayaspatnaik21@gmail.com

---

**Last Updated**: June 2026
