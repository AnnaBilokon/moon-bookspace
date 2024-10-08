import React, { useState } from 'react'
import './StarRating.css'

export default function StarRating({ totalStars = 5, onRatingChange }) {
  const [rating, setRating] = useState(0)

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue) // Update the local rating state
    if (onRatingChange) {
      onRatingChange(ratingValue) // If there's a parent callback, call it
    }
  }

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={starValue}
            filled={starValue <= rating}
            onClick={() => handleStarClick(starValue)}
          />
        )
      })}
    </div>
  )
}

// Individual star component
const Star = ({ filled, onClick }) => {
  return (
    <span className={`star ${filled ? 'filled' : ''}`} onClick={onClick}>
      &#9733; {/* Unicode star symbol */}
    </span>
  )
}
