import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Star = ({ rating = 0 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (rating >= index + 1) {
      return (
        <span key={index} className="text-yellow-500 text-xl">
          <FaStar />
        </span>
      );
    } else if (rating >= index + 0.5) {
      return (
        <span key={index} className="text-yellow-500 text-xl">
          <FaStarHalfAlt />
        </span>
      );
    } else {
      return (
        <span key={index} className="text-gray-500 text-xl">
          <FaRegStar />
        </span>
      );
    }
  });
  return <div className="flex items-center gap-x-1">{stars}</div>;
};

export default Star;
