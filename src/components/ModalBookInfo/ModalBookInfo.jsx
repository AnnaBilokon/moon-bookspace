import React, { useState, useContext, useEffect } from 'react'
import './ModalBookInfo.css'
import { BookContext } from '../../store/book-context'
import StarRating from '../StarRating/StarRating'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import genres from '../../genresData.js'

export default function ModalBookInfo() {
  const {
    setIsModalOpen,
    handleModalSubmit,
    isModalOpen,
    modalData,
    setMyBooks,
    toggleFavoriteBook,
    favoriteBooks,
  } = useContext(BookContext)

  const [review, setReview] = useState('')
  const [readDate, setReadDate] = useState('')
  const [userRating, setUserRating] = useState(0)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (modalData) {
      setReview(modalData.review || '')
      setReadDate(modalData.readDate || '')
      setUserRating(modalData.rating || 0)
      setSelectedGenre(modalData.selectedGenre || '')
    }
  }, [modalData])

  console.log('modal data', modalData)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleModalSubmit({ userRating, review, readDate, selectedGenre })
    setIsModalOpen(false)
  }

  if (!isModalOpen) return null

  const handleRatingChange = (rating) => {
    setUserRating(rating)
  }
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value)
    console.log('Selected Genre:', e.target.value)
  }

  const onSave = (e) => {
    e.preventDefault()

    const savedBooks = JSON.parse(localStorage.getItem('myBooks')) || []

    const updatedBooks = savedBooks.map((savedBook) => {
      if (savedBook.id === modalData.id) {
        return {
          ...savedBook,
          userRating,
          review,
          readDate,
          selectedGenre,
          favoriteBooks,
        }
      }
      return savedBook
    })
    localStorage.setItem('myBooks', JSON.stringify(updatedBooks))
    setMyBooks(updatedBooks)
    setIsModalOpen(false)
  }

  const description = modalData.description || ''
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
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Book details</h2>
          <div className="modal-info-section">
            <div className="modal-book-image">
              <img
                src={modalData.imageLinks?.thumbnail}
                alt={modalData.title}
              />
            </div>
            <div className="modal-book-titles">
              <p>
                <span className="title-style">Title:</span> {modalData.title}
              </p>
              <p>
                <span className="title-style">Author name: </span>{' '}
                {modalData.authors?.join(', ')}
              </p>
              <p>
                <span className="title-style">Pages:</span>{' '}
                {modalData.pageCount}
              </p>
              <p>
                <span className="title-style">Publishing Date:</span>{' '}
                {modalData.publishedDate}
              </p>
              <div
                className="favorite-icon"
                onClick={() => toggleFavoriteBook(modalData.id)}
              >
                {favoriteBooks.includes(modalData.id) ? (
                  <FaHeart style={{ color: 'red' }} />
                ) : (
                  <FaRegHeart />
                )}
              </div>
            </div>
          </div>
          <div className="description-section">
            <p>{displayedDescription}</p>
            <button className="expand-button" onClick={toggleExpanded}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-form">
              <div className="rating">
                <p className="modal-label">Rating:</p>
                <StarRating
                  totalStars={5}
                  userRating={userRating}
                  setUserRating={setUserRating}
                  onRatingChange={handleRatingChange}
                />
              </div>
              <div>
                <label className="modal-label">Genre:</label>
                <select
                  className="modal-input-genre"
                  id="genre"
                  value={selectedGenre}
                  onChange={(e) => handleGenreChange(e)}
                >
                  <option value="" disabled>
                    -- Choose a genre --
                  </option>
                  {genres.map((genre, index) => (
                    <option key={index} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="modal-label">Read:</label>
                <input
                  className="modal-input"
                  type="date"
                  value={readDate}
                  onChange={(e) => setReadDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="modal-label-textarea">Review:</label>
                <textarea
                  className="modal-textarea"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="button-container">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="save-btn" type="submit" onClick={onSave}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
