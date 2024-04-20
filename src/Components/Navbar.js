// import React, { useState, useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCommentDots,
//   faBars,
//   faXmark,
//   faSignIn,
// } from "@fortawesome/free-solid-svg-icons";
// import "../Styles/Navbar.css";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {authContext} from "../Context/AuthContext.jsx"


// function Navbar() {
//   const [nav, setNav] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const {user, role, token} = useContext(authContext);
//   const openNav = () => {
//     setNav(!nav);
//   };
//   const handleBookAppointmentClick = () => {
//     window.location.href = "Health-Plus/appointment";
//   };

//   const handleChatBtnClick = () => {
//     if (!isButtonDisabled) {
//       toast.info("Experiencing high traffic, Please wait a moment.", {
//         position: toast.POSITION.TOP_CENTER,
//         onOpen: () => setIsButtonDisabled(true),
//         onClose: () => setIsButtonDisabled(false),
//       });
//     }
//   };

//   return (
//     <div className="navbar-section">
//       <h1 className="navbar-title">
//         <Link to="/">
//           Health<span className="navbar-sign">Sync</span>
//         </Link>
//       </h1>

//       {/* Desktop */}
//       <ul className="navbar-items">
//         <li>
//           <Link to="/" className="navbar-links">
//             Home
//           </Link>
//         </li>
//         <li>
//           <a href="#services" className="navbar-links">
//             Services
//           </a>
//         </li>
//         <li>
//           <a href="/Health-Plus/analyser" className="navbar-links">
//           Symptoms Analyser
//           </a>
//         </li>
      
        
//       </ul>
//       {user!=null ? <h1>{user.username}</h1> :
//       <a
//         className="navbar-btn"
//         href = "/Health-Plus/Login"
//         disabled={isButtonDisabled}
//       >
//         <FontAwesomeIcon icon={faSignIn} /> LogIn
//       </a>}

//       {/* Mobile */}
//       <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
//         <div onClick={openNav} className="mobile-navbar-close">
//           <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
//         </div>

//         <ul className="mobile-navbar-links">
//           <li>
//             <Link onClick={openNav} to="/">
//               Home
//             </Link>
//           </li>
//           <li>
//             <a onClick={openNav} href="#services">
//               Services
//             </a>
//           </li>
//           <li>
//             <a onClick={openNav} href="#about">
//               About
//             </a>
//           </li>
//           <li>
//             <a onClick={openNav} href="#reviews">
//               Reviews
//             </a>
//           </li>
//           <li>
//             <a onClick={openNav} href="#doctors">
//               Doctors
//             </a>
//           </li>
//           <li>
//             <a onClick={openNav} href="#contact">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Hamburger Icon */}
//       <div className="mobile-nav">
//         <FontAwesomeIcon
//           icon={faBars}
//           onClick={openNav}
//           className="hamb-icon"
//         />
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../Context/AuthContext.jsx";
import LogOut from "./Logout.js";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { user, role, token } = useContext(authContext);
  const [username, setUser] = useState('');
  useEffect(() => {
    // This function will be called whenever the 'user' value changes
    // You can add any logic here that needs to run when 'user' changes
    console.log(user);
    user ? 
    setUser(user.username) : setUser('');
  }, [user]); // This effect depends on the 'user' value

  const openNav = () => {
    setNav(!nav);
  };

  const handleBookAppointmentClick = () => {
    window.location.href = "Health-Plus/appointment";
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          Health<span className="navbar-sign">Sync</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Services
          </a>
        </li>
        <li>
          <a href="/Health-Plus/analyser" className="navbar-links">
            Symptoms Analyser
          </a>
        </li>

        {role == "Doctor" ? 
        <div>
        <li>
          <a href="/Health-Plus/appointments" className="navbar-links">
            Appointments
          </a>
        </li>
        </div> : <></>}

        {role == "Doctor" ? 
        <div>
        <li>
          <a href="/Health-Plus/setAvailability" className="navbar-links">
            Availability
          </a>
        </li>
        </div> : <></>}

      </ul>

      {/* Conditionally render based on user */}
      {user != null ? (
        <h5>{username}</h5>
      ) : (
        <a
          className="navbar-btn"
          href="/Health-Plus/Login"
          disabled={isButtonDisabled}
        >
          <FontAwesomeIcon icon={faSignIn} /> LogIn
        </a>
      )}

      {/* Conditionally render based on user */}
      {user != null ? (
        <a
          className="navbar-btn"
          href="/Health-Plus/Logout"
          disabled={isButtonDisabled}
          // onClick = {LogOut}
        >
          <FontAwesomeIcon icon={faSignIn} /> Logout
        </a>
      ) : (
        <></>
      )}

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
