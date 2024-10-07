import SelectBookChallenge from '../components/SelectBooksChallenge/SelectBookChallenge'
import StartHeader from '../components/StartHeader/StartHeader'
import BookContextProvider from '../store/book-context'
import './css/startPage.css'

export default function StartPage() {
  return (
    <div id="start-page">
      <StartHeader />
      <BookContextProvider>
        <SelectBookChallenge />
      </BookContextProvider>
    </div>
  )
}
