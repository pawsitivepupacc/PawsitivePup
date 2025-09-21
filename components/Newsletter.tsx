export default function Newsletter() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Free Guide: 10 Puppy Training Tips</h3>
      <p className="text-sm text-gray-600">Join our list to get weekly training tips and product picks.</p>
      {/* Replace action with your Formspree endpoint or similar no-backend form handler */}
      <form action="https://formspree.io/f/your-form-id" method="POST" className="mt-3 flex gap-2">
        <input name="email" type="email" required placeholder="you@example.com" className="border rounded-xl px-3 py-2 flex-1" />
        <button className="bg-[var(--accent)] text-white px-4 py-2 rounded-xl">Subscribe</button>
      </form>
      <p className="mt-2 text-xs text-gray-500">We respect your privacy. Unsubscribe anytime.</p>
    </div>
  )
}
