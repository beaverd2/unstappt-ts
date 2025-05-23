import { format } from 'date-fns'
import { User as UserType } from '@/types/data'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
type Props = {
  user: UserType
}

export const User = ({ user }: Props) => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-row gap-4 pt-4">
        {user.avatar && (
          <Image alt="user avatar" className="h-20 w-20 rounded-full" src={user.avatar} width={80} height={80} />
        )}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col">
              <p>{user.firstName + ' ' + user.lastName}</p>
              <p className="text-sm text-muted-foreground">{user.username}</p>
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
            <p className="text-muted-foreground">
              Joined {user.joinedDate && format(new Date(user.joinedDate), 'd MMM yyyy')}
            </p>
            <a target="_blank" rel="noopener noreferrer" href={`https://untappd.com/user/${user.username}`}>
              <ExternalLink className="h-6 w-6" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
