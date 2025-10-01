// scripts/sanitize-markdown.js
// Usage: node scripts/sanitize-markdown.js drafts  (or posts)

const fs = require('fs');
const path = require('path');

const DIR = process.argv[2] || 'drafts';
const ROOT = process.cwd();
const TARGET = path.join(ROOT, DIR);

const AFFILIATE_PATTERNS = [
  /amazon\.[^ \)]*?/i,
  /tag=[^&\s)]+/i,
  /amzn\.to/i,
  /shareasale\.com/i,
  /impactradius\.com/i,
  /cj\.com/i,
  /ref=[^&\s)]+/i,
];

const SECTION_HEADINGS = [
  /^recommended tools/i,
  /^recommended products/i,
  /^affiliate/i,
  /^product picks/i,
];

function scrubLinks(md) {
  // remove lines that contain obvious affiliate links
  const lines = md.split('\n').filter(line => {
    const hasAff = AFFILIATE_PATTERNS.some(rx => rx.test(line));
    return !hasAff;
  });

  // remove affiliate/product sections (heading + following bullet block)
  let out = [];
  let skip = false;
  let skipCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];

    if (/^#{1,6}\s+/.test(L)) {
      const headText = L.replace(/^#{1,6}\s+/, '').trim();
      if (SECTION_HEADINGS.some(rx => rx.test(headText))) {
        skip = true;
        skipCount = 0;
        continue;
      }
    }
    if (skip) {
      // stop skipping when we exit bullet/paragraph block or hit next heading/blank group end
      if (/^#{1,6}\s+/.test(L) || (!L.trim() && skipCount > 0)) {
        skip = false; // new heading or blank after block
      } else {
        // keep skipping bullets/paragraphs under the section
        skipCount++;
        continue;
      }
    }
    out.push(L);
  }

  return out.join('\n');
}

function run() {
  if (!fs.existsSync(TARGET)) return;
  const files = fs.readdirSync(TARGET).filter(f => /\.mdx?$/i.test(f));
  files.forEach(file => {
    const full = path.join(TARGET, file);
    const original = fs.readFileSync(full, 'utf8');
    const cleaned = scrubLinks(original);
    if (cleaned !== original) {
      fs.writeFileSync(full, cleaned, 'utf8');
      console.log(`Sanitized: ${DIR}/${file}`);
    }
  });
}
run();
