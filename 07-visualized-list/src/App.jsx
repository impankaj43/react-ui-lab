import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import VertualizedList from "./componets/VertualizedList";

function App() {
  const listItems = Array.from(
    { length: 1000 },
    (element, index) => `${index + 1}. This is list item`,
  );
  return (
    <div className="main">
      <h2>Vertualized List (Windowing)</h2>
      <VertualizedList listItems={listItems} />
    </div>
  );
}

export default App;
