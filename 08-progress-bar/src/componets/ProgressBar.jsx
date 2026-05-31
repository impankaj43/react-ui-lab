import React, { useEffect } from "react";

function ProgressBar({ progress }) {
  console.log(progress);

  return (
    <>
      <div className="progrss-container">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          {`${progress}%`}
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
