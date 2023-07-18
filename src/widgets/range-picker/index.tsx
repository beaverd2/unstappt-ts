import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ButtonInput } from './ui/button-input'
import { IconButton } from 'shared/ui/icon-button'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const today = new Date()

interface DatePickerProps {
  loading: boolean
  onChange: ({ startDate, endDate }: { startDate: Date; endDate: Date }) => void
  range: { startDate: Date; endDate: Date }
}

export const RangePicker = ({ loading, onChange, ...props }: DatePickerProps) => {
  const [range, setRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: props.range.startDate,
    endDate: props.range.endDate,
  })

  const handleRange = (date: [Date | null, Date | null]) => {
    const [start, end] = date
    setRange({ startDate: start, endDate: end })
    if (start && end) {
      onChange({ startDate: start, endDate: end })
    }
  }

  useEffect(() => {
    setRange({
      startDate: props.range.startDate,
      endDate: props.range.endDate,
    })
  }, [props.range])

  return (
    <div className="col-span-2 mb-2 flex w-full">
      <DatePicker
        disabled={loading}
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
