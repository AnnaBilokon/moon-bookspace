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
  const [modalSearchData, setModalSearchData] = useState(null)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [combinedBookData, setCombinedBookData] = useState([])
  const [favoriteBooks, setFavoriteBooks] = useState([])

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
      genre: savedBookData?.selectedGenre || '',
    })
    setSelectedAddedBook(savedBookData)
    setIsModalOpen(true)
  }

  const handleFoundBookClick = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem('myBooks')) || []

    const savedBookData = savedBooks.find(
      (savedBook) => savedBook.id === book.id,
    )

    setModalSearchData({
      ...book.volumeInfo,
      id: book.id,
      savedBookData,
    })
    setIsSearchModalOpen(true)
  }

  const handleModalSubmit = (details) => {
    console.log('Book details submitted:', details)
    setModalData((prevData) => ({
      ...prevData,
      rating: details.userRating,
      readDate: details.readDate,
      id: prevData.id,
    }))
  }
  const bookCount = myBooks.length

  const getCombinedBookData = (myBooks, modalData) => {
    if (!modalData) return myBooks

    return myBooks.map((book) => {
      if (book.id === modalData.id) {
        return {
          ...book,
          userRating: modalData.rating || book.userRating,
          readDate: modalData.readDate || book.readDate,
        }
      }
      return book
    })
  }

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem('favoriteBooks')) || []
    setFavoriteBooks(savedFavorites)
  }, [])

  //   useEffect(() => {
  //     localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks))
  //   }, [favoriteBooks])

  //   const toggleFavoriteBook = (bookId) => {
  //     setFavoriteBooks((prevFavorites) =>
  //       prevFavorites.includes(bookId)
  //         ? prevFavorites.filter((id) => id !== bookId)
  //         : [...prevFavorites, bookId],
  //     )
  //   }

  const toggleFavoriteBook = (bookId) => {
    setFavoriteBooks((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId]

      // Save the updated favorites to localStorage
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites))

      return updatedFavorites
    })
  }

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

  useEffect(() => {
    const combinedData = getCombinedBookData(myBooks, modalData)
    setCombinedBookData(combinedData)
    console.log('CONBINED BOOK DATA', combinedBookData)
  }, [myBooks, modalData])

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
        handleFoundBookClick,
        modalSearchData,
        isSearchModalOpen,
        setIsSearchModalOpen,
        getCombinedBookData,
        combinedBookData,
        toggleFavoriteBook,
        favoriteBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
