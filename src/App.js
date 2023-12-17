import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import Recommendations from "./Components/Analyser";
import SeeAppointments from "./Pages/SeeAppointments";
function App() {
  return (
    <div className="App">
      <Router basename="/Health-Plus">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/analyser" element={<Recommendations />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/appointments" element={<SeeAppointments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
