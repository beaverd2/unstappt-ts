import {Block} from 'shared/ui/block'
import {isValid, subDays} from 'date-fns'
import {Chart} from './ui/chart'
import {Beer} from 'shared/types/data'

const today = new Date()
const weekAgo = subDays(today, 7)

type Props = {
  loading: boolean
  beers: Beer[]
  startDate?: string
  endDate?: string
}

export const Activity = ({loading, beers, ...props}: Props) => {
  const startDate = props.startDate && isValid(new Date(props.startDate)) ? new Date(props.startDate) : weekAgo
  const endDate = props.endDate && isValid(new Date(props.endDate)) ? new Date(props.endDate) : today

  return (
    <Block className="col-span-2">
      <div className="mb-2 flex h-[42px] items-center justify-between">
        <p className="text-lg font-semibold">Activity</p>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="h-[250px] animate-pulse bg-gray-300"></div>
        ) : (
          <Chart beers={beers} startDate={startDate} endDate={endDate} />
        )}
      </div>
    </Block>
  )
}
