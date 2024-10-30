import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookContext } from '../../store/book-context'
import './Book.css'
import Header from '../Header/Header'
import StarRating from '../StarRating/StarRating'

export default function Book() {
  const { id } = useParams()
  const { myBooks } = useContext(BookContext)
  const [isExpanded, setIsExpanded] = useState(false)

  const book = myBooks.find((book) => book.id === id)

  if (!book) {
    return <p>Book not found</p>
  }

  const description = book.description || ''
  const maxLength = 200
  const displayedDescription = isExpanded
    ? description
    : description.slice(0, maxLength) +
      (description.length > maxLength ? '...' : '')

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <Header />
      <div className="current-book-page">
        <div className="info-book-section">
          <div className="current-book-image">
            <img src={book.imageLinks?.thumbnail} alt={book.title} />
          </div>
          <div className="current-book-titles">
            <p className="current-book-title-style ">{book.title}</p>
            <p className="current-book-author-name">
              {' '}
              {book.authors?.join(', ')}
            </p>

            {/* <div
            className="favorite-icon"
            onClick={() => toggleFavoriteBook(modalData.id)}
          > */}
            {/* {favoriteBooks.includes(modalData.id) ? (
              <FaHeart style={{ color: 'red' }} /> // Filled heart for favorite
            ) : (
              <FaRegHeart /> // Outlined heart for non-favorite
            )} */}
          </div>
        </div>
        <div className="under-book-section">
          <StarRating
            totalStars={5}
            userRating={book.userRating}
            className="under-book-info-rating"
          />
          <p className="under-book-info-style">Pages: {book.pageCount}</p>
          <p className="under-book-info-style">
            Published: {book.publishedDate}
          </p>
          <p className="under-book-info-style">Genre: {book.selectedGenre}</p>
          <p className="under-book-info-style">Read: {book.readDate}</p>
        </div>
        <div className="synopsis-review-section">
          <div className="synopsis">
            <p>{displayedDescription}</p>
            <button className="expand-button" onClick={toggleExpanded}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <div className="review">Review</div>
        </div>
      </div>
    </>
  )
}
