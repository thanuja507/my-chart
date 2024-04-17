import React,{useState,useEffect} from 'react'
import Header from './Header'
import Navbar from './Navbar'
import '../styles.css'
import { useNavigate } from "react-router-dom";

function WaitTime() {

  const getDate = ()=> {
    let options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    var date = new Date().toLocaleDateString('en-US', options);
    date = date.replace(",","")
    return date.split(" ")
  }

  const [date,setDate] = useState([])
  const [pos,setPos] = useState(-1)
  const [mins,setMins] = useState(-1)

  const getMins = (date) =>{
    const differenceInMilliseconds = Math.abs(new Date() - new Date(date));
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    return differenceInMinutes
  }

useEffect(() => {
  setDate(getDate());
  const intervalId = setInterval(updatePos, 5000);

  return () => {
    clearInterval(intervalId);
  };
}, []);

useEffect(() => {
  setMins(pos * 10);
}, [pos]);

const updatePos = () => {
  let currentPos = parseInt(sessionStorage.getItem("position")) - (Math.floor(getMins(sessionStorage.getItem("init"))/10))
  if (currentPos>=0){
    setPos(currentPos);
  }
};
const navigate = useNavigate();

const navigateToHome = () => {
  navigate('/');
};

  return (
    <div >
        <div className='header'>
            <Header/>
        </div>
        <div className='container'>
            <Navbar/>
            <div style={{display:'flex'}}>
            <div className='left-section'>
            <h1 style={{color:'#005432', fontWeight:'bolder',padding:'3%',paddingBottom:'1%'}}>You are in line</h1>
            <p>Due to high demand or other valid reasons, you are required to wait in the queue before proceeding.</p>
            <p style={{textAlign:'right',marginBottom:'0',marginRight:'4%',cursor:'pointer'}} onClick={()=>window.location.reload()}><img src='refresh.png' alt="Refresh"></img></p>
              <div style={{display:'flex',padding:'40px'}}>
                <div className='queue-display-container'>
                  <div className='queue-display'>
                      <h4>Number of Patients ahead of you</h4>
                      {pos===-1 ? <div class="spinner-border text-light" role="status"></div>
                      : <h1 style={{fontWeight:'bolder',fontSize:'70px'}}>{pos}</h1>} 
                  </div>
                </div>
                <div className='time-display-container'>
                  <div className='time-display'>
                    <h4>Your estimated wait time</h4>
                    {mins <0  ? 
                    <div class="spinner-border text-dark" role="status"></div>:
                    <h1 style={{fontWeight:'bolder',fontSize:'70px'}}>{mins} MINS</h1>
                    }
                  </div>
                </div>
              </div>
              <div className='button-container'>
                <button className='btn btn-outline-success' onClick={navigateToHome}>Back to the Home Page</button>
              </div>
            </div>
            <div className='right-section'>
                <div className='visit-info'>
                  <div style={{display:'flex'}}>
                  <div className='date-display'>
                      <div className='row' style={{fontSize:'24px'}}>
                      {date[0]?.toUpperCase()}
                      </div>
                      <div className='row' style={{fontSize:'42px',textAlign:'center',lineHeight:'50%'}}>
                      {date[1]}
                      </div>
                      <div className='row' style={{fontSize:'24px'}}>
                      {date[2]}
                      </div>
                    </div>
                    <div className = "visit-display">
                      <div className='row' >
                        <p style={{fontSize:'22px'}}>Office Visit</p>
                      </div>
                      <div className='row'>
                        <p style={{fontSize:'14px', color:'rgba(0,0,0,0.6)',lineHeight:'60%'}}>Saida Omrava</p>
                      </div>
                      <div className='row'>
                        <p style={{fontSize:'14px', color:'rgba(0,0,0,0.6)'}}>USF Student Health Services</p>
                      </div>
                    </div>
                  </div>
                    {/* <div className="menu-line"></div>
                    <div className='visit-info-links'>
                      <h5>View Notes</h5>
                    </div>
                    <div className="menu-line"></div>
                    <div className='visit-info-links'>
                      <h5>View After Visit Summary</h5>
                    </div> */}
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default WaitTime;
