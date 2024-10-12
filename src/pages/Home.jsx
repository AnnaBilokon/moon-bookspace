import React from 'react'
// import AddedBooks from '../components/AddedBooks/AddedBooks'
import BookContextProvider from '../store/book-context.jsx'
import Header from '../components/Header/Header.jsx'
import ChallengeSection from '../components/ChallengeSection/ChallengeSection.jsx'
import './css/home.css'
import Tabs from '../components/Tabs/Tabs.jsx'

export default function Home() {
  return (
    <>
      <BookContextProvider>
        <Header />
        <div>
          <ChallengeSection />
        </div>
        {/* <AddedBooks /> */}
        <Tabs />
      </BookContextProvider>
    </>
  )
}
