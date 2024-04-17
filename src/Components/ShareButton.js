import React, { useState, useRef, useEffect } from 'react';
import Popup from './Popup';

const ShareButton = ({track,shareTypes}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isProviderPopVisible, setIsProviderPopVisible] = useState(false);
  const [messagePopup,setMessagePopup] = useState(false)
  const [popUpMessage,setPopUpMessage] = useState('')
  const popupRef = useRef(null);
  const names = ["Dr. Saida","Dr. John","Dr. Tony","Dr. Liam","Dr. Harry"] 
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setPopupVisible(false);
      setIsProviderPopVisible(false)
      shareTypes()
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    shareTypes()
  };

  const handleClick = (flag)=>{
    if(track){
        sessionStorage.setItem("activity-share",flag)
    }
    else{
        sessionStorage.setItem("symptom-share",flag)
    }
    if(!flag){
    togglePopup()
    }
    // else{
    //     setIsProviderPopVisible(true)
    // }
    else{
    setPopUpMessage("Succesfully shared with providers");
    setMessagePopup(true);
    }
    shareTypes()
  }

  const toggle = ()=>{
    setIsProviderPopVisible(false)
    setPopupVisible(false)
    shareTypes()
  }

  return (
    <div>
      <p className='share-button' style={{ fontSize: '24px', marginBottom: '0.1%' }} onClick={togglePopup}>
        ...
      </p>
      {messagePopup &&  <Popup message={popUpMessage} w="42%" t="39%" onClose={()=>setMessagePopup(false)}></Popup>
      }
      {isPopupVisible && (
        <div ref={popupRef} className='share-popup'>
          <p className='share-option-1' style={{marginBottom:'7%'}} onClick={()=>setIsProviderPopVisible(true)}><span style={{padding:'2px'}}><img className='share-image'  src="share-outline.png" alt="share-icon"/></span>Share with provider</p>
          <p className='share-option-2' style={{marginBottom:'3%'}} onClick={()=>handleClick(false)}><span style={{padding:'2px'}}><img className='lock-image'  src="lock-outline.png" alt="lock-icon"/></span>Make Private</p>
        </div>
      )}
     {isProviderPopVisible && (
  <div ref={popupRef} className='share-popup' style={{ left: '41.5%' }}>
    <div>
      {names.map((n, index) => (
        <div key={index}>
          <label style={{ display: 'inline-block', margin: '0 10px' }}>
            <input type="checkbox" value={n} style={{ marginRight: '5px' }}/>
            {n}
          </label>
        </div>
            ))}
            </div>
            <p style={{ marginBottom: '0' }}>
            <span className='tick' onClick={() => { toggle(); handleClick(true); }}>✓</span>
            <span className='cross' onClick={toggle}>✗</span>
          </p>
        </div>
        )}
    </div>
  );
};

export default ShareButton;
