import {React,useState} from 'react'
import Header from './Header'
import Navbar from './Navbar'
import '../styles.css'
import { Link } from 'react-router-dom'

function Medication() {
    const [flags,setFlags] = useState([true,false,false])
    const [activeTab,setActiveTab] = useState(0)
    const handleTabChange = (index) =>{
        const updateFlags = [...flags]
        updateFlags[activeTab]=false
        updateFlags[index] = true
        setActiveTab(index)
        setFlags(updateFlags)
    }
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
                            <li className={flags[0] ? 'mini-nav-selected':''} onClick={()=>handleTabChange(0)}>Day</li>
                            <li className={flags[1] ? 'mini-nav-selected':''} onClick={()=>handleTabChange(1)}>Noon</li>
                            <li className={flags[2] ? 'mini-nav-selected':''} onClick={()=>handleTabChange(2)}>Night</li>
                        </ul>
                    </nav>
                    <div className='menu-line'></div>
                </div>
                <div>
                <div className='medicines'>
                    {flags[0] &&
                        <ul>
                            <li>Aspirin – low-dose, see Low-dose aspirin</li>
                            <li>Beclometasone nasal spray</li>
                            <li>Continuous combined hormone replacement therapy (HRT) tablets, capsules and patches</li>
                        </ul>
                    }
                    {flags[1] &&
                        <ul>
                            <li>Clotrimazole cream, spray and solution</li>
                            <li>Dihydrocodeine</li>
                            <li>Fluticasone nasal spray and drops</li>
                        </ul>
                    }
                    {flags[2] &&
                        <ul>
                            <li>Isosorbide mononitrate and isosorbide dinitrate</li>
                            <li>Loratadine (Clarityn)</li>
                            <li>Mometasone for skin</li>
                        </ul>
                    }

                </div>
            </div>
            </div>
        </div>
        <Link to='/'>
            <div className='button-container' style={{left:'20%'}}>
                <button className='btn btn-outline-success' >Back to the Home Page</button>
              </div>
        </Link>
    </div>
</div>
  );
}

export default Medication;
