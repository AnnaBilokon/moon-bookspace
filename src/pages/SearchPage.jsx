import Header from '../components/Header/Header.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import BookContextProvider from '../store/book-context.jsx'
import './css/searchPage.css'

export default function SearchPage() {
  return (
    <div id="search-page">
      <BookContextProvider>
        <Header />
        <SearchBar />
      </BookContextProvider>
    </div>
  )
}
