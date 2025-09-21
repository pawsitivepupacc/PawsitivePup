import PostCard from '@/components/PostCard'
import { listPosts } from '@/lib/posts'

export const metadata = { title: 'Blog – Pawsitive Pup' }

export default function BlogPage() {
  const posts = listPosts()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Latest Articles</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((p:any) => <PostCard key={p.slug} post={p} />)}
      </div>
    </div>
  )
}
