export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-3">🎉 Thanks for subscribing!</h1>
      <p className="text-gray-600">
        You’re on the list! Check your inbox for our first email. 
        If you don’t see it, be sure to look in your spam or promotions tab.
      </p>
      <a
        href="/"
        className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Back to Home
      </a>
    </div>
  )
}
