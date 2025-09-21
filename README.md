# Pawsitive Pup — Automated SEO Affiliate Site (Next.js + Tailwind)

**What this gives you**

- Next.js (App Router) static export — ultra-fast, cheap hosting, near-zero maintenance
- TailwindCSS styling + clean components
- Markdown blog (in `/posts`) + draft queue (in `/drafts`)
- Products page with affiliate-ready buttons (replace `AFFILIATE_TAG`)
- Newsletter form block (connect Formspree or any form handler)
- AdSense placeholder + `public/ads.txt`
- Static `robots.txt` and `sitemap.xml`
- **Auto-publish workflow**: a GitHub Action that moves one draft from `/drafts` to `/posts` on schedule and pushes back to your repo

---

## Quick Start

1. **Install deps**
   ```bash
   npm i
   ```
2. **Run dev**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000
3. **Build & export static**
   ```bash
   npm run build
   ```
   Static output lands in `out/` — deploy to Netlify, Vercel (static), Cloudflare Pages, or any static host.

---

## Connect Monetization

- **AdSense**: After approval, add your script to `app/layout.tsx` (head) and set your publisher ID in `public/ads.txt`.
- **Affiliate Links**: Replace `AFFILIATE_TAG` with your IDs in `app/products/page.tsx` and any blog posts.
- **Newsletter**: Replace the `action` URL in `components/Newsletter.tsx` with your Formspree (or similar) endpoint.

---

## Auto-Publish Drafts

This repo includes `.github/workflows/schedule.yml`. It:
- Runs on a cron (daily at 09:00 UTC by default)
- Moves the **oldest** file from `/drafts` to `/posts`
- Commits & pushes the change (requires `contents: write` permission and default GITHUB_TOKEN)

Prepare a queue of future posts in `/drafts` and let the Action drip them out.

---

## SEO Tips

- Keep titles specific and helpful (long-tail intent).
- Add internal links between related posts.
- Publish at least 10–20 solid posts before applying for AdSense or Mediavine.

---

## Replace Placeholders

- Domain in `app/robots.txt` and `app/sitemap.xml`
- Email in `/app/about/page.tsx`
- AdSense publisher in `/public/ads.txt`
- Form endpoint in `/components/Newsletter.tsx`
- Amazon affiliate tag in `AffiliateButton` and product links

---

## License

MIT for the code. You are responsible for image/content licenses if you replace the included SVG placeholders.


## Privacy & Anonymity (Recommended)
- Do **not** publish personal emails or your real name in the site content or GitHub repo. Use a generic site contact like `contact@yourdomain.com` only after configuring a private, anonymous mailbox (ProtonMail or similar) and enabling WHOIS privacy for your domain.
- Use domain registrar WHOIS privacy and set GitHub repo settings to avoid exposing your email in commits. When making initial commits, set local Git `user.name` and `user.email` to generic values or use the repository's GitHub web UI to create the initial commit to avoid embedding personal info.
- For AdSense and affiliate programs, prefer using a business email not tied to personal accounts. Consider a dedicated payment account with a business name or DBA for extra privacy.
- GitHub Actions commit author is set to `github-actions[bot]` by default in the included workflow, which helps keep actions anonymous. Avoid embedding personal tokens or secrets in the repo.

---

## Hands-Off Automation

This repo now includes **offline draft generation**:

- **Daily 08:30 UTC**: `.github/workflows/generate.yml` runs `scripts/generate_drafts.py` to mint a *new* draft from `data/topics.txt` (no external APIs). It also creates a unique SVG hero image per post.
- **Daily 09:00 UTC**: `.github/workflows/schedule.yml` publishes the oldest draft to `/posts`.
- Result: perpetual queue — truly hands-off. To add more variety, append lines to `data/topics.txt`.

**No personal info** is used: the generator writes generic front-matter and images and never includes your real name or email.

### Configure anonymity
- Use WHOIS privacy and a generic contact email.
- Set Git commit identity to generic values or rely on the GitHub Actions bot (already configured).

