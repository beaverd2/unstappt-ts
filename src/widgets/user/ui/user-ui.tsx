import { Block } from 'shared/ui/block'
import { format } from 'date-fns'
import { User } from 'shared/types/data'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

type Props = {
  user: User
}

export const UserUi = ({ user }: Props) => {
  return (
    <Block className="col-span-2 flex-row gap-4">
      {user.avatar && (
        <Image alt="user avatar" className="h-20 w-20 rounded-full" src={user.avatar} width={80} height={80} />
      )}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col">
            <p>{user.firstName + ' ' + user.lastName}</p>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Total</p>
            <p className="font-semibold">{user.checkins}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Unique</p>
            <p className="font-semibold">{user.beers}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Joined {user.joinedDate && format(new Date(user.joinedDate), 'd MMM yyyy')}</p>
          <a target="_blank" rel="noopener noreferrer" href={'https://untappd.com/user/' + user.username}>
            <ChevronRightIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </Block>
  )
}
