import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Pawsitive Pup – Dog Training & Product Guides',
  description: 'Helping dog owners train, care, and choose the best for their pups.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow-sm">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/logo.svg" className="h-8 w-8" alt="Pawsitive Pup logo" />
              <span className="text-xl font-bold">Pawsitive Pup</span>
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/blog">Blog</Link>
              <Link href="/products">Products</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="mt-12 border-t">
          <div className="container py-6 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <img src="/images/logo.svg" className="h-5 w-5" alt="Pawsitive Pup logo" />
              <span>© {new Date().getFullYear()} Pawsitive Pup</span>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy">Privacy</Link>
              <Link href="/robots.txt">Robots</Link>
              <Link href="/sitemap.xml">Sitemap</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
