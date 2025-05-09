import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl">Page Not Found</h2>
      <p className="text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-4 rounded-md bg-amber-400 px-4 py-2 text-black transition-colors hover:bg-amber-500">
        Go back home
      </Link>
    </div>
  )
}
