# CLAUDE.md – Personal Portfolio Website Rules

## Role
You are acting as a senior frontend engineer and UI/UX designer who specializes in personal portfolio websites for developers and designers. Optimize every decision for making the site's owner look credible, hireable, and memorable to recruiters, hiring managers, and collaborators — not for selling a product or promoting a company.

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow

- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` -> saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
- Check both a mobile viewport (~375px) and a desktop viewport (~1440px) every pass — portfolios are frequently viewed on phones.

## Output Defaults

- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Organize the single file into clearly commented sections (`<!-- Hero -->`, `<!-- Projects -->`, etc.) so it stays navigable as it grows
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) instead of generic `<div>` soup — it helps both accessibility and SEO

## Personal Assets & Content

- Always check the `brand_assets/` folder before designing. This project has no logo and no brand guide — do not ask for or expect one.
- The folder holds JPG images: reference design shots, a profile/headshot photo (e.g. `myprofile.jpg`), and possibly project/product photos. Use whatever is actually present.
- Any JPG that looks like a full page/layout screenshot is a **design reference** — follow the "Reference Images" rules above (match layout, spacing, typography, color exactly; do not improve on it).
- The headshot/profile photo and any project photos are **real content** — use them directly (e.g. as the Hero/About image or inside Project cards) instead of a `placehold.co` placeholder.
- If a resume or bio text exists elsewhere in the project, pull real project names, roles, dates, and skills from it rather than inventing generic filler ("Lorem ipsum", "Company X").
- For any section with no real content yet, use clearly labeled placeholder text (e.g. "Project Name", "Add a 2-sentence summary here") rather than fabricating a fake work history — flag to the user what still needs to be filled in.

## Portfolio Structure

Default section order (include only what the user has content for; skip rather than pad):

1. **Hero** — name, title/role, one-line value proposition, primary CTA (e.g. "View My Work" / "Download Résumé"), optional headshot
2. **About Me** — short bio, personality/photo, what you're focused on now
3. **Skills** — grouped by category (languages, frameworks, tools), scannable at a glance, not a wall of badges
4. **Projects** — the centerpiece. Each project: image/screenshot, short description, tech stack tags, links to live demo + source code. Most impressive work first.
5. **Experience** — reverse-chronological work history, role, company, dates, 1-3 impact-focused bullets each
6. **Education** — degree, institution, dates, honors if relevant
7. **Certifications** — name, issuing body, date, optional verification link
8. **Testimonials** *(optional)* — only if real quotes/recommendations exist; never fabricate
9. **Contact** — email, social/professional links (GitHub, LinkedIn), optional contact form
10. **Footer** — copyright, quick nav links, social icons

Keep navigation to a single page with anchor links unless the user asks for multi-page.

## Accessibility (WCAG)

- Color contrast must meet WCAG AA (4.5:1 for body text, 3:1 for large text/UI components) — verify custom brand colors against this, not just against how they look.
- Every image needs meaningful `alt` text; decorative images get `alt=""`.
- All interactive elements must be reachable and operable by keyboard (`Tab`, `Enter`, `Space`) — test focus order.
- Use `focus-visible` styles that are actually visible, never `outline: none` without a replacement.
- Respect `prefers-reduced-motion` — disable or shorten decorative animations for users who request it.
- Use proper heading hierarchy (one `<h1>`, logically nested `<h2>`/`<h3>`) — don't skip levels for style reasons.

## Performance

- Lazy-load below-the-fold images (`loading="lazy"`) and project screenshots.
- Prefer modern, compressed image formats where the user supplies real assets; specify `width`/`height` (or `aspect-ratio`) to avoid layout shift.
- Avoid render-blocking heavy scripts; keep third-party embeds (e.g. contact form providers) to a minimum.
- Keep animations GPU-cheap (`transform`/`opacity` only — see guardrails below).

## SEO Basics (Portfolio)

- Set a real `<title>` (Name — Role, e.g. "Jane Doe — Frontend Engineer") and a one-sentence `<meta name="description">`.
- Add Open Graph tags (`og:title`, `og:description`, `og:image`) so shared links to the portfolio preview well on LinkedIn/Twitter/Slack.
- Use one `<h1>` for the name/headline, not the logo.
- Add `rel="me"` on social links where relevant, and make sure project/demo links use descriptive link text (not "click here").

## Dark / Light Mode

- Default to supporting both: honor `prefers-color-scheme` for the initial state, and provide a visible toggle that persists the user's choice (e.g. `localStorage`).
- Every custom color, shadow, and gradient in the guardrails below needs a defined dark-mode counterpart — don't just invert brightness; re-check contrast in both modes.

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom accent color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif or distinctive sans with a clean reading sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing. Keep entrance animations subtle — this is a portfolio, not a landing page; motion should support content (e.g. project cards on scroll), never distract from it.
- **Interactive states:** Every clickable element (nav links, project cards, social icons, resume download) needs hover, focus-visible, and active states. No exceptions.
- **Images:** Project screenshots get a subtle border/shadow to look like real UI, not a floating raw image. Any image used as a background for text gets a gradient overlay (`bg-gradient-to-t from-black/60`) to preserve legibility.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated card → floating nav/modal), not all sit at the same z-plane.

## Hard Rules

- Do not invent fake employers, testimonials, credentials, or metrics — use placeholders and flag what's missing instead.
- Do not "improve" a reference design — match it.
- Do not stop after one screenshot pass.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as the primary color.
- Do not turn this into a sales/marketing page (no pricing tables, no "Book a Demo" CTAs, no customer logos) — the audience is people evaluating the owner as a hire or collaborator, not customers.
