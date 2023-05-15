import { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export default function StarRating({ rating }) {
    console.log(rating)
  const [filledStars, setFilledStars] = useState(Math.floor(rating));
  const [hasHalfStar, setHasHalfStar] = useState(rating % 1 !== 0);

  const handleStarClick = (index) => {
    if (index + 1 <= filledStars) {
      setFilledStars(index + 1);
      setHasHalfStar(false);
    } else if (index + 1 === filledStars + 1) {
      if (hasHalfStar) {
        setFilledStars(index);
        setHasHalfStar(false);
      } else {
        setFilledStars(index + 1);
        setHasHalfStar(true);
      }
    } else {
      setFilledStars(index + 1);
      setHasHalfStar(false);
    }
  };

  const renderStar = (index) => {
    if (index < filledStars) {
      return <BsStarFill key={index} className="text-warning" />;
    } else if (index === filledStars && hasHalfStar) {
      return <BsStarHalf key={index} />;
    } 
    else if (index === 0) {
        return <BsStarFill key={index} style={{color:"grey"}} />;
      }else {
      return <BsStar key={index} />;
    }
  };

  return (
    <div className="d-flex" style={{justifyContent:"center"}}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </div>
  );
}