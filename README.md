# Tin Škarpa — Portfolio

Next.js 16 (App Router) + Tailwind CSS 4, statically exported.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
```

## Editing content

Everything on the page comes from `src/data/content.ts`: profile, links,
projects, timeline and skills.

- **Gameplay clips:** put a GIF / MP4 / WebM in `public/media/` and set the
  project's `media` field, e.g. `media: "/media/try.mp4"`.
- **CV:** `public/Tin-Skarpa-CV.pdf`. Replace the file to update it.

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, <html> shell
    page.tsx          composes the sections
    globals.css       Tailwind theme tokens + a few utilities
  components/
    Nav.tsx           sticky nav, active-section highlight, mobile menu (client)
    Hero.tsx          intro, CTAs, stats
    DungeonRun.tsx    playable pixel dungeon in the hero (client)
    Projects.tsx      game cards with cover art, status badges, links
    PixelSprite.tsx   renders text sprites as SVG
    sprites.ts        pixel art for the hero and the game covers
    Timeline.tsx      experience and education tracks
    Skills.tsx        skills loadout
    Contact.tsx       contact + footer
    Section.tsx       shared section wrapper
  data/
    content.ts        all copy and links
public/
  media/              gameplay GIFs / videos
```

## Deploying

`npm run build` produces a plain static site in `out/`. Import the repo on
Vercel or Netlify (zero config), or publish `out/` to GitHub Pages.

## Regenerating the CV

The CV text lives in `tools/make_cv.py` (Python, needs `pip install reportlab`):

```bash
python3 tools/make_cv.py public/Tin-Skarpa-CV.pdf
```

## Link preview image

`public/og.png` is the picture shown when the site link is shared. To rebuild it
after changing screenshots (needs `pip install pillow`):

```bash
python3 tools/make_og.py .
```
