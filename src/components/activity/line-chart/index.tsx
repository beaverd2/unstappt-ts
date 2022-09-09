import React from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {useBreakpointValue} from '@chakra-ui/media-query'
import {useChartData} from '../use-chart-data'
import {Beer} from 'shared/types/data'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ActivityProps {
  beers: Beer[]
  startDate: Date
  endDate: Date
}

export const LineChart = ({beers, startDate, endDate}: ActivityProps) => {
  const isMoible = useBreakpointValue({base: true, sm: false})
  const [labels, data] = useChartData(beers, startDate, endDate)
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
            grid: {display: false},
            ticks: {
              callback: function (val, index) {
                if (index === 0) {
                  return ''
                }
                if (index % 2 === 0) {
                  return this.getLabelForValue(index)
                }
                return ''
              },
            },
          },
          y: {max: Math.max.apply(null, data) + 1, ticks: {precision: 0}},
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
            pointRadius: (context) => (context.raw === 0 ? 0 : isMoible ? 2 : 3),
          },
        ],
      }}
    />
  )
}
