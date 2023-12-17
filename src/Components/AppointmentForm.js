import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
function AppointmentForm() {
  

  const [spec, setSpec] = useState("default")
  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [result,setResult] = useState({appointment : {}, doctor : ''});

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
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (spec === "default") {
      errors.spec = "Please select preferred specialisation";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await axios.post(`http://localhost:4000/patientDetails`, {
    patientName : patientName,
    patientNumber: patientNumber,
    patientGender: patientGender,
    appointmentDate : appointmentTime,
    spec : spec
    }).then((response)=>{setResult({appointment : response.data.appointment, doctor : response.data.docName});
    console.log(result)});

    

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
      <h1 className="legal-siteTitle">
        <Link to="/">
          Health<span className="legal-siteSign">Sync</span>
        </Link>
      </h1>

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
              onChange={(e) => setPatientGender(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">I will inform Doctor only</option>
            </select>
            {formErrors.patientGender && <p className="error-message">{formErrors.patientGender}</p>}
          </label>

          <br />
          <label>
            Preferred Appointment Time:
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
            {formErrors.appointmentTime && <p className="error-message">{formErrors.appointmentTime}</p>}
          </label>

          <br />
          
          <label>
           Specialisation
            <select
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
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
          {/* <label>
           Upload previous Precription:
           <input type="file" />
            {formErrors.preferredMode && <p className="error-message">{formErrors.preferredMode}</p>}
          </label> */}

          <br />
          <button type="submit" className="text-appointment-btn">
            Confirm Appointment
          </button>

          <p className="success-message" style={{display: isSubmitted ? "block" : "none"}}>Appointment has been scheduled.<br/>You can reschedule the appointment</p>
        </form>
        
      </div>
       

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;
