import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'posts')

function getAllMdFiles(): string[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => typeof f === 'string' && f.toLowerCase().endsWith('.md'))
}

export function listPosts() {
  const files = getAllMdFiles()

  const posts = files
    .map((file) => {
      const slug = path.basename(file, '.md')
      if (!slug) return null
      const full = path.join(postsDir, file)
      if (!fs.existsSync(full)) return null

      const src = fs.readFileSync(full, 'utf-8')
      const { data } = matter(src) // front-matter only
      return { slug, data }
    })
    .filter(Boolean) as Array<{ slug: string; data: any }>

  // newest first if dates exist
  return posts.sort((a, b) => {
    const ad = (a.data?.date as string) || ''
    const bd = (b.data?.date as string) || ''
    return ad < bd ? 1 : -1
  })
}

export async function getPost(slug: string) {
  if (!slug) throw new Error('Invalid slug')
  const full = path.join(postsDir, slug + '.md')
  if (!fs.existsSync(full)) throw new Error(`Post not found: ${slug}`)

  const src = fs.readFileSync(full, 'utf-8')
  const { data, content } = matter(src)
  const processed = await remark().use(html).process(content)
  const htmlStr = processed.toString()
  return { data, content: htmlStr }
}
