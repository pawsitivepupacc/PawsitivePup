#!/usr/bin/env python3
import os, pathlib, datetime, random, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "topics.txt"
DRAFTS = ROOT / "drafts"
IMAGES = ROOT / "public" / "images" / "heroes"
TMPL = ROOT / "templates"

def slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s

def read_topics():
    if not DATA.exists():
        return []
    return [line.strip() for line in DATA.read_text(encoding="utf-8").splitlines() if line.strip()]

def pick_topic(existing_slugs):
    topics = read_topics()
    random.shuffle(topics)
    for t in topics:
        slug = slugify(t)
        if slug not in existing_slugs:
            return t, slug
    return None, None

def mix_sections():
    order = ["opening.md", "why_matters.md", "steps.md", "tools.md", "troubleshoot.md", "checklist.md", "closing.md"]
    # Small randomization
    random.shuffle(order[2:5])
    return order

def load_tmpl(name):
    return (TMPL / name).read_text(encoding="utf-8")

def ensure_dirs():
    DRAFTS.mkdir(parents=True, exist_ok=True)
    IMAGES.mkdir(parents=True, exist_ok=True)

def make_svg(title, slug):
    # Simple unique hero SVG with title text and random soft color
    colors = ["#f0efe9", "#eef2ec", "#fff5e6", "#e9f1ff", "#f1f9f1"]
    fill = random.choice(colors)
    svg = f"<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect width='100%' height='100%' fill='{fill}'/><text x='60' y='340' font-size='48' fill='#1f2937' font-family='Arial'>{title}</text></svg>"
    path = IMAGES / f"{slug}.svg"
    path.write_text(svg, encoding="utf-8")
    return f"/images/heroes/{slug}.svg"

def generate():
    ensure_dirs()
    existing_slugs = set([p.stem for p in DRAFTS.glob("*.md")])
    title, slug = pick_topic(existing_slugs)
    if not title:
        print("No new topics available.")
        return 0
    date = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()
    excerpt = f"{title} — practical, humane steps and product suggestions for dog owners."
    hero = make_svg(title, slug)

    sections = [load_tmpl(n) for n in mix_sections()]
    body = "\n\n".join(sections)

    fm = f"""---
title: "{title}"
date: "{date}"
excerpt: "{excerpt}"
hero: "{hero}"
keywords: ["dogs","training","puppy","pawsitive pup"]
meta_description: "{excerpt}"
---

{body}
"""
    (DRAFTS / f"{slug}.md").write_text(fm.strip() + "\n", encoding="utf-8")
    print(f"Draft created: drafts/{slug}.md with hero {hero}")
    return 1

if __name__ == "__main__":
    sys.exit(0 if generate() else 0)
