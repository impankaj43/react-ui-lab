import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import StarRating from "./componets/StarRating.jsx";

function App() {
  const [rating, setRating] = useState(0);

  const handleRating = useCallback((rating) => {
    setRating(rating);
  }, []);

  return (
    <div className="main">
      <h2>Star Rating Implementation</h2>
      <div className="progress-bar">
        <StarRating
          totalStarts={5}
          defaultRating={rating}
          updateRating={handleRating}
        />
      </div>
    </div>
  );
}

export default App;
