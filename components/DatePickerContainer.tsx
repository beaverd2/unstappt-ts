import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useState, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// todo: переделать при поиске нового юзера дата не обнулсяется до последней за неделю

interface DatePickerContainerProps {
  fetchBeersForRange: (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ) => Promise<void>;
  isLoading: boolean;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

const DatePickerContainer: React.FC<DatePickerContainerProps> = ({
  fetchBeersForRange,
  isLoading,
  startDate: startDateProp,
  endDate: endDateProp,
}) => {
  const [startDate, setStartDate] = useState(startDateProp);
  const [endDate, setEndDate] = useState(endDateProp);
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      fetchBeersForRange(start, end);
    }
  };
  useEffect(() => {
    if (startDateProp && endDateProp) {
      setStartDate(startDateProp);
      setEndDate(endDateProp);
    }
  }, [startDateProp, endDateProp]);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={onClick}
      ref={ref}
      variant='outline'
      bg='white'
      width='100%'
    >
      {value}
    </Button>
  ));

  return (
    <Flex mb={2}>
      {isLoading ? (
        <Skeleton height={8} width='100%' />
      ) : (
        <DatePicker
          dateFormat='dd/MM/yyyy'
          closeOnScroll={true}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          selectsRange
          openToDate={endDate}
          customInput={<ExampleCustomInput />}
        />
      )}
    </Flex>
  );
};

export default DatePickerContainer;
