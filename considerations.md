# Considerations

## Build & pipeline
- `tailwind.config.js` scans `./_site/**/*.html`; limiting content globs to `src/**` would speed up builds and avoid pulling generated markup into purge decisions.
- `.eleventy.js` passthrough-copies `src/css`, so the raw `input.css` (with Tailwind directives) is published alongside the compiled `css/style.css`. Consider dropping that copy step or moving compiled CSS so only the minified output is served.
- Default `pathPrefix` is `/`. Deployments under a subpath need `PATH_PREFIX` set; documenting this or defaulting to an empty string would prevent broken asset links on GitHub Pages-style hosts.

## UX / accessibility
- Footer social and legal links in `src/_layouts/base.njk` currently point to `#`; keyboard users hit dead ends and screen readers have no context. Replace with real URLs or hide until ready, and add labels.
- Several external links in `src/community.njk` open new tabs without `rel="noopener noreferrer"` (e.g., Instagram, X/Twitter, YouTube, Discord), which is a small security/performance gap. Add the rel attributes consistently.

## Content completeness
- No custom 404 page exists; add a simple 404 template to improve broken-link handling.

## Performance / behavior
- `src/js/hero-resize.js` resizes the hero headline to containerWidth/10 without clamping and never disconnects the `ResizeObserver`; this can produce oversized text on wide screens and keep the observer alive. Use CSS `clamp()` or clamp in JS, and disconnect on cleanup.

