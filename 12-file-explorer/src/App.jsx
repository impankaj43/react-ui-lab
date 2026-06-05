import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import FileExplorer from "./componets/FileExplorer";

function App() {
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="main">
      <h2>File Explorer / Nested Tree Implementation</h2>
      <div className="file-explorer-container">
        <button onClick={() => setExpandAll((prev) => !prev)}>
          {expandAll ? "Collaps All" : "Expand All"}
        </button>
        <FileExplorer expandAll={expandAll} />
      </div>
    </div>
  );
}

export default App;
