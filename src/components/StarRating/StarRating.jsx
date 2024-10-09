import React from 'react'
import './StarRating.css'

export default function StarRating({
  totalStars = 5,
  onRatingChange,
  userRating,
  setUserRating,
}) {
  const handleStarClick = (ratingValue) => {
    setUserRating(ratingValue)
    if (onRatingChange) {
      onRatingChange(ratingValue)
    }
  }

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={starValue}
            filled={starValue <= userRating ? 'filled' : ''}
            onClick={() => handleStarClick(starValue)}
          />
        )
      })}
    </div>
  )
}

const Star = ({ filled, onClick }) => {
  return (
    <span className={`star ${filled ? 'filled' : ''}`} onClick={onClick}>
      &#9733; {/* Unicode star symbol */}
    </span>
  )
}
