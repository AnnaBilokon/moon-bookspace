import React, { useContext, useState } from 'react'
import './Tabs.css'
import { BookContext } from '../../store/book-context'
import StarRating from '../StarRating/StarRating'
import ModalBookInfo from '../ModalBookInfo/ModalBookInfo'
import SecondTab from '../SecondTab/SecondTab'

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('tab1')

  const {
    handleAddedBookClick,
    removeFromMyBooks,
    combinedBookData,
    selectedAddedBook,
  } = useContext(BookContext)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="tabs">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1')}
        >
          Yearly
        </button>
        <button
          className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          Monthly
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <div className="my-books-list">
              {combinedBookData.length > 0 ? (
                combinedBookData.map((book) => {
                  if (!book) {
                    console.warn('Book object is null or undefined')
                    return null
                  }
                  return (
                    <div key={book.id} className="my-book-row">
                      <img
                        src={
                          book.imageLinks?.thumbnail ||
                          'https://via.placeholder.com/128x193'
                        }
                        alt={book.title}
                        className="tabs-my-book-image"
                      />
                      <div className="title-author-container">
                        <h3 className="tabs-my-book-title">{book.title}</h3>
                        <p className="tabs-my-book-authors">
                          {book.authors?.join(', ')}
                        </p>
                      </div>
                      <StarRating
                        totalStars={5}
                        userRating={book.userRating}
                        className="rating-position"
                      />
                      <div className="my-book-readDate-text">
                        {book.readDate ? book.readDate : 'no date yet'}
                      </div>
                      {/* <div
                className="favorite-icon"
                onClick={() => toggleFavoriteBook(book.id)}
              >
                {favoriteBooks.includes(modalData.id) ? (
                  <FaHeart style={{ color: 'red' }} /> // Filled heart for favorite
                ) : (
                  <FaRegHeart /> // Outlined heart for non-favorite
                )}
              </div> */}
                      <div>
                        <button
                          className="tabs-delete-btn"
                          onClick={() => removeFromMyBooks(book.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="tabs-edit-btn"
                          onClick={() => handleAddedBookClick(book)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="my-book-title">No books saved yet.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <SecondTab />
          </div>
        )}
      </div>
      <ModalBookInfo book={selectedAddedBook} />
    </div>
  )
}
