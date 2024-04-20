import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import LogIn from "./Components/LogIn";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import Recommendations from "./Components/Analyser";
import SeeAppointments from "./Pages/SeeAppointments";
import Register from "./Components/Regitser";
import LogOut from "./Components/Logout";
import Availability from "./Pages/Availability";
function App() {
  return (
    <div className="App">
      <Router basename="/Health-Plus">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Logout" element={<LogOut />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/setAvailability" element={<Availability />} />
          <Route path="/analyser" element={<Recommendations />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/appointments" element={<SeeAppointments/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
