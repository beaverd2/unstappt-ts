import Link from 'next/link'
import { SearchInput } from '@/components/search-input'
import { ThemeToggle } from '@/components/theme-toggle'

export const Header = () => {
  return (
    <div className="w-full border-b border-border py-2 md:py-4">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4">
        <Link className="text-2xl font-semibold text-primary md:text-4xl" href="/" passHref>
          Unstappt
        </Link>
        <div className="flex items-center gap-4">
          <SearchInput className="w-40 bg-background md:w-auto" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
