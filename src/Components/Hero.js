import React, { useEffect, useState } from "react";
import Doctor from "../Assets/doctor-group.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  function handleAnalyser()
  {
    window.location.href = '/Health-Plus/analyser'
  }

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <h6 className="text-title">
            Find a Doctor and make an appointment
          </h6>
          
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
          <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
          </button>
          <br/><br/><br/><br/><br/><br/>
          <h6 className="text-title">
            Analyse your symptoms
          </h6>
          <button
            className="text-scheduler-btn"
            type="button"
            onClick={handleAnalyser}
          >
            <FontAwesomeIcon icon={faCalendarCheck} />  Symptoms Analyser
          </button>
          
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
