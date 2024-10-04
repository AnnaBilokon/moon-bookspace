import React from 'react'
import AddedBooks from '../components/AddedBooks/AddedBooks'
import BookContextProvider from '../store/book-context.jsx'
import Header from '../components/Header/Header.jsx'
import ChallengeSection from '../components/ChallengeSection/ChallengeSection.jsx'
import BookChart from '../components/BookChart/BookChart.jsx'
import './css/home.css'

export default function Home() {
  return (
    <>
      <BookContextProvider>
        <Header />
        <div className="challenge-section-results">
          <ChallengeSection />
          <BookChart />
        </div>
        <AddedBooks />
      </BookContextProvider>
    </>
  )
}
