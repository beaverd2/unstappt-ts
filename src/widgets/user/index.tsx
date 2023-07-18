import {UserSkeleton} from './ui/user-skeleton'
import {UserUi} from './ui/user-ui'
import {User as UserType} from 'shared/types/data'
export {UserSkeleton} from './ui/user-skeleton'

type Props = {
  loading: boolean
  user: UserType
}

export const User = ({loading, user}: Props) => {
  return loading ? <UserSkeleton /> : <UserUi user={user} />
}
