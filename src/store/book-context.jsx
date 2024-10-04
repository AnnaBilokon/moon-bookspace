import React, { createContext, useState, useEffect } from 'react'

export const BookContext = createContext()

export default function BookContextProvider({ children }) {
  const [myBooks, setMyBooks] = useState([])
  const [notification, setNotification] = useState('')

  const addToMyBooks = (book) => {
    // if (!book || !book.id) {
    //   console.error('Invalid book:', book)
    //   return
    // }

    // console.log('Adding book:', book)

    setMyBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, book]
      localStorage.setItem('myBooks', JSON.stringify(updatedBooks))
      return updatedBooks
    })
    setNotification(`Added "${book.title}" to My Books!`)

    setTimeout(() => {
      setNotification('')
    }, 3000)

    // const existingBook = myBooks.find((b) => b.id === book.id)
    // if (!existingBook) {
    //   setMyBooks([...myBooks, book])
    //   // Optionally, save to localStorage for persistence
    //   localStorage.setItem('myBooks', JSON.stringify([...myBooks, book]))
    // } else {
    //   alert('This book is already in your collection.')
    // }
  }

  const removeFromMyBooks = (bookId) => {
    setMyBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.id !== bookId)
      localStorage.setItem('myBooks', JSON.stringify(updatedBooks))
      return updatedBooks
    })
  }

  //   const removeFromMyBooks = (bookId) => {
  //     const updatedBooks = myBooks.filter((book) => book.id !== bookId)
  //     setMyBooks(updatedBooks)
  //     // Update local storage
  //     localStorage.setItem('myBooks', JSON.stringify(updatedBooks))
  //   }

  const bookCount = myBooks.length

  useEffect(() => {
    const savedBooks = localStorage.getItem('myBooks')
    if (savedBooks) {
      setMyBooks(JSON.parse(savedBooks))
    }
  }, [])

  return (
    <BookContext.Provider
      value={{
        myBooks,
        setMyBooks,
        addToMyBooks,
        removeFromMyBooks,
        notification,
        setNotification,
        bookCount,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
