import React from 'react';

const ViewSummary = ({ onClose }) => {
  return (
    <div className="view-notes-popup-container">
        
      <div className="view-notes-popup">
      <button className="view-notes-close-button" onClick={onClose}>
          X
        </button>
        <div className="view-notes-content">
            <div style={{paddingLeft:'6%',paddingRight:'6%',padding:'1%'}}>
                <div style={{backgroundColor:'#f4cc64',padding:'0.5%'}}></div>
                <p style={{color:'#d65a49',marginBottom:'0.75%'}}><span style={{fontSize:'36px',marginRight:'1%'}}>Instructions</span> <span  style={{fontSize:'24px'}}>from Saida Omarova, MD</span></p>
                <p style={{fontSize:'22px',color:'black'}}>Mix peroxide with water and apply a few drops in ear and leave for 10 min before shower.</p>
                <div style={{backgroundColor:'#f4cc64',padding:'0.5%'}}></div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ViewSummary;
