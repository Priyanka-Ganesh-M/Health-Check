import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { authContext } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom



function LogOut()
{
    const {dispatch} = useContext(authContext);
    const navigate = useNavigate();
    useEffect(()=>{
        handleLogOut();
    },[])

    function handleLogOut()
    {
    localStorage.removeItem('token');
    dispatch({ type: "LOGOUT" });
    navigate('/login');
    }
}
    
export default LogOut;

