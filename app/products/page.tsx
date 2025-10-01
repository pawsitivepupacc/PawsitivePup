import AffiliateButton from '@/components/AffiliateButton'
export const metadata = { title: 'Products – Curated Picks' }



export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Coming soon</h1>
      <p className="text-gray-700">Coming soon</p>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.title} className="card flex flex-col">
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="text-sm text-gray-600 flex-1">{it.desc}</p>
            <div className="mt-3">
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
