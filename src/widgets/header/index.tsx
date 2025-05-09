import Link from 'next/link'
import { SearchInput } from '@/widgets/search-input'

export const Header = () => {
  return (
    <div className="w-full bg-primary py-2 md:py-4">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4">
        <Link className="text-xl font-semibold md:text-4xl" href="/" passHref>
          Unstappt
        </Link>
        <SearchInput className="w-40 bg-white md:w-auto" />
      </div>
    </div>
  )
}
