import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { authContext } from '../Context/AuthContext.jsx';
import '../Styles/avail.css'
import Navbar from '../Components/Navbar.js';
function Availability()
{
   const [onHover, setHover] = useState(false);
   const [calDate, setCal] = useState('');
   const [avail, setAvail] = useState([]);
   const [availDetails, setDet] = useState({});
   const { dispatch } = useContext(authContext);
   const availList = [];
    async function onSubmission()
    {
      setAvail(availList)
      console.log(avail, calDate);
      setDet({
        "day" : calDate,
        "hours" : avail,
      });
      const token = localStorage.getItem('token');
      
    try{
      console.log(token);
        const response = axios.put(`http://localhost:4000/doctors/updateAvail`, availDetails, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.message);
    }
    catch(e)
    {
      console.log(e);
    }
    }

    function toggleHour(hour)
    {
      setAvail(prevAvailList => {
        // Check if the hour is already in the list
        const isHourPresent = prevAvailList.includes(hour);
        if (isHourPresent) {
          // Remove the hour from the list
          return prevAvailList.filter(item => item !== hour);
        } else {
          // Add the hour to the list
          return [...prevAvailList, hour];
        }
      });
    }

    return (
    <div><Navbar/>
    <div className="container">
    <h1>Set Doctor Availability</h1>
    <div className="calendar">
    <h2>Select Day:</h2>
    <input type="date" id="dateInput" onChange = {(e)=>{setCal(e.target.value)}}/>
    </div>
    <div class="availability">
      <h2>Select Hours:</h2>
      <div class="hours">
        <div className={`hour ${avail.includes('9') ? 'hover' : 'noHover'}`} data-hour="9" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>9 AM</div>
        <div className={`hour ${avail.includes('10') ? 'hover' : 'noHover'}`} data-hour="10" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>10 AM</div>
        <div className={`hour ${avail.includes('11') ? 'hover' : 'noHover'}`} data-hour="11" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>11 AM</div>
        <div className={`hour ${avail.includes('12') ? 'hover' : 'noHover'}`} data-hour="12" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>12 PM</div>
        <div className={`hour ${avail.includes('13') ? 'hover' : 'noHover'}`} data-hour="13" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>1 PM</div>
        <div className={`hour ${avail.includes('16') ? 'hover' : 'noHover'}`} data-hour="16" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>4 PM</div>
        <div className={`hour ${avail.includes('17') ? 'hover' : 'noHover'}`} data-hour="17" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>5 PM</div>
        <div className={`hour ${avail.includes('18') ? 'hover' : 'noHover'}`} data-hour="18" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>6 PM</div>
        <div className={`hour ${avail.includes('19') ? 'hover' : 'noHover'}`} data-hour="19" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>7 PM</div>
        <div className={`hour ${avail.includes('20') ? 'hover' : 'noHover'}`} data-hour="20" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>8 PM</div>
        <div className={`hour ${avail.includes('21') ? 'hover' : 'noHover'}`} data-hour="21" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>9 PM</div>
        <div className={`hour ${avail.includes('22') ? 'hover' : 'noHover'}`} data-hour="22" onClick = {(e)=>toggleHour(e.target.dataset.hour)}>10 PM</div>
      </div>
    </div>
    <button id="submitAvailability" onClick = {onSubmission}>Submit Availability</button>
  </div>
  </div>
    )

}

export default Availability;