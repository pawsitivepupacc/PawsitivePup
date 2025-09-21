import { listPosts, getPost } from '@/lib/posts'
import AdSenseBox from '@/components/AdSense'

// Tell Next "all params are known at build"
export const dynamicParams = false

// Pre-generate all blog slugs for static export
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
      <img src={post.data.hero || '/images/puppy-hero.svg'} alt="" className="w-full rounded-xl my-4" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="my-6">
        <AdSenseBox />
      </div>
    </article>
  )
}
