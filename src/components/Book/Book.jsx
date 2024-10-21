import React, { useContext } from 'react'
import { BookContext } from '../../store/book-context'

export default function Book() {
  const { modalData } = useContext(BookContext)
  return (
    <>
      <div className="modal-info-section">
        <div className="modal-book-image">
          <img src={modalData.imageLinks?.thumbnail} alt={modalData.title} />
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
            <span className="title-style">Pages:</span> {modalData.pageCount}
          </p>
          <p>
            <span className="title-style">Publishing Date:</span>{' '}
            {modalData.publishedDate}
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
    </>
  )
}
