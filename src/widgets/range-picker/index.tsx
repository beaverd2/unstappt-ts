'use client'
import { format } from 'date-fns'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ButtonInput } from './ui/button-input'
import { IconButton } from 'shared/ui/icon-button'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { useRangeQuery } from 'shared/lib/use-range-query'

const today = new Date()

export const RangePicker = () => {
  const { startDate, endDate } = useRangeQuery()
  const pathname = usePathname()
  const router = useRouter()

  const [range, setRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: startDate,
    endDate: endDate,
  })

  const handleRange = (date: [Date | null, Date | null]) => {
    const [start, end] = date
    setRange({ startDate: start, endDate: end })
    if (start && end) {
      const startDate = format(start, 'yyyy-MM-dd')
      const endDate = format(end, 'yyyy-MM-dd')
      router.push(`${pathname}?startDate=${startDate}&endDate=${endDate}`)
    }
  }

  return (
    <div className="mb-2 flex w-full">
      <DatePicker
        maxDate={today}
        selected={range.startDate}
        onChange={(date) => handleRange(date)}
        startDate={range.startDate}
        endDate={range.endDate}
        dateFormat="d MMMM yyyy"
        showPopperArrow={false}
        selectsRange
        popperPlacement="bottom"
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          },
        ]}
        customInput={<ButtonInput />}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-lg font-bold text-gray-700">{format(date, 'LLLL yyyy')}</span>
            <div className="flex gap-2">
              <IconButton
                type="button"
                size="sm"
                variant="secondary"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                icon={<ChevronLeftIcon className="h-5 w-5 text-gray-600" />}
              />

              <IconButton
                type="button"
                size="sm"
                variant="secondary"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                icon={<ChevronRightIcon className="h-5 w-5 text-gray-600" />}
              />
            </div>
          </div>
        )}
      />
    </div>
  )
}
