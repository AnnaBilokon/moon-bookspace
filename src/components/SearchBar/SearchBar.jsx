import React, { useState, useContext } from 'react'
import axios from 'axios'
import './SearchBar.css'
import Item from '../Item/Item'
import { BookContext } from '../../store/book-context'
import Notification from '../Notification//Notification.jsx'

export default function SearchBar() {
  const { addToMyBooks, notification, setNotification } = useContext(
    BookContext,
  )
  const [searchInput, setSearchInput] = useState('')
  const [booksData, setBooksData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    fetchBooks()
  }

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`,
      )
      setBooksData(response.data.items)
    } catch (err) {
      setError('Failed to fetch data. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="main-container">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            id="search-input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for books..."
            autoComplete="off"
            required
          />
          <button type="submit" id="search-button">
            Search
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div>
        {booksData && booksData.length > 0 && (
          <ul className="card-container">
            {booksData.map((book) => {
              return (
                <Item key={book.id} book={book} addToMyBooks={addToMyBooks} />
              )
            })}
          </ul>
        )}
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  )
}
