import {getChartData} from '../lib'
import {Beer} from 'shared/types/data'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  beers: Beer[]
  type: 'days' | 'hours'
}

export const Chart = ({beers, type}: Props) => {
  const chartData = getChartData(beers)
  const selectedChartData = type === 'days' ? chartData.daysData : chartData.hoursData

  return (
    <Bar
      height={250}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {grid: {display: false}},
        },
      }}
      data={{
        labels: selectedChartData.labels,
        datasets: [
          {
            borderRadius: 4,
            label: 'Check-ins',
            data: selectedChartData.values,
            backgroundColor: '#FFBA2E',
          },
        ],
      }}
    />
  )
}
