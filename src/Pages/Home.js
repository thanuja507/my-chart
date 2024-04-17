import React, {useEffect,useState} from 'react'
import Header from './Header'
import Navbar from './Navbar'
import ProgressBar from '../Components/ProgressBar'
import '../styles.css'
import { Link } from 'react-router-dom'

function Home() {

  const [totalTasks,setTotalTasks] = useState(0)
  const [remainingTasks,setRemainingTasks] = useState(0)
  const [notificationFlag,setNotificationFlag] = useState(true)
  const [infoFlag,setInfoFlag] = useState(true)
  const [taskCount,setTaskCount] = useState(0)
  const [showTaskRem,setShowTaskRem] = useState(false)
  useEffect(()=>{
    const tasks = []
    if(sessionStorage.getItem("dietTasks")){ 
      tasks.push(...JSON.parse(sessionStorage.getItem("dietTasks")))
    }
    if(sessionStorage.getItem("medicationTasks")){
       tasks.push(...JSON.parse(sessionStorage.getItem("medicationTasks")))
    }

    if(sessionStorage.getItem("iflag")){
      setInfoFlag(JSON.parse(sessionStorage.getItem("iflag")))
    }
    
    if(sessionStorage.getItem("nflag")){
      setNotificationFlag(JSON.parse(sessionStorage.getItem("nflag")))
    }
    setTotalTasks(tasks.length)
    setRemainingTasks(tasks.filter(task=> task.undo===false).length)
    console.log(totalTasks,remainingTasks)
  },[totalTasks,remainingTasks])

  const  checkAppointments = ()=> {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    let medTasks = sessionStorage.getItem("medicationTasks") ? JSON.parse(sessionStorage.getItem("medicationTasks")):[]
    let dietTasks = sessionStorage.getItem("dietTasks") ? JSON.parse(sessionStorage.getItem("dietTasks")):[]
    let appointments =[...medTasks,...dietTasks]
    appointments.forEach(appointment => {
      const appointmentTimeParts = appointment.time.split(':');
      const appointmentHour = parseInt(appointmentTimeParts[0]);
      const appointmentMinutes = parseInt(appointmentTimeParts[1]);
      if (currentHour > appointmentHour || (currentHour === appointmentHour && currentMinutes >= appointmentMinutes)) {
        if(!appointment.undo){
        setTaskCount(taskCount+1);
        setShowTaskRem(true && !JSON.parse(sessionStorage.getItem("rflag")))
        }
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(checkAppointments, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [JSON.parse(sessionStorage.getItem("rflag"))]);

  return (
    <div >
        <div className='header'>
            <Header/>
        </div>
        <div className='container'>
          <Navbar/>
          <div style={{ minHeight: "calc(100vh - 125px)", maxHeight: "100%", backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            <div className='home'>
              <h2 style={{color:'#005432'}}>Welcome!</h2>
              {
              showTaskRem && (
                <div  className='home-div'>
                <div className ='home-icon'>
                  <img style ={{height:'32px',width:'32px'}}src='bell.png' alt='skipped'></img>
                </div>
                <div className='home-content'>
                  You have tasks todo.
                </div>
                <div className='home-buttons'>
                <button className='btn btn-outline-primary' style={{width:'100%'}} onClick={()=>{setShowTaskRem(false);sessionStorage.setItem("rflag",true)}}>Dismiss</button>
              </div>
          </div>
              )
            }
              <div  className='home-div'>
              <div className ='home-icon'>
                        <img style ={{height:'32px',width:'32px'}}src='checkmark.png' alt='skipped'></img>
                      </div>
                      <div className='home-content'>
                          <p><strong>{remainingTasks} tasks left for today</strong></p>
                          <div className='complete-status'>
                          <h4 style={{color:'#005432'}}>Completed</h4>
                          <h1 style={{color:'#005432'}}>{((totalTasks-remainingTasks)/totalTasks)*100}%</h1>
                          <ProgressBar percentage={((totalTasks-remainingTasks)/totalTasks)*100}/>
                          </div>
                      </div>
                      <div className='home-buttons'>
                        <Link to="/todo">
                        <button className='btn btn-primary' style={{width:'100%'}}>View Tasks</button>
                        </Link>
                    </div>
            </div>
            {
              notificationFlag && (
                <div  className='home-div'>
                <div className ='home-icon'>
                  <img style ={{height:'32px',width:'32px'}}src='bell.png' alt='skipped'></img>
                </div>
                <div className='home-content'>
                  Covid-19 Vaccine is over due.
                </div>
                <div className='home-buttons'>
                <button className='btn btn-outline-primary' style={{width:'100%'}} onClick={()=>{setNotificationFlag(false);sessionStorage.setItem("nflag",false)}}>Dismiss</button>
              </div>
          </div>
              )
            }
          {infoFlag && (
          <div  className='home-div'>
          <div className ='home-icon'>
            <img style ={{height:'32px',width:'32px'}}src='info.png' alt='skipped'></img>
          </div>
          <div className='home-content'>
            <p><strong>New Feature</strong></p>
            <p style={{marginBottom:'0'}}>BIG NEWS We're excited to launch our new telehealth platform, MyChart Video Visits! Accessing convenient and world- class health care is now even easier on your mobile or desktop device. To learn more, click on "MyChart Video Visits".</p>
          </div>
          <div className='home-buttons'>
          <button className='btn btn-outline-primary' style={{width:'100%'}} onClick={()=>{setInfoFlag(false);sessionStorage.setItem("iflag",false)}}>Dismiss</button>
        </div>
</div>)
          }
          </div>
        </div>
    </div>
    </div>
  );
}

export default Home;
