import React from 'react';

const Popup1 = ({ message }) => {
  return (
    <div className="popup-1">
      <div className="popup-content-1">
        <img style={{height:'19px',width:'19px',marginRight:'0.5%'}} alt="" src="thumbs-up.png" />
      {message}
      </div>
    </div>
  );
};

export default Popup1;
