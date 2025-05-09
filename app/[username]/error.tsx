'use client'

import Link from 'next/link'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Error</h1>
      <h2 className="text-xl">Something went wrong!</h2>
      <p className="text-gray-600">{error.message || 'Unknown error'}</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Go back home
      </Link>
    </div>
  )
}
