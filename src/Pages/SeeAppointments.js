import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Components/Navbar";

function SeeAppointments() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      axios.get('http://localhost:4000/doctors/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        setAppointments(response.data.appointments);
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', 'margin': '40px 40px 40px 0px' }}>
        <div style={{ width: '300px', backgroundColor: '#1A8EFD', padding: '10px' }}>
          <h2>Appointments</h2><br />
          <ul>
            <hr></hr><br />
            <div>
              {appointments?.map((appointment) => {
                return (
                  <div key={appointment._id}><li onClick={() => handleAppointmentClick(appointment)}>{`${appointment.date} ${appointment.time}`}</li></div>
                )
              }
              )}
            </div>
          </ul>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1>Appointment Details</h1><br />
          {selectedAppointment != null? (
            <div >
              <h2>{selectedAppointment.patientName}</h2><br />
              <p>Time: {selectedAppointment.time}</p>
              <p>Date: {selectedAppointment.date}</p><br />
              {/* <button style={{ 'padding': '3px', 'borderRadius': '3px solid white' }}>Cancel Appointment</button><br /> */}
              {/* Add more details as needed */}
            </div>
          ) : (
            <p>Select an appointment to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeAppointments;
