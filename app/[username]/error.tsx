'use client'

import { useRouter } from 'next/navigation'
import { Block } from 'shared/ui/block'

export default function Error({ error }: { error: Error }) {
  const router = useRouter()

  return (
    <div className="col-span-2 flex items-center justify-center">
      <Block className="flex w-auto flex-col items-center justify-center gap-4 py-8">
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
        <p className="text-gray-600">{error.message}</p>
        <button
          onClick={() => router.replace('/')}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Return Home
        </button>
      </Block>
    </div>
  )
}
