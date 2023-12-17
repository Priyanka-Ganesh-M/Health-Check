import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Components/Navbar";

const SeeAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Fetch appointments from your API endpoint
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:4000/appointments');
        setAppointments(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []); // Run the effect only once on component mount

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div>
    <Navbar />
    <div style={{ display: 'flex' , 'margin' : '40px 40px 40px 0px'}}>
      {/* Sidebar with Appointments List */}
      <div style={{ width: '200px', backgroundColor: '#1A8EFD', padding: '10px' }}>
        <h2>Appointments</h2><br/>
        <ul>
        <hr></hr><br/>
          {appointments.map(appointment => (
            <li key={appointment.id} onClick={() => handleAppointmentClick(appointment)}>
              {appointment.start_time} - {appointment.doctor}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Appointment Details</h1><br/>
        {selectedAppointment ? (
          <div  style = {{'boxShadow' : '0 0 10px rgba(255, 255, 255, 1)', 'background': 'linear-gradient(#3498db, rgb(255, 255, 255)', 'padding' : '5px'}}>
            <h2>{selectedAppointment.doctor}</h2><br/>
            <p>Date: {selectedAppointment.start_time}</p>
            <p>Date: {selectedAppointment.date}</p><br/>
            <button style = {{'padding' : '3px', 'borderRadius' : '3px solid white'}} >Cancel Appointment</button><br/>
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
