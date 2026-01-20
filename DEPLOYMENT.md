# Deployment Guide

This guide covers deploying this portfolio website to production with GitHub Pages and custom domain setup.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [x] DELIVERED_RESULTS section hidden (`config.js` → `production.showDeliveredResults: false`)
- [x] SEO meta tags configured
- [x] Structured data (JSON-LD) implemented
- [x] `sitemap.xml` created
- [x] `robots.txt` created
- [x] `.gitignore` configured

## 🌐 Deployment: GitHub Pages

### Step 1: Create GitHub Repository

1. Create a new repository on GitHub
2. Name it appropriately (e.g., `portfolio`, `personal-website`)
3. Make it **Public** (required for free GitHub Pages)

### Step 2: Push Code

```bash
cd /path/to/portfolio
git init
git add .
git commit -m "Initial commit: Production-ready portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select `main` branch and `/ (root)` folder
3. Click **Save**
4. Site will be live at: `https://USERNAME.github.io/REPO_NAME`

### Step 4: Custom Domain Setup

1. In GitHub Pages settings, enter your domain in **Custom domain**
2. The `CNAME` file should contain:
   ```
   yourdomain.com
   www.yourdomain.com
   ```
3. Configure DNS at your domain registrar:

   **A Records** (for root domain):
   - Type: A, Name: @, Value: `185.199.108.153`, TTL: 3600
   - Type: A, Name: @, Value: `185.199.109.153`, TTL: 3600
   - Type: A, Name: @, Value: `185.199.110.153`, TTL: 3600
   - Type: A, Name: @, Value: `185.199.111.153`, TTL: 3600

   **CNAME Record** (for www subdomain):
   - Type: CNAME, Name: www, Value: `USERNAME.github.io`, TTL: 3600

4. Wait 24-48 hours for DNS propagation
5. Enable **Enforce HTTPS** in GitHub Pages settings

## 🔄 Alternative Hosting Options

### Netlify

1. Sign up/login with GitHub
2. **Add new site** → **Import an existing project**
3. Select your GitHub repository
4. Build settings: Leave empty (no build needed)
5. Publish directory: `/`
6. Deploy

For custom domain, add domain in site settings and follow Netlify's DNS instructions.

### Vercel

1. Sign up/login with GitHub
2. **Add New Project**
3. Import your GitHub repository
4. Build settings: Leave defaults (no build needed)
5. Deploy

For custom domain, add domain in project settings → Domains.

## ✅ Post-Deployment Checklist

- [ ] Test all links work correctly
- [ ] Verify DELIVERED_RESULTS section visibility (if applicable)
- [ ] Check site loads on mobile and desktop
- [ ] Test SEO with Google Search Console
- [ ] Verify HTTPS is enabled
- [ ] Test all social links open correctly
- [ ] Check embedded content displays properly

## 🔄 Updating Content

To update content after deployment:

1. Edit `config.js` locally
2. Commit and push:
   ```bash
   git add config.js
   git commit -m "Update portfolio content"
   git push origin main
   ```
3. Changes auto-deploy (GitHub Pages rebuilds within 1-2 minutes)

## 📊 SEO Verification

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `yourdomain.com`
3. Verify ownership (DNS record or HTML file upload)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### SEO Testing Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- Browser dev tools to inspect meta tags

## 🎯 Enabling Portfolio Section

When ready to show portfolio projects:

1. Edit `config.js`
2. Change `production.showDeliveredResults: false` → `true`
3. Populate `portfolio` array with project objects
4. Commit and push

## 📝 SEO Best Practices

1. **Regular Updates** - Google favors fresh content
2. **Backlinks** - Get linked from LinkedIn, Medium articles, etc.
3. **Social Sharing** - Share site on social media
4. **Performance** - Optimize images (WebP format, compress)
5. **Mobile-First** - Ensure excellent mobile experience

## 🐛 Troubleshooting

**Site not loading?**
- Check DNS propagation (can take 24-48 hours)
- Verify DNS records are correct
- Ensure HTTPS is enabled

**Changes not appearing?**
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Check if deployment completed successfully
- Clear browser cache

**404 errors?**
- Ensure all files are in root directory
- Check file names are correct (case-sensitive on some hosts)
- Verify `index.html` exists in root

---

**The site is production-ready! 🎉**
