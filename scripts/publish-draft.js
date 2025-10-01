// scripts/publish-draft.js
// Moves ONE draft from /drafts to /posts.
// Ensures front-matter date exists and is not in the future (forces today if missing/future).

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = process.cwd();
const DRAFTS = path.join(ROOT, 'drafts');
const POSTS  = path.join(ROOT, 'posts');

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function isFuture(iso) {
  try { return new Date(iso) > new Date(); } catch { return false; }
}
function stripPreamble(s) {
  return s.replace(/^\uFEFF/, '').replace(/^\s*\n/, ''); // remove BOM + accidental leading blank
}
function pickOldestDraft() {
  if (!fs.existsSync(DRAFTS)) return null;
  const files = fs.readdirSync(DRAFTS)
    .filter(f => /\.mdx?$/i.test(f))
    // sort oldest file last-modified time first
    .sort((a,b) => fs.statSync(path.join(DRAFTS,a)).mtimeMs - fs.statSync(path.join(DRAFTS,b)).mtimeMs);
  return files[0] || null;
}

function run() {
  if (!fs.existsSync(DRAFTS) || !fs.readdirSync(DRAFTS).length) {
    console.log('No drafts found to publish.');
    process.exit(0);
  }
  if (!fs.existsSync(POSTS)) fs.mkdirSync(POSTS, { recursive: true });

  const name = pickOldestDraft();
  if (!name) {
    console.log('No drafts found to publish.');
    process.exit(0);
  }

  const from = path.join(DRAFTS, name);
  const to   = path.join(POSTS, name);

  const raw = stripPreamble(fs.readFileSync(from, 'utf8'));
  const file = matter(raw);

  // ensure date exists and is not in future
  const needsDate =
    !file.data?.date ||
    typeof file.data.date !== 'string' ||
    !file.data.date.trim() ||
    isFuture(file.data.date);

  if (needsDate) {
    file.data = { ...file.data, date: todayISO() };
  }

  const out = matter.stringify(file.content, file.data);
  fs.writeFileSync(to, out, 'utf8');
  fs.unlinkSync(from);

  console.log(`Published: ${name} → posts/  (date=${file.data.date})`);
}
run();
