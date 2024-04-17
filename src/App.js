import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import WaitTime from './Pages/WaitTime';
import Todo from './Pages/Todo';
import Tracker from './Pages/Tracker';
import Logout from './Pages/Logout';
import Medication from './Pages/Medication';

document.body.style = 'background: #147253;'
function App() {
  const queueNums = [3,4,5,6,7,8,9,10]
  const medicationTasks =[
    {
        "name":"Appointment",
        "time":"11:45 PM",
        "status":true,
        "undo":false
    },
    {
      "name":"Appointment",
      "time":"12:00 PM",
      "status":true,
      "undo":false
  }
]

const dietTasks = [
    {
        "name":"Diet Appointment",
        "time":"12:30 PM",
        "status":NaN,
        "undo":false
    },
    {
      "name":"Diet Appointment",
      "time":"06:00 PM",
      "status":NaN,
      "undo":false
  }
]

const activity =[]
const symptoms =[]

  if(sessionStorage.getItem("position")===null){
    sessionStorage.setItem("position",queueNums[Math.floor(Math.random()*queueNums.length)])
  }

  if(sessionStorage.getItem("init")===null){
    sessionStorage.setItem("init", new Date())
  }

  if(sessionStorage.getItem("medicationTasks")==null){
    sessionStorage.setItem("medicationTasks",JSON.stringify(medicationTasks))
  }

  if(sessionStorage.getItem("dietTasks")==null){
    sessionStorage.setItem("dietTasks",JSON.stringify(dietTasks))
  }

  if(sessionStorage.getItem("activity")==null){
    sessionStorage.setItem("activity",JSON.stringify(activity))
  }

  if(sessionStorage.getItem("symptoms")==null){
    sessionStorage.setItem("symptoms",JSON.stringify(symptoms))
  }

  if(sessionStorage.getItem("symptom-share")==null){
    sessionStorage.setItem("symptom-share",null)
  }

  if(sessionStorage.getItem("activity-share")==null){
    sessionStorage.setItem("activity-share",null)
  }

  if(sessionStorage.getItem("iflag")==null){
    sessionStorage.setItem("iflag",true)
  }

  if(sessionStorage.getItem("nflag")==null){
    sessionStorage.setItem("nflag",true)
  }

  if(sessionStorage.getItem("rflag")==null){
    sessionStorage.setItem("rflag",false)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home key="home"/>}></Route>
          <Route path="/waittime" element={<WaitTime key="waittime"/>}></Route>
          <Route path="/todo" element={<Todo key="todo"/>}></Route>
          <Route path="/track" element={<Tracker key="tracker"/>}></Route>
          <Route path="/logout" element={<Logout key="logout"/>}></Route>
          <Route path="/medication" element={<Medication key="medication"></Medication>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
