import React, { startTransition, useState } from "react";

function StarRating({ defaultRating, totalStarts, updateRating }) {
  const [hovered, setHovered] = useState(0);

  return (
    <>
      <h3>Rating: {defaultRating}</h3>
      {Array.from({ length: totalStarts }, (_, index) => {
        const starValue = index + 1;
        const color =
          hovered >= starValue || defaultRating >= starValue ? "gold" : "gray";
        return (
          <span
            key={index}
            style={{
              cursor: "pointer",
              color: `${color}`,
              fontSize: "38px",
              lineHeight: "40px",
              height: "40px",
            }}
            onClick={(e) => updateRating(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
          >
            *
          </span>
        );
      })}
    </>
  );
}

export default React.memo(StarRating);
