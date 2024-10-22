import React, { useContext } from 'react'
import { BookContext } from '../store/book-context'
import Header from '../components/Header/Header'
import './css/favorites.css'

export default function Favorites() {
  const { favoriteBooks, myBooks } = useContext(BookContext)
  console.log('FAVORITE', favoriteBooks)

  const favoriteBooksData = myBooks.filter((book) =>
    favoriteBooks.includes(book.id),
  )

  return (
    <div id="favorites-page">
      <Header />
      <div>
        <ul className="favorites-list">
          {favoriteBooksData.map((book) => (
            <li key={book.id}>
              <img
                src={
                  book.imageLinks?.thumbnail ||
                  'https://via.placeholder.com/128x193'
                }
                alt={book.title}
                className="favorite-book"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
