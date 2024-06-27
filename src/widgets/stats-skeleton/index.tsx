import { ActivitySkeleton } from 'widgets/activity/ui/activity-skeleton'
import { CheckinsPatternSkeleton } from 'widgets/checkins-pattern/ui/checkins-pattern-skeleton'
import { CheckinsTableSkeleton } from 'widgets/checkins-table/ui/checkins-table-skeleton'
import { ListsSkeleton } from 'widgets/lists/ui/lists-skeleton'
import { RangePickerSkeleton } from 'widgets/range-picker/ui/range-picker-skeleton'
import { SessionsTableSkeleton } from 'widgets/sessions-table/ui/sessions-table-skeleton'
import { StatisticsSkeleton } from 'widgets/statistics/ui/statistics-skeleton'

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
