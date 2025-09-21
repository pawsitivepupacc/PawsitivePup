'use client';

export default function Newsletter() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Free Guide: 10 Puppy Training Tips</h3>
      <p className="text-sm text-gray-600">
        Join our list to get weekly training tips and product picks.
      </p>

      <form
        action="https://assets.mailerlite.com/jsonp/1809886/forms/166195735117694525/subscribe"
        method="post"
        target="_blank"
        className="mt-3 flex gap-2"
      >
        <input
          type="email"
          name="fields[email]"
          placeholder="you@example.com"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {/* MailerLite expects these hidden fields */}
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Subscribe
        </button>
      </form>

      <p className="mt-2 text-xs text-gray-500">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
}
