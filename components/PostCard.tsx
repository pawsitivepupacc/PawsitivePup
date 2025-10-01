import Link from 'next/link'

function formatDate(dateString: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function PostCard({ post }: any) {
  return (
    <article className="card">
      <Link href={`/blog/${post.slug}`}>
        <h3 className="text-lg font-semibold">{post.data.title}</h3>
      </Link>
      <p className="text-sm text-gray-600">{post.data.excerpt}</p>
      <div className="mt-2 text-xs text-gray-500">
        Published: {formatDate(post.data.date)}
      </div>
    </article>
  )
}
