import { useContext } from 'react'
import './SelectBookChallenge.css'
import { BookContext } from '../../store/book-context'

export default function SelectBookChallenge() {
  const {
    handleCustomInputChange,
    customBookChallenge,
    handleKeyPress,
  } = useContext(BookContext)
  return (
    <div className="select-box-container">
      <h3>How many books would you like to read this year?</h3>
      <input
        id="books-input"
        type="number"
        value={customBookChallenge}
        onChange={handleCustomInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type or select"
        className="select-box"
      />
    </div>
  )
}
