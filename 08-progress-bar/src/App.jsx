import React, { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./componets/ProgressBar.jsx";

function App() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleReset = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <div className="main">
      <h2>Progress Bar Implementation</h2>
      <div className="progress-bar">
        <button className="reset" onClick={handleReset}>
          Restart
        </button>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
}

export default App;
