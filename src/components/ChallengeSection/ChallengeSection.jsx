import React, { useContext } from 'react'
import './ChallengeSection.css'
import BookChart from '../BookChart/BookChart'
import { BookContext } from '../../store/book-context'

export default function ChallengeSection() {
  const { submittedValue, myBooks } = useContext(BookContext)

  const bookCount = myBooks.length
  return (
    <div className="challenge-section">
      <div className="challenge-title">
        <h1>
          Book Challenge{' '}
          <span style={{ color: '#5452D1', fontWeight: 'bold' }}>2024</span>{' '}
        </h1>
        <h2>Read for pleasure</h2>
      </div>
      <div className="chart-position">
        <BookChart />
      </div>
      <div className="results-container">
        <p className="results-title">
          <span className="book-count">{bookCount} </span>of {submittedValue}{' '}
          books
        </p>
        <p className="results-title">
          Still {submittedValue - bookCount} books left
        </p>
        <p className="results-motivation">Keep reading! You can do it! </p>
      </div>
    </div>
  )
}
