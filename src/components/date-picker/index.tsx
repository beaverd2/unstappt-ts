import {Button} from '@chakra-ui/button'
import {Flex} from '@chakra-ui/layout'
import {Skeleton} from '@chakra-ui/react'
import React, {useState, forwardRef, useEffect} from 'react'
import ReactDatepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerProps {
  fetchBeersForRange: (startDate: Date, endDate: Date) => Promise<void>
  isLoading: boolean
  startDate: Date
  endDate: Date
}

export const DatePicker = ({
  fetchBeersForRange,
  isLoading,
  startDate: startDateProp,
  endDate: endDateProp,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(startDateProp)
  const [endDate, setEndDate] = useState<Date | null>(endDateProp)
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    if (start && end) {
      fetchBeersForRange(start, end)
    }
  }
  useEffect(() => {
    if (startDateProp && endDateProp) {
      setStartDate(startDateProp)
      setEndDate(endDateProp)
    }
  }, [startDateProp, endDateProp])

  const CustomInput = forwardRef(({value, onClick}: {value?: any; onClick?: any}, ref: React.Ref<any>) => {
    return (
      <Button onClick={onClick} ref={ref} variant="outline" bg="white" width="100%">
        {value}
      </Button>
    )
  })

  CustomInput.displayName = 'CustomInput'

  return (
    <Flex mb={2}>
      {isLoading ? (
        <Skeleton height={8} width="100%" />
      ) : (
        <ReactDatepicker
          dateFormat="dd/MM/yyyy"
          closeOnScroll={true}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          selectsRange
          showPopperArrow={false}
          disabledKeyboardNavigation
          customInput={<CustomInput />}
        />
      )}
    </Flex>
  )
}
