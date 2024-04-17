import React from 'react';

const ViewNotes = ({ onClose }) => {
  return (
    <div className="view-notes-popup-container">
        
      <div className="view-notes-popup">
      <button className="view-notes-close-button" onClick={onClose}>
          X
        </button>
        <div className="view-notes-content">
            <div style={{color:'#446df4'}}>
                <h2>Progress Notes</h2>
                <h5>Saida Omarava at 9/14/2023 2:00 PM</h5>
            </div>
            <div style={{paddingLeft:'3%',color:'black'}}>
                <h5 style={{fontWeight:'bold',color:'#115740'}}>USF STUDENT HEALTH SERVICES GENERAL MEDICINE OFFICE VISIT</h5>
                <h6 style={{fontWeight:'bold',color:'rgba(0,0,0,0.6)'}}>Chief Compliant</h6>
                <p style={{color:'rgba(0,0,0,0.6)',backgroundColor:'rgba(0,0,0,0.1)',marginBottom:'0px'}}>Patient presents with</p>
                <ul style={{marginBottom:'0px'}}>
                    <li style={{fontSize:'20px'}}>Otalgia</li>
                </ul>
                <p style={{paddingLeft:'7%'}}>Pt states having left year pain, very itchy, discomfort for 2 days VM LPN</p>
                <h5 style={{color:'#115740',backgroundColor:'rgba(0,0,0,0.2)',marginBottom:'0px',fontWeight:'bold'}}>Subjective:</h5>
                <p style={{marginBottom:'0px',fontSize:'18px'}}>Lear itching and discomfort for 2 days. No fever, chills. No cough. shes not using qtips to clean ears. She denies throbbing pain. She states no itching at the moment.</p>
                <p><span style={{fontWeight:'bold',fontSize:'20px'}}>Allergies:</span> has No Known Allergies.<br></br>
                <span style={{fontWeight:'bold',fontSize:'20px'}}>Medications:</span> is not on any long-term medications.<br></br>
                <span style={{fontWeight:'bold',fontSize:'20px'}}>Social History:</span> reports that she has never smoked. She has never used smokeless tobacco. She reports that she does not drink alcohol and does not use drugs.
                <br></br><span style={{fontWeight:'bold',fontSize:'20px'}}>Past Medical History:</span> has no past medical history on file.
                <br></br><span style={{fontWeight:'bold',fontSize:'20px'}}>Past Surgical History:</span> has no past surgical history on file. Family History:family history is not on file.
                <br></br><span style={{fontWeight:'bold',fontSize:'20px'}}>Immunization History:</span><br></br>
                There is no immunization history on file for this patient.
                </p>
            
            </div>
        </div>

      </div>
    </div>
  );
};

export default ViewNotes;
