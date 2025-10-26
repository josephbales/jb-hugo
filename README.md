# Personal Website

A clean, minimal personal website built with Hugo and water.css, featuring a responsive sidebar layout and dark/light mode toggle.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with user preference persistence
- **Sidebar Navigation**: Clean left-hand sidebar with main navigation
- **Blog**: Full blog functionality with post listing and individual post pages
- **Static Pages**: Bio and contact pages included
- **Performance**: Fast loading with minimal JavaScript
- **Accessibility**: Semantic HTML and proper ARIA labels

## Technology Stack

- **Hugo**: Fast static site generator
- **water.css**: Minimal, classless CSS framework
- **Custom Theme**: Built from scratch for this site
- **Vanilla JavaScript**: For theme toggle functionality

## Local Development

### Prerequisites

- Hugo (install with `brew install hugo` on macOS)

### Running the Site

1. Clone this repository
2. Navigate to the project directory
3. Start the development server:

```bash
hugo server --buildDrafts
```

4. Open your browser to `http://localhost:1313`

### Building for Production

```bash
hugo --minify
```

The built site will be in the `public/` directory.

## Customization

### Personal Information

Update the following files with your personal information:

- `hugo.toml`: Site title, author name, and description
- `content/bio.md`: Your biography and background
- `content/contact.md`: Your contact information and social links

### Blog Posts

Add new blog posts to the `content/blog/` directory. Each post should have front matter like:

```markdown
---
title: "Your Post Title"
date: 2024-01-01
draft: false
---

Your content here...
```

### Styling

- Main styles are in `static/css/custom.css`
- water.css is loaded from CDN in the base template
- CSS custom properties are used for easy theming

### Theme Toggle

The dark/light mode toggle is implemented in `static/js/theme-toggle.js` with:

- Local storage persistence
- System preference detection
- Smooth transitions

## File Structure

```
├── content/
│   ├── blog/
│   │   ├── _index.md
│   │   └── [blog posts...]
│   ├── bio.md
│   └── contact.md
├── static/
│   ├── css/
│   │   └── custom.css
│   └── js/
│       └── theme-toggle.js
├── themes/
│   └── personal/
│       └── layouts/
│           ├── _default/
│           │   ├── baseof.html
│           │   ├── list.html
│           │   └── single.html
│           └── index.html
└── hugo.toml
```

## License

Feel free to use this as a starting point for your own personal website!