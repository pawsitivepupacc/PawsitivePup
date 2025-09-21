// Force static generation for this route (required for next export)
export const dynamic = 'force-static'
export const dynamicParams = false
export const runtime = 'nodejs'

import { listPosts, getPost } from '@/lib/posts'
import AdSenseBox from '@/components/AdSense'

// Tell Next the list of slugs at build time
export function generateStaticParams() {
  const posts = listPosts()
  return posts.map((p: any) => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <article className="prose card">
      <h1>{post.data.title}</h1>
      <div className="text-sm text-gray-500">{post.data.date}</div>
      <img
        src={post.data.hero || '/images/puppy-hero.svg'}
        alt=""
        className="w-full rounded-xl my-4"
      />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="my-6">
        <AdSenseBox />
      </div>
    </article>
  )
}
