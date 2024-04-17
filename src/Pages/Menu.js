import React, { useState } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

const items = ["$Find Care","Schedule an Appointment","*Wait Time","View Care Team","Register For My Delivery","$Find Urgent Care",
                "Communication","Messages","Ask a Question","Letters","$My Record","*Track","Covid-19","*To Do","Visits","Medications","Health Summary",
                "Plan of Care","Preventive Care","Health Reports","Growth Charts","Safety Plan","$Billing","Billing","Estimates"];

function Menu({onChildResponse}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {    
    setIsOpen(!isOpen);
    onChildResponse(false);
  };

  return (
    <div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        {/* <span>Menu</span>
        <div className='menu-header'>
        <span style={{textAlign:'center'}}>Menu</span>
          <button className="close-button" onClick={toggleMenu}>
            &times;
          </button>
        </div> */}
         <div className="menu-header">
          <div className="header-content">
          <span className="close-text">Menu</span>
          <img src="left-arrow-48.png" className="close-button" alt ="arrow" onClick={toggleMenu}/>
          </div>
        </div>
        <div className="menu-items">
          <ul>
            {items.map((item, index) => (
              <div>
              <li  key={index} className={item.startsWith('$') ? 'menu-heading' : 'menu-item'}>
                {item.startsWith("*") ?

                <Link className="no-dec" to ={"/"+item.replace("*","").toLocaleLowerCase().split(" ").join("")} style={{color:'black'}}>{item.replace("*","")}</Link> 
                : <span>{item.replace("$","")}</span>
                }
                </li>
              <div className="menu-line"></div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
