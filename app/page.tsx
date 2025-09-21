import PostCard from '@/components/PostCard'
import Newsletter from '@/components/Newsletter'
import AdSenseBox from '@/components/AdSense'
import { listPosts } from '@/lib/posts'

export default function Home() {
  const posts = listPosts().slice(0, 6)
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="card flex items-center gap-4">
          <img src="/images/puppy-hero.svg" alt="Happy puppy" className="w-32 h-32" />
          <div>
            <h1 className="text-2xl font-bold">Train. Care. Choose Better.</h1>
            <p className="text-gray-700">Actionable guides and honest product picks for every pup.</p>
          </div>
        </div>
        <AdSenseBox />
        <div className="grid gap-4">
          {posts.map((p:any) => <PostCard key={p.slug} post={p} />)}
        </div>
      </div>
      <div className="space-y-4">
        <Newsletter />
        <div className="card">
          <h3 className="font-semibold mb-2">Top Topics</h3>
          <ul className="text-sm list-disc ml-5">
            <li>New puppy training</li>
            <li>Nutrition & treats</li>
            <li>Beds, harnesses, toys</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
