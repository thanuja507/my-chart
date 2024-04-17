import React, { useState } from 'react'
import Menu from './Menu'
import '../styles.css'
import { Link } from 'react-router-dom'

function Navbar() {
  const [open,setOpen] = useState(false)
  const toggleMenu = (flag) =>{
      setOpen(flag)
  }
  return (
    <div >
        <div className='navbar-custom'>
        <div className='row' style={{ boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.2)'}}>
          <div className='col-auto'>
            <span className='circle-selected' onClick={toggleMenu}>

              <div className='line'></div>
              <div className='line'></div>
              <div className='line'></div>
            </span>
            <span className='nav-item' >Menu</span>
          </div>
          {/* <div className='col-auto'>
          <span className='circle-unselected' style={{backgroundImage:"url('email-icon.png')"}}></span>
          <span className='nav-item'>Back to the Home Page</span>
          </div> */}
          <div className='col-auto'>
          <span className='circle-unselected' style={{backgroundImage:"url('schedule-icon.png')"}}></span>
          <span className='nav-item'>Schedule an Appointment</span>
          </div>
          <div className='col-auto'>
          <span className='circle-unselected' style={{backgroundImage:"url('email-icon.png')"}}></span>
          <span className='nav-item'>Messages</span>
          </div>
          <div className='col-auto'>
          <span className='circle-unselected' style={{backgroundImage:"url('credit-icon.png')"}}></span>
          <span className='nav-item'>Billing</span>
          </div>
          <div className='col-auto'>
          <span className='circle-unselected' style={{backgroundImage:"url('wait-time.png')"}}></span>
          <span className='nav-item'><Link className="no-dec" to ="/waittime">Wait Time</Link></span>
          </div>
          <div className='col-auto'>
          <span className='circle-unselected' style={{backgroundImage:"url('todo-icon.png')"}}></span>
          <span className='nav-item'><Link className="no-dec" to ="/todo">To Do</Link></span>
          </div>
          <div className='col-auto'>
          <span className='circle-unselected' style={{backgroundImage:"url('todo-icon.png')"}}></span>
          <span className='nav-item'><Link className="no-dec" to ="/track">Track</Link></span>
          </div>
        </div>

        </div>
        {open?
          <Menu onChildResponse={toggleMenu}/>:<div></div>  
      }
    </div>
  );
}

export default Navbar;
