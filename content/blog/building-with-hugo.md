---
title: "Building a Personal Website with Hugo"
date: 2024-01-20
draft: false
---

# Building a Personal Website with Hugo

After researching various static site generators, I decided to build my personal website with Hugo. Here's why and how I did it.

## Why Hugo?

Hugo stood out for several reasons:

- **Speed**: Hugo is incredibly fast at building sites
- **Simplicity**: Clean, straightforward templating system
- **Flexibility**: Powerful theming and customization options
- **No Dependencies**: Single binary with no runtime dependencies

## The Design Process

I wanted a clean, minimal design that would focus on content. My requirements were:

1. **Responsive layout** that works on mobile and desktop
2. **Dark/light mode toggle** for user preference
3. **Sidebar navigation** for easy site navigation
4. **Fast loading** with minimal JavaScript
5. **Accessible** design following web standards

## Implementation Highlights

### Water.css Integration

I chose [water.css](https://watercss.kognise.dev/) as the base styling framework because:

- It's classless - works with semantic HTML
- Provides excellent typography out of the box
- Includes both light and dark themes
- Very lightweight (only 2KB gzipped)

### Custom Theme Development

Building a custom Hugo theme allowed me to:

- Create the exact layout I wanted
- Implement responsive sidebar navigation
- Add dark mode toggle functionality
- Optimize for performance

### Theme Toggle Implementation

The dark/light mode toggle was implemented with vanilla JavaScript:

```javascript
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
```

## Performance Results

The final site is incredibly fast:

- **Build time**: Under 100ms for the entire site
- **Page load**: Typically under 500ms
- **Bundle size**: Less than 50KB total
- **Lighthouse score**: 100/100 on all metrics

## Lessons Learned

1. **Start simple**: Begin with basic functionality and iterate
2. **Mobile first**: Design for mobile devices from the beginning
3. **Performance matters**: Every byte counts for user experience
4. **Accessibility**: Semantic HTML and proper ARIA labels are essential

## What's Next

I'm planning to add:

- Search functionality
- RSS feed optimization
- More interactive elements
- Better code syntax highlighting

Building this site was a great learning experience, and I'm excited to continue improving it over time!

---

*What static site generator do you prefer? Let me know your thoughts!*