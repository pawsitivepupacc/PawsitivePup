import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'posts')

export function listPosts() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(file => {
    const full = path.join(postsDir, file)
    const src = fs.readFileSync(full, 'utf-8')
    const { data } = matter(src)
    const slug = file.replace(/\.md$/, '')
    return { slug, data }
  })
  return posts.sort((a,b) => (a.data.date < b.data.date ? 1 : -1))
}

export async function getPost(slug: string) {
  const full = path.join(postsDir, slug + '.md')
  const src = fs.readFileSync(full, 'utf-8')
  const { data, content } = matter(src)
  const processed = await remark().use(html).process(content)
  const htmlStr = processed.toString()
  return { data, content: htmlStr }
}
