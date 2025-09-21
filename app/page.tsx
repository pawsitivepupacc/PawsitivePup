import PostCard from '@/components/PostCard'
import Newsletter from '@/components/Newsletter'
import AdSenseBox from '@/components/AdSense'
import { listPosts } from '@/lib/posts'

export default function Home() {
  const posts = listPosts().filter((p) => p && p.slug)

  return (
    <div className="grid gap-8">
      {posts.slice(0, 3).map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
      <Newsletter />
      <AdSenseBox />
    </div>
  )
}
