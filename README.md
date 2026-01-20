# Personal Portfolio Website

A modern, responsive portfolio website built with vanilla JavaScript, Tailwind CSS, and a content-driven architecture. This project demonstrates a clean separation of concerns with all content managed through a single configuration file.

**Live Site:** [faizwidodo.com](https://faizwidodo.com)

## 🚀 Features

- **Fully Responsive** - Mobile-first design optimized for all screen sizes
- **Content-Driven Architecture** - All content managed through `config.js`
- **SEO Optimized** - Complete meta tags, structured data (JSON-LD), and sitemap
- **Modern Design** - Terminal/tech aesthetic with smooth CSS animations
- **Fast Loading** - Static site with minimal dependencies, no build step required
- **Easy Maintenance** - Update content without touching HTML/JS

## 📁 Project Structure

```
├── index.html          # Main HTML structure and styles
├── config.js           # Content configuration (all site content)
├── app.js              # Rendering logic (dynamically builds UI from config)
├── fw.png              # Favicon
├── CNAME               # Custom domain configuration for GitHub Pages
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine directives
├── README.md           # This file
├── DEPLOYMENT.md       # Deployment and hosting guide
└── SEO_IMPROVEMENTS.md # SEO optimization strategies
```

## 🏗️ Architecture

This portfolio uses a **content-driven architecture**:

1. **`config.js`** - Single source of truth for all content
2. **`app.js`** - Reads config and dynamically renders HTML
3. **`index.html`** - Provides structure, styles, and container elements

This approach makes content updates trivial - just edit `config.js` and push. No need to modify HTML or JavaScript.

## ✏️ Content Management

All content is managed through `config.js`. The configuration object includes:

- **Navigation** - Brand name, connect button
- **Hero Section** - Title, description, status badge
- **Companies** - List of companies with URLs and brand colors
- **Domain Experience** - Expertise areas with icons
- **Portfolio Projects** - Featured work (can be hidden via config)
- **Competencies** - Core skills with Material Symbols icons
- **Mentorship** - Stats, platforms, embedded reviews
- **Education** - Degrees, institutions, scholarships with badges
- **Social Links** - External profile links

### Example: Adding a Company

```javascript
companies: [
  { 
    name: "COMPANY_NAME", 
    url: "https://company.com",
    glowColor: "#HEX_COLOR"  // Brand color for glow effect
  }
]
```

### Example: Enabling Portfolio Section

```javascript
production: {
  showDeliveredResults: true  // Set to true to show portfolio projects
}
```

Then populate the `portfolio` array with project objects.

## 🛠️ Development

### Local Setup

1. Clone the repository
2. Open `index.html` in a web browser (no server needed)
3. Edit `config.js` to update content
4. Refresh browser to see changes

### Making Changes

1. Edit `config.js` with your content
2. Test locally by opening `index.html`
3. Commit and push:
   ```bash
   git add config.js
   git commit -m "Update portfolio content"
   git push origin main
   ```

### Deployment

The site is deployed via GitHub Pages. Pushing to `main` automatically triggers a rebuild:

```bash
git push origin main
```

GitHub Pages rebuilds within 1-2 minutes. See `DEPLOYMENT.md` for detailed deployment instructions.

## 📊 SEO Implementation

The site includes comprehensive SEO:

- ✅ Optimized meta tags (title, description, keywords)
- ✅ Structured data (JSON-LD schema for Person, Organization, Education)
- ✅ Sitemap.xml for search engine discovery
- ✅ Robots.txt for crawl directives
- ✅ Canonical URLs
- ✅ Open Graph tags (Facebook/LinkedIn)
- ✅ Twitter Card meta tags

See `SEO_IMPROVEMENTS.md` for optimization strategies and implementation details.

## 🎨 Customization

### Colors

Edit the Tailwind config in `index.html`:

```javascript
colors: {
  "primary": "#1f8aad",        // Main brand color
  "background-dark": "#0a0c0d", // Dark background
  "border-subtle": "#1e2225"   // Subtle border color
}
```

### Fonts

Fonts are loaded from Google Fonts:
- **Display**: Manrope (headings, body text)
- **Mono**: JetBrains Mono (code-style elements, section titles)

### Animations

CSS animations are defined in `index.html`:
- Infinite horizontal scrolling for domain/competency sections
- Hover effects on interactive elements
- Smooth transitions

## 🔧 Technical Details

### Dependencies

- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **Google Fonts** - Manrope and JetBrains Mono
- **Material Symbols** - Icon library

No build step, no npm, no bundler. Pure vanilla JavaScript.

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance

- Static HTML/CSS/JS - no server-side rendering
- Minimal dependencies - fast load times
- Optimized animations using CSS transforms
- Lazy loading for embedded iframes

## 📝 Code Structure

### `config.js`
Central configuration object containing all site content. Structure is self-documenting with clear property names.

### `app.js`
Rendering functions that:
- Read from `portfolioConfig`
- Create DOM elements dynamically
- Apply styles and classes
- Handle special cases (infinite scrolling, conditional rendering)

### `index.html`
- HTML structure with container elements
- Tailwind CSS configuration
- Custom CSS animations
- Meta tags and structured data

## 🤝 Building Something Similar

If you want to build a similar portfolio:

1. **Start with structure** - Copy `index.html` for the base layout
2. **Create your config** - Model `config.js` with your content
3. **Adapt rendering logic** - Modify `app.js` to match your needs
4. **Customize styles** - Adjust Tailwind config and custom CSS
5. **Deploy** - Use GitHub Pages, Netlify, or Vercel

The architecture is intentionally simple - no frameworks, no build tools. Easy to understand, modify, and maintain.

## 📄 License

This project is open source. Feel free to use it as a starting point for your own portfolio.

## 🔗 Links

- **Website**: [faizwidodo.com](https://faizwidodo.com)
- **LinkedIn**: [linkedin.com/in/faizwidodo](https://www.linkedin.com/in/faizwidodo)
- **GitHub**: [github.com/faiz-widodo](https://github.com/faiz-widodo)

---

**Built with:** HTML, CSS (Tailwind), Vanilla JavaScript  
**Deployed on:** GitHub Pages  
**Domain:** faizwidodo.com
