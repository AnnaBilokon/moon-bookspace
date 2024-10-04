import React from 'react'
import './Item.css'

export default function Item({ book, addToMyBooks }) {
  const { title, authors, imageLinks } = book.volumeInfo

  return (
    <div className="item">
      <li className="book-card" key={book.id}>
        <h3 className="book-title">{title}</h3>
        {authors && <p className="book-authors">{authors.join(', ')}</p>}
        {imageLinks?.thumbnail && (
          <img src={imageLinks.thumbnail} alt={title} className="book-image" />
        )}
        <button
          className="add-button"
          onClick={() => addToMyBooks(book.volumeInfo)}
        >
          Add to My Books
        </button>
      </li>
    </div>
  )
}
