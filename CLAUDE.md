# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev      # start dev server (localhost:3000)
pnpm build    # production build — use this to verify TypeScript compiles cleanly
pnpm lint     # ESLint
pnpm start    # serve the production build
```

Always run `pnpm build` after non-trivial changes to catch TypeScript errors before reporting success.

## Architecture

**Next.js 16 App Router** with React 19. All pages are Server Components by default; client interactivity lives in `components/ClientInteractions.tsx`.

### Key pattern: Server + Client split

`app/page.tsx` renders all HTML server-side, including listing `<article>` elements. Each article carries its full data as `data-*` HTML attributes (title, loc, price, facilities, photos, wa, etc.). `ClientInteractions.tsx` (`"use client"`) mounts once, reads those attributes from the DOM on demand, and drives all interactivity (scroll effects, filter tabs, FAQ accordion, listing detail modal, photo slider). **No React state, no props drilling, no API calls.**

`ClientInteractions.tsx` uses an `initialized` ref guard to prevent double-execution under React StrictMode.

### Files

| Path | Role |
|---|---|
| `app/layout.tsx` | Root layout: font loading (Playfair Display, Plus Jakarta Sans, Space Mono), global metadata, JSON-LD schema |
| `app/page.tsx` | Homepage — all sections: hero, stats, listings grid, services, testimonials, FAQ, contact, modal HTML skeleton |
| `app/globals.css` | All styles: design tokens (CSS vars), base layout, section styles, listing cards, modal/slider, legal pages |
| `components/Navbar.tsx` | Top nav (server) |
| `components/Footer.tsx` | Footer (server) |
| `components/ClientInteractions.tsx` | All client JS: scroll progress, active nav, mobile drawer, reveal animations, counters, filter tabs, FAQ accordion, listing detail modal + photo slider |
| `app/privacy-policy/page.tsx` | Static legal page |
| `app/terms-of-service/page.tsx` | Static legal page |

### Styling

**No Tailwind utility classes in JSX.** Tailwind v4 is installed as a PostCSS plugin but used only to inject its base reset. All styles are custom CSS in `app/globals.css` using CSS custom properties (`--color-gold`, `--font-playfair`, etc.).

### Adding a new listing

1. Add an `<article className="listing reveal" data-cat="kost|apartemen" data-title=... data-loc=... data-price=... data-period=... data-facilities=... data-desc=... data-photos=... data-wa=...>` block inside `#listingGrid` in `page.tsx`.
2. The detail button must be `<button className="btn btn-outline btn-detail">Detail</button>` — `ClientInteractions` attaches click listeners to `.btn-detail`.
3. Photo values (`data-photos`) are comma-separated CSS class names (`ph-1` through `ph-6`) defined in `globals.css`.

### Modal / slider

The `#listingModal` DOM skeleton lives in `page.tsx`. `ClientInteractions.tsx` populates it dynamically when a `.btn-detail` button is clicked. The slider uses CSS `translateX` transforms on `#sliderTrack`. Touch/swipe is handled natively (no library).

## IMPORTANT
- ALWAYS USE CONTEXT7 BEFORE MAKE ANY CHANGE
- ALWAYS USE SKILLS BEFORE MAKE ANY CHANGE
- ALWAYS DO GIT ADD, GIT COMMIT, AND GIT PUSH AFTER MAKE CHANGE
- NEVER PUT SENSITIVE DATA ON THE FRONT END AND GITHUB