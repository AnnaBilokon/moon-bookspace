import React, { useContext } from 'react'
import './Item.css'
import { BookContext } from '../../store/book-context'
import ModalSearchBookInfo from '../ModalSearchBookInfo/ModalSearchBookInfo'

export default function Item({ book, addToMyBooks }) {
  const { handleFoundBookClick, isSearchModalOpen } = useContext(BookContext)
  const { title, authors, imageLinks } = book.volumeInfo
  console.log('Book object:', { id: book.id, ...book.volumeInfo })

  return (
    <div className="item">
      <li className="book-card" key={book.id}>
        <h3 className="book-title">{title}</h3>
        {authors && <p className="book-authors">{authors.join(', ')}</p>}
        {imageLinks?.thumbnail && (
          <img
            src={imageLinks.thumbnail}
            alt={title}
            className="book-image"
            onClick={() => handleFoundBookClick(book)}
          />
        )}
        <button
          className="add-button"
          onClick={() => addToMyBooks({ id: book.id, ...book.volumeInfo })}
        >
          Add to My Books
        </button>
      </li>
      {isSearchModalOpen && <ModalSearchBookInfo />}
    </div>
  )
}
