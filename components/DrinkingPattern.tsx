import { Flex, Heading } from '@chakra-ui/layout';
import React, { memo, useState, useEffect } from 'react';
import { Select, Skeleton } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import { IBeers } from '../types/IBeers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DrinkingPatternProps {
  beers: IBeers[];
  isLoading: boolean;
}

type chartData = {
  labels: Array<string>;
  values: Array<number | null>;
  max: number;
};

const DrinkingPattern: React.FC<DrinkingPatternProps> = ({
  beers,
  isLoading,
}) => {
  const [filter, setFilter] = useState('days');
  const [daysData, setDaysData] = useState<chartData>({
    labels: [],
    values: [],
    max: 0,
  });
  const [hoursData, setHoursData] = useState<chartData>({
    labels: [],
    values: [],
    max: 0,
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setFilter('days');
    if (beers) {
      const daysOfWeek: {
        [index: string]: number | null;
      } = {
        Mon: null,
        Tue: null,
        Wed: null,
        Thu: null,
        Fri: null,
        Sat: null,
        Sun: null,
      };
      const hoursOfDay: {
        [index: string]: number | null;
      } = {
        '0:00': null,
        '1:00': null,
        '2:00': null,
        '3:00': null,
        '4:00': null,
        '5:00': null,
        '6:00': null,
        '7:00': null,
        '8:00': null,
        '9:00': null,
        '11:00': null,
        '12:00': null,
        '13:00': null,
        '14:00': null,
        '15:00': null,
        '16:00': null,
        '17:00': null,
        '18:00': null,
        '19:00': null,
        '20:00': null,
        '21:00': null,
        '22:00': null,
        '23:00': null,
      };

      const mapOfDays = beers
        .map((beer) => beer.recent_created_at.split(',')[0])
        .reduce(
          (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
          {} as {
            [index: string]: number;
          }
        );

      const mapOfHours = beers
        .map((beer) => dayjs(beer.recent_created_at).hour() + ':00')
        .reduce(
          (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
          {} as {
            [index: string]: number;
          }
        );

      Object.keys(mapOfDays).forEach((key, index) => {
        daysOfWeek[key] = mapOfDays[key];
      });

      Object.keys(mapOfHours).forEach((key, index) => {
        hoursOfDay[key] = mapOfHours[key];
      });

      setDaysData({
        labels: Object.keys(daysOfWeek),
        values: Object.values(daysOfWeek),
        max:
          Math.max(
            ...(Object.values(daysOfWeek).filter(
              (v) => v !== null
            ) as Array<number>)
          ) + 1,
      });
      setHoursData({
        labels: Object.keys(hoursOfDay),
        values: Object.values(hoursOfDay),
        max:
          Math.max(
            ...(Object.values(hoursOfDay).filter(
              (v) => v !== null
            ) as Array<number>)
          ) + 1,
      });
    }
  }, [beers]);

  return (
    <Flex
      bgColor='white'
      p={2}
      shadow='base'
      flexDirection='column'
      mx='auto'
      width='100%'
      marginTop={4}
      borderRadius='base'
    >
      <Flex justifyContent='space-between' alignItems='center' marginBottom={2}>
        <Heading size='sm'>Drinking Pattern</Heading>
        <Select
          maxW={24}
          size='xs'
          value={filter}
          onChange={handleSelect}
          variant='filled'
          disabled={isLoading}
        >
          <option value='days'>By Day</option>
          <option value='hours'>By Hour</option>
        </Select>
      </Flex>
      <Flex alignSelf='center' w='100%'>
        {beers && !isLoading && (
          <Bar
            height={250}
            options={{
              aspectRatio: 0,
              responsive: true,
              layout: {
                padding: 8,
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: { grid: { display: false } },
                y: {
                  max: filter === 'days' ? daysData.max : hoursData.max,
                  ticks: { precision: 0 },
                },
              },
            }}
            data={{
              labels: filter === 'days' ? daysData.labels : hoursData.labels,
              datasets: [
                {
                  borderRadius: 4,
                  label: 'Check-ins',
                  data: filter === 'days' ? daysData.values : hoursData.values,
                  backgroundColor: '#FFBA2E',
                },
              ],
            }}
          />
        )}
        {isLoading && <Skeleton height={40} width='100%' />}
      </Flex>
    </Flex>
  );
};

export default memo(DrinkingPattern);
