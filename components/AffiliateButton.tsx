export default function AffiliateButton({ href, children }: { href: string, children: any }) {
  // IMPORTANT: Replace AFFILIATE_TAG with your real affiliate IDs before going live.
  const aff = href.replace('AFFILIATE_TAG', 'yourtag-20')
  return (
    <a href={aff} target="_blank" rel="nofollow sponsored" className="inline-block bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm">
      {children}
    </a>
  )
}
