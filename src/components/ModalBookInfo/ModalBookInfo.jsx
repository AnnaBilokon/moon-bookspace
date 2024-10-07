import React, { useContext } from 'react'
import './ModalBookInfo.css'
import { BookContext } from '../../store/book-context'

export default function ModalBookInfo() {
  const { setIsModalOpen, handleModalSubmit, isModalOpen, book } = useContext(
    BookContext,
  )
  const [rating, setRating] = React.useState('')
  const [review, setReview] = React.useState('')
  const [readDate, setReadDate] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleModalSubmit({ rating, review, readDate, book })
    setIsModalOpen(false) // Close the modal after submission
  }

  if (!isModalOpen) return null

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Enter Book Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Read Date:</label>
              <input
                type="date"
                value={readDate}
                onChange={(e) => setReadDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Rating:</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
              />
            </div>
            <div>
              <label>Review:</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
