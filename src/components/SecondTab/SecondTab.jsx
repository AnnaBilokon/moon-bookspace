import React, { useContext, useEffect, useState } from 'react'
import months from '../../monthsData.js'
import './SecondTab.css'
import { BookContext } from '../../store/book-context.jsx'

export default function SecondTab() {
  const [selectedMonth, setSelectedMonth] = useState('January')
  const [filteredBooks, setFilteredBooks] = useState([])

  const { myBooks } = useContext(BookContext)

  useEffect(() => {
    if (selectedMonth) {
      const booksInSelectedMonth = myBooks.filter((book) => {
        const bookMonth = book.readDate ? book.readDate.split('-')[1] : null
        return bookMonth === selectedMonth
      })
      setFilteredBooks(booksInSelectedMonth)
    } else {
      setFilteredBooks(myBooks)
    }
  }, [selectedMonth, myBooks])

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value)
  }

  return (
    <>
      <div>
        {/* <label className="modal-label">Genre:</label> */}
        <select
          className="input-month"
          id="genre"
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e)}
        >
          <option value="" disabled>
            -- Choose a genre --
          </option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <div className="month-info-container">
        <div className="month-info-boxes">
          <div className="number-of-books">Number of books</div>
          <div className="number-of-pages">pages</div>
        </div>
        <div className="month-best-book">
          <img src="" alt="best book" className="best-book-image" />
        </div>
      </div>
      <div>
        <h3>
          Books read in{' '}
          {selectedMonth && months.find((m) => m.value === selectedMonth)?.name}
        </h3>
        <ul className="month-book-all">
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <img
                src={
                  book.imageLinks?.thumbnail ||
                  'https://via.placeholder.com/128x193'
                }
                alt={book.title}
                className="secondtab-my-book-image"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
