import React, { useContext, useEffect, useState } from 'react'
import months from '../../monthsData.js'
import './SecondTab.css'
import { BookContext } from '../../store/book-context.jsx'

export default function SecondTab() {
  const currentMonthIndex = new Date().getMonth()
  const currentMonthName = months[currentMonthIndex].name

  const [selectedMonth, setSelectedMonth] = useState(currentMonthName)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [bestMonthsBook, setBestMonthsBook] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  const { myBooks } = useContext(BookContext)

  console.log('My Books:', myBooks)

  useEffect(() => {
    if (selectedMonth) {
      const booksInSelectedMonth = myBooks.filter((book) => {
        // Check if the book has a readDate
        if (book.readDate) {
          const bookMonth = book.readDate.split('-')[1] // Assuming format is YYYY-MM-DD
          return bookMonth === selectedMonth // Convert to month name
        }
        return false // Exclude if no readDate
      })

      setFilteredBooks(booksInSelectedMonth)

      // Calculate total pages
      const pagesSum = booksInSelectedMonth.reduce((sum, book) => {
        return sum + (book.pageCount || 0) // Add book pages, default to 0 if not defined
      }, 0)
      setTotalPages(pagesSum) // Update the total pages state
    } else {
      setFilteredBooks(myBooks)
      setTotalPages(0) // Reset total pages if no month is selected
    }

    const savedBestBook = localStorage.getItem(`bestBook-${selectedMonth}`)
    if (savedBestBook) {
      setBestMonthsBook(JSON.parse(savedBestBook))
    } else {
      setBestMonthsBook(null) // Clear if no best book is saved for this month
    }
  }, [selectedMonth, myBooks])

  //   useEffect(() => {
  //     if (selectedMonth) {
  //       const booksInSelectedMonth = myBooks.filter((book) => {
  //         const bookMonth = book.readDate ? book.readDate.split('-')[1] : null
  //         return bookMonth === selectedMonth
  //       })
  //       setFilteredBooks(booksInSelectedMonth)
  //     } else {
  //       setFilteredBooks(myBooks)
  //     }

  //     const savedBestBook = localStorage.getItem(`bestBook-${selectedMonth}`)
  //     if (savedBestBook) {
  //       setBestMonthsBook(JSON.parse(savedBestBook))
  //     } else {
  //       setBestMonthsBook(null) // Clear if no best book is saved for this month
  //     }
  //   }, [selectedMonth, myBooks])

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value)
  }

  const handleBestBookChange = (e) => {
    const selectedBookTitle = e.target.value
    const selectedBook = filteredBooks.find(
      (book) => book.title === selectedBookTitle,
    )
    setBestMonthsBook(selectedBook) // Set the whole book object

    localStorage.setItem(
      `bestBook-${selectedMonth}`,
      JSON.stringify(selectedBook),
    )
  }

  const amountReadBooks = filteredBooks.length

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
          {/* <option value="" disabled>
            -- Choose a genre --
          </option> */}
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <div className="month-info-container">
        <div className="month-info-boxes">
          <div className="info-box">
            <p>BOOKS</p>
            <p className="total-number">{amountReadBooks}</p>
          </div>
          <div className="info-box">
            <p>PAGES</p>
            <p className="total-number">{totalPages}</p>
          </div>
        </div>
        <div className="month-best-book">
          <h3 className="best-book-section-title"> Best Book of the month</h3>
          {bestMonthsBook ? (
            <img
              src={
                bestMonthsBook.imageLinks?.thumbnail ||
                'https://via.placeholder.com/128x193'
              }
              alt={bestMonthsBook.title}
              className="best-book-image"
            />
          ) : (
            <p>Select a book to display its cover</p>
          )}
          <select
            className="select-months-book"
            id="best-book"
            value={bestMonthsBook?.title || ''}
            onChange={handleBestBookChange}
          >
            <option value="" disabled>
              Select the best book
            </option>
            {filteredBooks.map((book) => (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h3 className="list-books-title">
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
