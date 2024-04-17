import React, { useEffect, useState } from 'react';

const Popup = ({ message, onClose, t, w, l }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible(false);
      clearInterval(intervalId);
      onClose();
    }, 2000);
  }, []);

  return (
    <div
      className={`popup ${visible ? 'visible' : 'hidden'}`}
      style={{ top: t, width: w, left: l }}
    >
      <div className="popup-content">{message}</div>
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Popup;
