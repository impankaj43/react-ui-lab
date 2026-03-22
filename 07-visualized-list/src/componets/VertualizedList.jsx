import React, { useState } from "react";
import "../App.css";

function VertualizedList({ listItems, height = 300, itemHeight = 25 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHight = listItems.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleItemCount = Math.floor(height / itemHeight);
  const endIndex = startIndex + visibleItemCount + 2;
  const visibleListItems = listItems.slice(startIndex, endIndex);
  return (
    <div
      className="vertualized-list"
      style={{
        height: height,
      }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div
        style={{
          height: totalHight,
          position: "relative",
        }}
      >
        {visibleListItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              className="list-item"
              key={actualIndex}
              style={{
                position: "absolute",
                top: actualIndex * itemHeight,
                height: itemHeight,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VertualizedList;
