'use client'
import { format } from 'date-fns'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRangeQuery } from '@/hooks/use-range-query'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

const today = new Date()

export const RangePicker = () => {
  const { startDate, endDate } = useRangeQuery()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [range, setRange] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  })

  const handleSelect = (date: DateRange | undefined) => {
    setRange(date)
    if (date?.from && date?.to) {
      const startDate = format(date.from, 'yyyy-MM-dd')
      const endDate = format(date.to, 'yyyy-MM-dd')
      router.push(`${pathname}?startDate=${startDate}&endDate=${endDate}`)
      setOpen(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      setRange({ from: startDate, to: endDate })
    }
  }

  return (
    <div className="mb-2 flex w-full">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-center py-4 text-center text-base font-normal',
              !range?.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range?.to ? (
                <>
                  {format(range.from, 'd MMMM yyyy')} - {format(range.to, 'd MMMM yyyy')}
                </>
              ) : (
                <>{format(range.from, 'd MMMM yyyy')} - </>
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={handleSelect}
            disabled={{ after: today }}
            fromDate={new Date(0)}
            toDate={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
