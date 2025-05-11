import { isValid, subDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'

const today = new Date()
const weekAgo = subDays(today, 7)

export const useRangeQuery = () => {
  const searchParams = useSearchParams()
  const startDateQuery = searchParams.get('startDate')?.toString()
  const endDateQuery = searchParams.get('endDate')?.toString()

  const startDate = startDateQuery && isValid(new Date(startDateQuery)) ? new Date(startDateQuery) : weekAgo
  const endDate = endDateQuery && isValid(new Date(endDateQuery)) ? new Date(endDateQuery) : today

  return { startDate, endDate }
}
