import React,{useState,useEffect} from 'react'
import Header from './Header'
import Navbar from './Navbar'
import '../styles.css'
import ViewNotes from './ViewNotes'
import ViewSummary from './ViewSummary'
import ShareButton from '../Components/ShareButton'
import Popup from '../Components/Popup'
import Graph from '../Components/Graph'

function Tracker() {

  const [trackType,setTrackType] = useState(true)
  const [activities,setActivities] = useState([])
  const [symptoms,setSymptoms] = useState([])
  const [note,setNote] = useState('')
  const [notePopup,setNotePopup] = useState(false)
  const [summaryPopup,setSummaryPopup] = useState(false)
  const [isPopupVisible,setIsPopupVisible] =useState(false)
  const [symShareType,setSymShareType] = useState(null)
  const [actShareType,setActShareType] = useState(null)

  const noteChangeHandler = (e)=>{
    setNote(e)
  }

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

  useEffect(() => {
    setDate(getDate());
  }, [true]);

  const addNote = ()=>{
    if(note!==''){
        if(trackType){
        const newNotes = [...activities,note]
        setActivities(newNotes)
        sessionStorage.setItem("activity",JSON.stringify(newNotes))
        }
        else{
            const newNotes = [...symptoms,{
              "note":note,
              "date": new Date().toLocaleDateString(),
              "time": new Date().toLocaleTimeString()
            }]
            setSymptoms(newNotes)
            sessionStorage.setItem("symptoms",JSON.stringify(newNotes))
        }
      setNote('')
    }
  }

  const deleteNote= (index)=>{
    if(trackType){
    const newNotes = [...activities];
    newNotes.splice(index, 1);
    setActivities(newNotes);
    sessionStorage.setItem("activity",JSON.stringify(newNotes))
    }
    else{
        const newNotes = [...symptoms];
        newNotes.splice(index, 1);
        setSymptoms(newNotes);
        sessionStorage.setItem("symptoms",JSON.stringify(newNotes))
    }
    setIsPopupVisible(true)
  }

  const handleTrackType = (flag)=> {
        setTrackType(flag)
  }

  const loadShareTypes = () =>{
    setSymShareType(sessionStorage.getItem('symptom-share') ? JSON.parse(sessionStorage.getItem('symptom-share')): null)
    setActShareType(sessionStorage.getItem('activity-share') ? JSON.parse(sessionStorage.getItem('activity-share')): null)
  }

  useEffect(()=>{
    setActivities(sessionStorage.getItem("activity") ? JSON.parse(sessionStorage.getItem("activity")) : [])
    setSymptoms(sessionStorage.getItem("symptoms") ? JSON.parse(sessionStorage.getItem("symptoms")) : [])
    loadShareTypes()
  },[true])

  return (
    <div >
        <div className='header'>
            <Header/>
        </div>
        <div className='container'>
            <Navbar/>
            <div style={{display:'flex'}}>
                <div className='left-section'>
                    <h1 style ={{color:'#005432', padding:'2%',paddingBottom:'1%',textAlign:'left'}}>My Plan of Care</h1>
                    <div className='mini-nav'>
                        <nav>
                            <ul>
                                <li className={trackType ? 'mini-nav-selected':''} onClick={()=>handleTrackType(true)}>Activity</li>
                                <li className={!trackType ? 'mini-nav-selected':''} onClick={()=>handleTrackType(false)}>Symptoms</li>
                            </ul>
                        </nav>
                        <div className='menu-line'></div>
                    </div>
                    <div>
                    <div className="text-center custom-card-1">
                    <div className="card-body ">
                      {
                      isPopupVisible &&(
                      actShareType ?
                       <Popup message="Deleted Succesfully" w="42%" onClose={()=>setIsPopupVisible(false)}></Popup>:
                       <Popup message="Deleted Succesfully" w="42%" t="40%" onClose={()=>setIsPopupVisible(false)}></Popup>)
                       }
                     <ShareButton track={trackType} shareTypes = {loadShareTypes}/>
                     {trackType && (
                        <h6 style={{textAlign:'left'}}> 
                          <strong >Activity Details</strong> {actShareType !== null ? (
                            <img src={actShareType ? "share-outline.png" : "lock-outline.png"} alt="Image"  style={{ height: '22px', width: '22px' }}/>
                          ) : null}
                        </h6>
                      )}
                     {trackType && (<Graph/>)}
                     {!trackType && 
                     <p style={{textAlign:'left',marginBottom:'0'}}>How are you doing today?                                {
                      symShareType !==null && (
                        <img src={symShareType ? "share-outline.png" :"lock-outline.png"}  style={symShareType ? { height: '22px', width: '22px' } : {}}/>
                      )
                    }</p>
                     }
                    <ul className="list-group lis">
                     {!trackType && (
                        symptoms.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <div style={{width:'80%',textAlign:'left'}}>
                              <p style={{marginRight:'1%',flex:'1'}}>{item.note}</p>
                              <p style={{fontSize:'12px',marginBottom:'0',color:'rgba(0,0,0,0.6)'}}>{item.date} {item.time}</p>
                                {/* {
                                  symShareType !==null && (
                                    <img src={symShareType ? "share-outline.png" :"lock-outline.png"}  style={symShareType ? { height: '22px', width: '22px' } : {}}/>
                                  )
                                } */}
                              </div>

                                <button className="btn btn-danger" onClick={() => deleteNote(index)}>X</button>
                            </li>
                            )))
                        }
                    </ul>
                    {!trackType && 
                      <ul className="list-group">
                      <li className=" d-flex justify-content-between align-items-center">
                      <input type="text" name="username" className="form-control" value={note} onChange={(e)=>noteChangeHandler(e.target.value)}/>
                      <button type="button" className="btn btn-primary add-task"  onClick={addNote}>Add</button>
                      </li>
                      </ul>
                    }

                    <div style={{padding:'1.5%'}}>
                    </div>
                    </div>
                    </div>
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
                    <div className="menu-line"></div>
                    <div className='visit-info-links'>
                      {notePopup ?
                        <ViewNotes
                        onClose={() => setNotePopup(false)}
                        />:<div></div>
                      }
                      <h5 onClick={()=>setNotePopup(true)}>View Notes</h5>
                    </div>
                    <div className="menu-line"></div>
                    <div className='visit-info-links'>
                      {
                        summaryPopup ? 
                        <ViewSummary onClose={() => setSummaryPopup(false)}></ViewSummary>:<div></div>
                      } 
                      <h5 onClick={()=>setSummaryPopup(true)}>View After Visit Summary</h5>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Tracker;
