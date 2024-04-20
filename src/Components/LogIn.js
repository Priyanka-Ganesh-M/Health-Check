// import {React,useState, useContext} from 'react';
// import axios from 'axios';
// import {authContext} from '../Context/AuthContext.jsx'

// function LogIn()
// {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('Patient');
//     const {dispatch} = useContext(authContext);
//     const [loading, setLoading] = useState('false');
//     async function handleSubmit(e)
//     {
//         e.preventDefault();
//         try{
//         console.log(username, password, role);
//         const response = await axios.post('http://localhost:4000/login',{username : username, password : password, role : role},{headers: {'Content-Type': 'application/json'}}); 
        
//         // console.log(response.data);
//         if(response.data != null) 
//         {
//             dispatch({
//                 type  :"LOGIN_SUCCESS",
//                 payload : {
//                     user : response.data.user,
//                     token : response.data.accessToken,
//                     role : response.data.role
//                 }
//             })
//             console.log(dispatch)
//             setLoading('false');
//             // window.location.href = `/Health-Plus/Home`;
//         }
//         else
//         {
//             throw new Error(response.message);
//             setLoading('false');
//         }
      
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
//     }
//     return(
//         <div className="container mt-5">
//         {/* <DesktopNav home_url = {`/employers/${id}`} url2 ={`/employer/applications/${id}`} logIn = '/employer/log-in' url3 = '/' Home = 'Home' Title2 = 'Search Applications' Title3 = 'Search Job'/> */}
        
//         <h1>Log In</h1>
//         <div className="row">
//             <div className="col-sm-8">
//                 <div className="card-body">

//                 <form>
//                     <div className="form-group">
//                     <label>Email</label>
//                     <input type="text" className="form-control" name='username' id = 'username' onChange = {(e)=>{setUsername(e.target.value)}}/>
//                     </div>
//                     <div className="form-group">
//                     <label >Password</label>
//                     <input type="password" className="form-control" name='password' id = 'password' onChange={(e)=>{setPassword(e.target.value)}}/>
//                     </div><br></br>
//                     <div className = "form-group">
//                         <select id = "role" value = {role} style = {{"padding" : "5px", "borderRadius" : "5px"}} onChange = {(e)=>{setRole(e.target.value)}}>
//                             <option value = "Patient" >Patient</option>
//                             <option value = "Doctor" >Doctor</option>
//                         </select><br/><br/>
//                     </div>
//                     <button type="submit" className="btn" style = {{backgroundColor : '#0d6efdd1'}} onClick={handleSubmit}>Log In</button>
//                 </form>
            
//                 </div>
//                 <p style = {{paddingLeft : '8px'}}>Don't have an account? <a href = '/Health-Plus/register'>Register</a></p>
//             </div>
//             </div>
            
//             </div>
// )
// }

// export default LogIn;

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { authContext } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Patient');
    const { dispatch } = useContext(authContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate function

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(username, password, role);
            const response = await axios.post(
                'http://localhost:4000/login',
                { username, password, role },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data != null) {
                console.log("data",response.data);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: response.data.data.user,
                        token: response.data.data.accessToken,
                        role: response.data.data.role
                    }
                });
                console.log(response.data)
                navigate('/Home'); // Navigate to Home page
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5">
            <h1>Log In</h1>
            <div className="row">
                <div className="col-sm-8">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <select
                                    id="role"
                                    value={role}
                                    style={{ padding: '5px', borderRadius: '5px' }}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="Patient">Patient</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                                <br />
                                <br />
                            </div>
                            <button
                                type="submit"
                                className="btn"
                                style={{ backgroundColor: '#0d6efdd1' }}
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Logging In...' : 'Log In'}
                            </button>
                        </form>
                    </div>
                    <p style={{ paddingLeft: '8px' }}>
                        Don't have an account? <a href="/Health-Plus/register">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
