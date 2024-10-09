import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const BookContext = createContext()

export default function BookContextProvider({ children }) {
  const navigate = useNavigate()
  const [myBooks, setMyBooks] = useState([])
  const [notification, setNotification] = useState('')
  const [customBookChallenge, setCustomBookChallenge] = useState('')
  const [submittedValue, setSubmittedValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAddedBook, setSelectedAddedBook] = useState(null)
  const [modalData, setModalData] = useState(null)

  const addToMyBooks = (book) => {
    if (!book || !book.id) {
      console.error('Invalid book or missing id:', book)
      return null
    }
    setMyBooks((prevBooks) => {
      const isBookAlreadyAdded = prevBooks.some((b) => b.id === book.id)

      if (isBookAlreadyAdded) {
        console.warn(`Book with id ${book.id} is already in My Books.`)
        return prevBooks
      }
      const updatedBooks = [book, ...prevBooks]
      localStorage.setItem('myBooks', JSON.stringify(updatedBooks))

      return updatedBooks
    })

    console.log('MY BOOKS', myBooks)

    setNotification(`Added "${book.title}" to My Books!`)
    setSelectedAddedBook(book)

    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const removeFromMyBooks = (bookId) => {
    if (!bookId) {
      console.error('No bookId provided for removal')
      return
    }
    setMyBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.id !== bookId)
      localStorage.setItem('myBooks', JSON.stringify(updatedBooks))
      return updatedBooks
    })
    setModalData()
  }

  const handleCustomInputChange = (e) => {
    const value = e.target.value
    if (value === '' || (Number(value) >= 0 && Number(value) <= 500)) {
      setCustomBookChallenge(value)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()

      navigate('/home')
    }
  }

  const handleSubmit = () => {
    const valueToSubmit = customBookChallenge
    if (valueToSubmit) {
      setSubmittedValue(valueToSubmit)
      localStorage.setItem('numberOfBooksChallenge', valueToSubmit)
    }
  }

  const handleAddedBookClick = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem('myBooks')) || []

    const savedBookData = savedBooks.find(
      (savedBook) => savedBook.id === book.id,
    )

    setModalData({
      ...book,
      rating: savedBookData?.userRating || '',
      review: savedBookData?.review || '',
      readDate: savedBookData?.readDate || '',
    })
    setSelectedAddedBook(savedBookData)
    setIsModalOpen(true)
  }

  const handleModalSubmit = (details) => {
    console.log('Book details submitted:', details)
  }

  const bookCount = myBooks.length

  useEffect(() => {
    const savedBooks = localStorage.getItem('myBooks')
    if (savedBooks) {
      setMyBooks(JSON.parse(savedBooks))
    }
  }, [])

  useEffect(() => {
    const savedNumber = localStorage.getItem('numberOfBooksChallenge')
    if (savedNumber) {
      setSubmittedValue(savedNumber)
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
        handleCustomInputChange,
        customBookChallenge,
        handleKeyPress,
        submittedValue,
        setIsModalOpen,
        handleModalSubmit,
        isModalOpen,
        selectedAddedBook,
        handleAddedBookClick,
        modalData,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
