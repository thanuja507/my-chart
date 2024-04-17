import React, { useEffect, useState } from 'react';

const EditTask = ({ task, index,flag, onClose }) => {
  
  const [mtask,setmTask] = useState(task)
  const saveTask = () =>{
      let taskType = flag ? "medicationTasks" : "dietTasks"
        const tasks = sessionStorage.getItem(taskType) ? JSON.parse(sessionStorage.getItem(taskType)) : []
        tasks[index] = mtask
        sessionStorage.setItem(taskType,JSON.stringify(tasks))
      onClose()
  }

  const taskChangeHandler = (value, flag) =>{
    const updatedTask = { ...mtask };
    if (flag) {
      updatedTask.name = value;
    } else {
      updatedTask.time = value;
    }

    setmTask(updatedTask);
  }

  return (
    <div
      className="popup-task"
      style={{ width: "20%"}}
    >
      <div className="popup-content-task">
      {/* <input type="text" name="username" className="form-control" value={note} onChange={(e)=>noteChangeHandler(e.target.value)}/>
      <button type="button" className="btn btn-primary add-task"  onClick={addNote}>Add</button> */}
    <form>
      <div class="form-group">
        <input type="text" class="form-control" id="exampleFormControlInput1" value={mtask?.name} onChange={(e)=>taskChangeHandler(e.target.value,true)}/>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id="exampleFormControlInput1" value={mtask?.time} onChange={(e)=>taskChangeHandler(e.target.value,false)}/>
      </div>
      <div className='buttons-task'>
      <button type="button" className="btn btn-outline-success tsk-button" onClick={()=>saveTask()}>Save</button>
      <button type="button" className="btn btn-outline-danger tsk-button" onClick={()=>onClose()}>Close</button>
      </div>
    </form>
      </div>
      {/* <button className="close-button-task" onClick={onClose}>
        X
      </button> */}
    </div>
  );
};

export default EditTask;
