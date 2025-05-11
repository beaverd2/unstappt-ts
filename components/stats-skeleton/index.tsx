import { ActivitySkeleton } from '@/components/activity/ui/activity-skeleton'
import { CheckinsPatternSkeleton } from '@/components/checkins-pattern/ui/checkins-pattern-skeleton'
import { CheckinsTableSkeleton } from '@/components/checkins-table/ui/checkins-table-skeleton'
import { ListsSkeleton } from '@/components/lists/ui/lists-skeleton'
import { RangePickerSkeleton } from '@/components/range-picker/ui/range-picker-skeleton'
import { SessionsTableSkeleton } from '@/components/sessions-table/ui/sessions-table-skeleton'
import { StatisticsSkeleton } from '@/components/statistics/ui/statistics-skeleton'

export const StatsSkeleton = () => {
  return (
    <>
      <RangePickerSkeleton />
      <StatisticsSkeleton />
      <ActivitySkeleton />
      <ListsSkeleton />
      <CheckinsPatternSkeleton />
      <SessionsTableSkeleton />
      <CheckinsTableSkeleton />
    </>
  )
}
