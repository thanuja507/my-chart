import React,{useState,useEffect} from 'react'
import Header from './Header'
import Navbar from './Navbar'
import '../styles.css'
import { useNavigate } from "react-router-dom";
import Popup from '../Components/Popup';
import Popup1 from '../Components/Popup1';
import EditTask from '../Components/EditTask';

function Todo() {
    const [date,setDate] = useState([])
    const [taskType,setTaskType] = useState(true)
    const [medicationTasks, setMedicationtasks] = useState([])
    const [dietTasks, setDietTasks] = useState([])
    const [completedDietTasks,setCompletedDietTasks] = useState(0)
    const [completedMedicationTasks,setCompletedMedicationTasks] = useState(0)
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popUpMessage,setPopUpMessage] =useState("")
    const [medPopup,setMedPopup] = useState(false)
    const [dietPopup,setDietPopup] = useState(false)
    const [medPopMessage,setMedPopMessage] = useState("")
    const [dietPopMessage,setDietPopMessage] = useState("")
    const [taskEditPopup,setTaskEditPopup] = useState(false)
    const [editableTask,setEditableTask] = useState({})
    const [editableTaskIdx,setEditableTaskIdx] = useState(0)
    const hanldeTaskType = (flag) =>{
      setTaskType(flag)
    } 
    
    const handleComplete = (index) =>{
        if (taskType){
           const  array = [...medicationTasks];
           array[index].status = true;
           array[index].undo = true;
           setMedicationtasks(array);
           sessionStorage.setItem("medicationTasks",JSON.stringify(medicationTasks));
        }
        else{
           const  array = [...dietTasks];
           array[index].status = true;
           array[index].undo = true;
           setDietTasks(array);
           sessionStorage.setItem("dietTasks",JSON.stringify(dietTasks));
        }
        updateTaskCounts()
        setPopUpMessage("Task Completed")
        setPopupVisible(true)
    }

    const updateTaskCounts =() =>{
      let medTasks = sessionStorage.getItem("medicationTasks") ? JSON.parse(sessionStorage.getItem("medicationTasks")):[]
      let dietTasks = sessionStorage.getItem("dietTasks") ? JSON.parse(sessionStorage.getItem("dietTasks")):[]
      let medUndone = medTasks.filter(task => task.undo === false).length
      let dietUndone = dietTasks.filter(task => task.undo === false).length
      setCompletedMedicationTasks(medUndone)
      setCompletedDietTasks(dietUndone)
      if(medUndone===0){
        setMedPopup(true)
        if(medTasks.filter(task => task.status === true).length===medTasks.length){
          setMedPopMessage("Nice work! All tasks completed for today.")
        }
        else{
          setMedPopMessage("Thanks! No more tasks for the day.")
        }
      }
      else{
        setMedPopup(false)
      }
      if(dietUndone===0){
        setDietPopup(true)
        if(dietTasks.filter(task => task.status === true).length===dietTasks.length){
          setDietPopMessage("Nice work! All tasks completed for today.")
        }
        else{
          setDietPopMessage("Thanks! No more tasks for the day.")
        }
      }
      else{
        setDietPopup(false)
      }
    }

    const handleSkip = (index) =>{
      if (taskType){
         const  array = [...medicationTasks];
         array[index].status = false;
         array[index].undo = true;
         setMedicationtasks(array);
         sessionStorage.setItem("medicationTasks",JSON.stringify(medicationTasks));
      }
      else{
         const  array = [...dietTasks];
         array[index].status = false;
         array[index].undo = true;
         setDietTasks(array);
         sessionStorage.setItem("dietTasks",JSON.stringify(dietTasks));
      }
      updateTaskCounts()
      setPopUpMessage("Task Skipped")
      setPopupVisible(true)
  }

  const handleUndo = (index) =>{
    if (taskType){
       const  array = [...medicationTasks];
       array[index].status = NaN;
       array[index].undo = false;
       setMedicationtasks(array);
       sessionStorage.setItem("medicationTasks",JSON.stringify(medicationTasks));
    }
    else{
       const  array = [...dietTasks];
       array[index].status = NaN;
       array[index].undo = false;
       setDietTasks(array);
       sessionStorage.setItem("dietTasks",JSON.stringify(dietTasks));
    }
    updateTaskCounts()
    setPopUpMessage("Task undone")
    setPopupVisible(true)
  }

    const getDate = ()=> {
        let options = {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        };
        var date = new Date().toLocaleDateString('en-US', options);
        return date;
      }

    useEffect(()=>{
        setDate(getDate());
        setMedicationtasks(sessionStorage.getItem("medicationTasks") ? JSON.parse(sessionStorage.getItem("medicationTasks")):[])
        setDietTasks(sessionStorage.getItem("dietTasks") ? JSON.parse(sessionStorage.getItem("dietTasks")):[])
        updateTaskCounts()
    },[taskEditPopup])

const navigate = useNavigate();

const closeTaskEditPopup = () =>{
  setTaskEditPopup(false)
}
const navigateToHome = () => {
  navigate('/');
};
const navigateToMedication = () => {
  navigate('/medication');
};

const handleEdit = (task,index) =>{
    setEditableTask(task)
    setEditableTaskIdx(index)
    setTaskEditPopup(true)
  }

  return (
    <div >
        <div className='header'>
            <Header/>
        </div>
        <div className='container'>
          <Navbar/>
          <div className='todo'>
            <div className='todo-left'>
                <h1 style={{textAlign:'left',color:'#005432'}}>To Do</h1>
                <div className='todo-items'>
                  <div className={taskType ? 'todo-selected' : 'todo-unselected'}>
                  <h4 onClick={()=>hanldeTaskType(true)} style={{paddingLeft:'5%'}}>Medication Tasks</h4>
                  <h6 className='task-count'>{completedMedicationTasks}</h6>
                  </div>
                  <div className={!taskType ? 'todo-selected' : 'todo-unselected'}>
                  <h4 onClick={()=>hanldeTaskType(false)} style={{paddingLeft:'5%'}} >Diet Tasks</h4>
                  <h6 className='task-count'>{completedDietTasks}</h6>
                  </div>
                </div>
            </div>
            <div className='todo-right'>
                <h1  style={{color:'#005432'}}>Tasks</h1>
                <h6 style={{textAlign:'left',color:'#005432',fontWeight:'bold',paddingTop:'2%'}}>{date}</h6>
                {taskType ?
                 medPopup ? <Popup1 message={medPopMessage}></Popup1> :<div></div>
                 :
                 dietPopup ? <Popup1 message={dietPopMessage}></Popup1> :<div></div>
              }
                {taskType ? 
                medicationTasks.map((item, index) => (
                    <div key={index} className='task-display'>
                      <div className ='task-status'>
                        {!item['undo'] ? <img style ={{height:'22px',width:'22px'}}src='task-clock.png' alt='incomplete'></img> :
                        item['status'] ? <img style ={{height:'24px',width:'24px'}}src='task-tick.png' alt='complete'></img>:
                        <img style ={{height:'24px',width:'24px'}}src='task-x.png' alt='skipped'></img>}
                      </div>
                      <div className='task-details'>
                        <h5>{item['name']}</h5>
                        <h6>{item['time']}</h6>
                      </div>
                      { item['undo'] ?
                      <div className='buttons'>
                      <button className='btn btn-outline-success' onClick={()=>handleUndo(index)}>Undo</button>
                    </div> :
                    <div className='buttons'>
                      <button className='btn btn-outline-warning' onClick={()=>handleEdit(item,index)}>Edit</button>
                      <button className='btn btn-primary' style={{marginLeft:'2%'}} onClick={()=>handleComplete(index)}>Complete</button>
                      <button className='btn btn-outline-danger' style={{marginLeft:'2%'}} onClick={()=>handleSkip(index)}>Skip</button>
                    </div>
                    }
                    </div>
                ))
                :
                dietTasks.map((item, index) => (
                  <div key={index} className='task-display'>
                      <div className ='task-status'>
                        {!item['undo'] ? <img style ={{height:'22px',width:'22px'}}src='task-clock.png' alt='incomplete'></img> :
                        item['status'] ? <img style ={{height:'24px',width:'24px'}}src='task-tick.png' alt='complete'></img>:
                        <img style ={{height:'24px',width:'24px'}}src='task-x.png' alt='skipped'></img>}
                      </div>
                    <div className='task-details'>
                      <h5>{item['name']}</h5>
                      <h6>{item['time']}</h6>
                    </div>
                    { item['undo'] ?
                      <div className='buttons'>
                      <button className='btn btn-outline-success' onClick={()=>handleUndo(index)}>Undo</button>
                    </div> :
                    <div className='buttons'>
                      <button className='btn btn-outline-warning' onClick={()=>handleEdit(item,index)}>Edit</button>
                      <button className='btn btn-primary' style={{marginLeft:'2%'}} onClick={()=>handleComplete(index)} >Complete</button>
                      <button className='btn btn-outline-danger' style={{marginLeft:'2%'}} onClick={()=>handleSkip(index)} >Skip</button>
                    </div>
                    }
                  </div>
              ))
              }
              {isPopupVisible && (
                <Popup
                  message={popUpMessage}
                  onClose={() => setPopupVisible(false)}
                  t="28%"
                  w="30%"
                  l="50%"
                />
              )}
              {
                taskEditPopup &&  <EditTask task = {editableTask}  index = {editableTaskIdx} flag = {taskType} onClose={closeTaskEditPopup}/>
              }
              {
                taskType ?
                <div className='button-container' style={{marginLeft:'20%'}}>
                <button className='btn btn-outline-success' onClick={navigateToMedication}>View Medication Page</button>
                </div> :
              <div className='button-container' style={{marginLeft:'20%'}}>
                <button className='btn btn-outline-success' onClick={navigateToHome}>Back to the Home Page</button>
              </div>
              }
            </div>
          </div>
        </div>
    </div>
  );
}

export default Todo;
