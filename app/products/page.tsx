import AffiliateButton from '@/components/AffiliateButton'
export const metadata = { title: 'Products – Curated Picks' }

const items = [
  {
    title: 'Orthopedic Dog Bed',
    desc: 'Supportive memory foam bed for large breeds. Removable washable cover.',
    href: 'https://www.amazon.com/dp/B08XXXXXXX?tag=AFFILIATE_TAG'
  },
  {
    title: 'No-Pull Harness',
    desc: 'Front-clip design reduces pulling without choking. Multiple sizes.',
    href: 'https://www.amazon.com/dp/B07XXXXXXX?tag=AFFILIATE_TAG'
  },
  {
    title: 'Interactive Treat Puzzle',
    desc: 'Keeps pups mentally engaged and slows fast eaters.',
    href: 'https://www.amazon.com/dp/B0BXXXXXXX?tag=AFFILIATE_TAG'
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Curated Product Picks</h1>
      <p className="text-gray-700">We only recommend items that are well-made, widely loved by owners, and fairly priced.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="card flex flex-col">
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="text-sm text-gray-600 flex-1">{it.desc}</p>
            <div className="mt-3">
              <AffiliateButton href={it.href}>View on Amazon</AffiliateButton>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">As an Amazon Associate, we may earn from qualifying purchases.</p>
    </div>
  )
}
