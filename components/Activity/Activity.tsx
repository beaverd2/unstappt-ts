import dayjs from 'dayjs';
import React, { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { IBeers } from '../../types/IBeers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityProps {
  beers: IBeers[];
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}
type datasetType = { [key: string]: number };

const Activity: React.FC<ActivityProps> = ({ beers, startDate, endDate }) => {
  const isMoible = useBreakpointValue({ base: true, sm: false });

  const getDatesBetweenDates = (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ) => {
    let dates: Date[] = [];
    const theDate = new Date(dayjs(startDate).toDate());
    while (theDate < dayjs(endDate).toDate()) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, dayjs(endDate).toDate()];
    return dates;
  };

  const dataset: datasetType = {};
  getDatesBetweenDates(startDate, endDate)
    .map((date) => dayjs(date).format('DD/MM/YYYY'))
    .forEach((date) => (dataset[date] = 0));
  const mapOfDates = beers
    .map((beer) => dayjs(beer.recent_created_at).format('DD/MM/YYYY'))
    .reduce(
      (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
      {} as datasetType
    );

  Object.keys(mapOfDates).map((key, index) => {
    dataset[key] = mapOfDates[key];
  });
  const labels = Object.keys(dataset);
  const data = Object.values(dataset);

  return (
    <Line
      height={250}
      options={{
        aspectRatio: 0,
        responsive: true,
        layout: {
          padding: {
            top: 8,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              callback: function (val, index) {
                if (index === 0) {
                  return '';
                }
                if (index % 2 === 0) {
                  return this.getLabelForValue(index);
                }
                return '';
              },
            },
          },
          y: { max: Math.max.apply(null, data) + 1, ticks: { precision: 0 } },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Check-ins',
            data: data,
            backgroundColor: '#FFBA2E',
            borderColor: '#FFBA2E',
            borderWidth: isMoible ? 1 : 3,
            tension: 0.4,
            pointRadius: (context) =>
              context.raw === 0 ? 0 : isMoible ? 2 : 3,
          },
        ],
      }}
    />
  );
};

export default memo(Activity);
