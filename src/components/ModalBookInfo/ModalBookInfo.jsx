import React, { useState, useContext, useEffect } from 'react'
import './ModalBookInfo.css'
import { BookContext } from '../../store/book-context'
import StarRating from '../StarRating/StarRating'

export default function ModalBookInfo() {
  const {
    setIsModalOpen,
    handleModalSubmit,
    isModalOpen,
    modalData,
  } = useContext(BookContext)

  const [review, setReview] = useState('')
  const [readDate, setReadDate] = useState('')
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    if (modalData) {
      setReview(modalData.review || '')
      setReadDate(modalData.readDate || '')
      setUserRating(modalData.rating || 0)
    }
  }, [modalData])

  console.log('modal data', modalData)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleModalSubmit({ userRating, review, readDate })
    setIsModalOpen(false)
  }

  if (!isModalOpen) return null

  const handleRatingChange = (rating) => {
    setUserRating(rating)
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
        }
      }
      return savedBook
    })

    localStorage.setItem('myBooks', JSON.stringify(updatedBooks))

    setIsModalOpen(false)
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Enter Book Details</h2>
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
                <span className="title-style">Genre:</span>{' '}
                {modalData.categories}
              </p>
              <p>
                <span className="title-style">Pages:</span>{' '}
                {modalData.pageCount}
              </p>
              <p>
                <span className="title-style">Publishing Date:</span>{' '}
                {modalData.publishedDate}
              </p>
            </div>
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
