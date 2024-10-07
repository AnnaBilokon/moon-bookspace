import React, { useContext } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { BookContext } from '../../store/book-context'
import './BookChart.css'

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

export default function BookChart() {
  const { myBooks, submittedValue } = useContext(BookContext)
  console.log('SubmittedValue', submittedValue)

  // Count the number of books
  const bookCount = myBooks.length - 1

  // Set up data for the chart
  const data = {
    labels: ['Books I have read'],
    datasets: [
      {
        label: 'Books left to read',
        data: [bookCount, submittedValue - bookCount],
        backgroundColor: ['#4A539F', '#B26C96'], // Colors for doughnut
        hoverBackgroundColor: ['#1B1F24', '#FF6384'],
      },
    ],
  }

  const options = {
    cutout: '75%', // This controls the inner radius, making it a "doughnut" chart
    plugins: {
      legend: {
        display: false, // Hide the legend, you can turn it on if needed
      },
    },
  }

  return (
    <div className="chart-style">
      {/* <p className="chart-title">{`${bookCount} / ${submittedValue}`}</p> */}
      <Doughnut data={data} options={options} />
    </div>
  )
}
