import React, { useRef } from 'react'
import { useContext } from 'react'
import './AddedBooks.css'
import { BookContext } from '../../store/book-context.jsx'
import { Link } from 'react-router-dom'
import addImageBtn from '../../images/add-icon.png'
import arrowBack from '../../images/arrow-back.png'
import arrowForward from '../../images/arrow-forward.png'

export default function AddedBooks() {
  const { myBooks, removeFromMyBooks } = useContext(BookContext)
  const scrollContainerRef = useRef(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -150,
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: 150,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <h2 className="added-books-title">My Bookshelf</h2>
      <div className="my-books-wrapper">
        <Link to="/search">
          <div className="my-book-card add-new-book">
            <img src={addImageBtn} alt="add-icon" className="add-book-image" />
            <button className="add-button">Add</button>
          </div>
        </Link>
        <button className="scroll-button left" onClick={scrollLeft}>
          <img src={arrowBack} alt="arrow-back" />
        </button>
        <div className="my-books-container" ref={scrollContainerRef}>
          {myBooks.length > 0 ? (
            myBooks.map((book) => {
              if (!book) {
                console.warn('Book object is null or undefined')
                return null
              }
              return (
                <div key={book.id} className="my-book-card">
                  <img
                    src={
                      book.imageLinks?.thumbnail ||
                      'https://via.placeholder.com/128x193'
                    }
                    alt={book.title}
                    className="my-book-image"
                  />
                  <h3 className="my-book-title">{book.title}</h3>
                  <p className="my-book-authors">
                    Author: {book.authors?.join(', ')}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => removeFromMyBooks(book.id)}
                  >
                    Delete
                  </button>
                </div>
              )
            })
          ) : (
            <p className="my-book-title">No books saved yet.</p>
          )}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          <img src={arrowForward} alt="arrow-forward" />
        </button>
      </div>
    </>
  )
}
