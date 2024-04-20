import React, {useState} from 'react';
import axios from 'axios';
function Register()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Patient');

    async function handleSubmit(e)
    {
        e.preventDefault();
        console.log("role",role)
        await axios.post('http://localhost:4000/register',{username : username, password : password, role : role},{headers: {'Content-Type': 'application/json'}}).then((response)=>{
        console.log(response);
        if(response.statusText === 'OK') 
        {
            window.location.href = `/Health-Plus/Login`;
        }

        else
        {
        console.log('login failed');
        }
    }
)}
    return(
        <div>
        
        <div className="container mt-5">
        
        <h1>Register</h1>

        <div className="row">
            <div className="col-sm-8">
                <div className="card-body">

                <form>
                    <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="username" id = 'username' onChange = {(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" id = 'password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div><br></br>
                    <div className = "form-group">
                        <select id = "role" value = {role} style = {{"padding" : "5px", "borderRadius" : "5px"}} onChange = {(e)=>{setRole(e.target.value)}}>
                            <option value = "Patient">Patient</option>
                            <option value = "Doctor">Doctor</option>
                        </select><br/><br/>
                    </div>
                    <button type="submit" className="btn" style = {{backgroundColor : '#0d6efdd1'}} onClick={handleSubmit}>Register</button>
                </form>
                <p style = {{paddingLeft : '8px'}}>Don't have an account? <a href = '/Health-Plus/Login'>Log In</a></p>
                </div>
            </div>
            </div>
            </div>
            </div>
            
)
}

export default Register;