import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './patientlogin.css';

function PatientLogin (props) {
    // eslint-disable-next-line react/prop-types
    const {user,setuser}=props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/patientLogin', {
                username: username,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                setuser("patient")
                console.log(user)
                navigate(`/p/${username}/Dashboard`);

            } else {
                alert("User doesn't exist or incorrect credentials");
            }
        } catch (error) {
            console.error('Failed to login:', error);
            alert('Failed to login. Please try again.');
        }
    };

    return (
        <div className={"loginBox"}>
            {user==="patient"?
                <div>
                    <h1>you have already logged in </h1>
                </div>
                : user==="None"?
                <div>
                    <h2>Patient Login</h2>
                    <div className={"form-container"}>

                        <form onSubmit={handleLogin}>
                            <label>
                                Username:
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </label>
                            <br />
                            <label>
                                Password:
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <br />
                            <button type="submit">Login</button>
                        </form>
                        <p>New user? <Link to="/patientSignup">Signup Here</Link></p>
                    </div>
                </div>
                    :
                    <div>
                        <h1>you dont have access to this page</h1>
                    </div>
            }

        </div>
    );
}

export default PatientLogin;
