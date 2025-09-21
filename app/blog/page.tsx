import PostCard from '@/components/PostCard'
import { listPosts } from '@/lib/posts'

export default function BlogPage() {
  const posts = listPosts().filter((p) => p && p.slug) // skip invalid

  if (!posts.length) {
    return <div className="text-center py-20">No posts found.</div>
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
