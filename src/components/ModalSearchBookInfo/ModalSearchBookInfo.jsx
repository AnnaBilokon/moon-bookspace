import React, { useState, useContext } from 'react'
import './ModalSearchBookInfo.css'
import { BookContext } from '../../store/book-context'

export default function ModalSearchBookInfo() {
  const {
    isSearchModalOpen,
    modalSearchData,
    setIsSearchModalOpen,
  } = useContext(BookContext)
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isSearchModalOpen) return null

  const description = modalSearchData.description || ''
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
                src={modalSearchData.imageLinks?.thumbnail}
                alt={modalSearchData.title}
              />
            </div>
            <div className="modal-book-titles">
              <p>
                <span className="title-style">Title:</span>{' '}
                {modalSearchData.title}
              </p>
              <p>
                <span className="title-style">Author name: </span>{' '}
                {modalSearchData.authors?.join(', ')}
              </p>
              <p>
                <span className="title-style">Genre:</span>{' '}
                {modalSearchData.categories}
              </p>
              <p>
                <span className="title-style">Pages:</span>{' '}
                {modalSearchData.pageCount}
              </p>
              <p>
                <span className="title-style">Publishing Date:</span>{' '}
                {modalSearchData.publishedDate}
              </p>
            </div>
          </div>
          <div className="description-section">
            <p>{displayedDescription}</p>
            <button className="expand-button" onClick={toggleExpanded}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <button
            className="close-btn"
            type="button"
            onClick={() => setIsSearchModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}
