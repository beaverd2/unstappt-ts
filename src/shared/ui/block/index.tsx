import {ReactNode} from 'react'
import {cn} from 'shared/lib/utils'

type Props = {
  className?: string
  children: ReactNode
}

export const Block = ({className, children}: Props) => {
  return <div className={cn('flex w-full flex-col rounded-md bg-white p-2 shadow-md', className)}>{children}</div>
}
