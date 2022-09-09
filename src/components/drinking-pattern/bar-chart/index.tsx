import React from 'react'
import {Bar} from 'react-chartjs-2'
import {chartData} from '../use-chart-data'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  daysData: chartData
  hoursData: chartData
  filter: 'days' | 'hours'
}

export const BarChart = ({daysData, hoursData, filter}: BarChartProps) => {
  return (
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
          x: {grid: {display: false}},
          y: {
            max: filter === 'days' ? daysData.max : hoursData.max,
            ticks: {precision: 0},
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
  )
}
