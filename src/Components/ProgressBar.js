import React from 'react';

const ProgressBar = ({ percentage }) => {
//   const percentage = (value / max) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{backgroundColor:'rgba(0, 84, 50, 0.1)'}}>
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
