// StarRating.js
import React, { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${rating >= value ? 'active' : ''}`}
          onClick={() => handleStarClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
