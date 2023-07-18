import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getChartData } from '../lib'
import { Beer } from 'shared/types/data'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type Props = {
  beers: Beer[]
  startDate: Date
  endDate: Date
}

export const Chart = ({ beers, startDate, endDate }: Props) => {
  const chartData = getChartData({ beers, startDate, endDate })
  return (
    <Line
      height={250}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={{
        labels: chartData.labels,
        datasets: [
          {
            label: 'Check-ins',
            data: chartData.data,
            backgroundColor: '#FFBA2E',
            borderColor: '#FFBA2E',
            tension: 0.4,
          },
        ],
      }}
    />
  )
}
