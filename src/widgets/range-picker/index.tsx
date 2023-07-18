import { format, isValid, subDays } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ButtonInput } from './ui/button-input'
import { IconButton } from 'shared/ui/icon-button'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface DatePickerProps {
  loading: boolean
  startDate: string
  endDate: string
}

const today = new Date()
const weekAgo = subDays(today, 7)

export const RangePicker = (props: DatePickerProps) => {
  const startDate = useMemo(
    () => (props.startDate && isValid(new Date(props.startDate)) ? new Date(props.startDate) : weekAgo),
    [props.startDate]
  )
  const endDate = useMemo(
    () => (props.endDate && isValid(new Date(props.endDate)) ? new Date(props.endDate) : today),
    [props.endDate]
  )
  const [range, setRange] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate, endDate })
  const router = useRouter()

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setRange({ startDate: start, endDate: end })
    if (start && end) {
      router.push({
        query: { ...router.query, startDate: format(start, 'yyyy-MM-dd'), endDate: format(end, 'yyyy-MM-dd') },
      })
    }
  }
  useEffect(() => {
    if (startDate && endDate) {
      setRange({ startDate, endDate })
    }
  }, [startDate, endDate])

  return (
    <div className="col-span-2 mb-2 flex w-full">
      <DatePicker
        disabled={props.loading}
        maxDate={today}
        selected={range.startDate}
        onChange={onChange}
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
