import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import DocLayout from "./singleDoc";
function AppointmentForm() {
  
  const [docs, setDocs] = useState([])
  const [spec, setSpec] = useState("default")
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentDay, setAppointmentDay] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [formDetails, setFormDetails] = useState({});
  const [selectedDoc, setSelectedDoc] = useState('');
  
 
  const [result,setResult] = useState({appointment : {}, doctor : ''});

  const navigate = useNavigate();
  let docsList = []

  useEffect(()=>{
    setDocs(docsList)
  },docsList)

  function onNext()
  {
    navigate('/ChooseDocs');
  }

  async function setSpecialisation(spec)
  {
      docsList = await axios.get('http://localhost:4000/doctors/specDoctors',{
      params : {
      specialization : spec
    },
  });
    setDocs(docsList.data.data);
  }

  useEffect(()=>{
  setSpecialisation(spec)
},[spec]);

function submitTime(hour, day, doc)
{
  setAppointmentDay(day)
  setAppointmentTime(hour)
  setSelectedDoc(doc)

}

 async function handleSubmit(e){
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    
    if (spec === "default") {
      errors.spec = "Please select preferred specialisation";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormDetails({
    patientName : patientName,
    patientNumber: patientNumber,
    patientGender: patientGender,
    appointmentDay: appointmentDay,
    appointmentTime : appointmentTime,
    spec : spec,
    doc : selectedDoc
    })

    console.log(formDetails);
    const token = localStorage.getItem('token');
    try{
    await axios.post(`http://localhost:4000/users/book`, formDetails, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  ).then((response)=>{console.log(response)});
    }

    catch (error) {
      console.error('Error occurred while submitting:', error);
    }

    

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setFormErrors({});
    setSpec("default")

    toast.success("Appointment Scheduled !", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  

  useEffect(() => {
    setResult(result);
  }, [result]);

  return (
    <div className="appointment-form-section">
      

      <div className="form-container">
        <h2 className="form-title">
          <span>Book Appointment Online</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            Patient Full Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
            {formErrors.patientName && <p className="error-message">{formErrors.patientName}</p>}
          </label>

          <br />
          <label>
            Patient Phone Number:
            <input
              type="text"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              required
            />
            {formErrors.patientNumber && <p className="error-message">{formErrors.patientNumber}</p>}
          </label>

          <br />
          <label>
            Patient Gender:
            <select
              value={patientGender}
              onChange={(e) => {setPatientGender(e.target.value); console.log('gender',patientGender)}}
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">Do not want to disclose</option>
            </select>
            {formErrors.patientGender && <p className="error-message">{formErrors.patientGender}</p>}
          </label>

          <br />
          
          <label>
           Specialisation
            <select
              value={spec}
              onChange={(e) => {setSpec(e.target.value)}}
              required
            >
              <option value="default">Select</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Physiologist">Physiologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Radiologist">Radiologist</option>
            </select>
            {formErrors.spec && <p className="error-message">{formErrors.spec}</p>}
          </label>

          
          <DocLayout docs = {docs} submitTime={submitTime}/>
          <br/>
          <Button variant="primary" onClick = {handleSubmit}>Book</Button>
          

          <p className="success-message" style={{display: isSubmitted ? "block" : "none"}}>Appointment has been scheduled.<br/>You can reschedule the appointment</p>
        </form>
        
      </div>
      
    </div>
  );
}

export default AppointmentForm;
