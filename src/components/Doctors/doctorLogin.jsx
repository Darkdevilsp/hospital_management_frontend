// src/components/DoctorLogin.js
import {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const DoctorLogin = (props) => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const {user,setuser,usingname,setUsingname}=props

    useEffect(() => {
        console.log(user)
    }, [setuser]);
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/doctorLogin', {
                email:Email,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                setuser("doctor")
                navigate(`/d-Dashboard`);
            } else {
                alert("User doesn't exist or incorrect credentials");
            }
        } catch (error) {
            console.error('Failed to login:', error);
            alert('Failed to login. Please try again.');
        }
    };

    return (
        <div>
            {user==="None"?

                <div className={"loginBox"}>
                    <h2 className='Title'>Doctor Login</h2>
                    <div className={"form-container"}>
                    <form>
                        <label>
                            Email
                            <input type="email" value={Email} placeholder={"Enter Email id"} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" value={password} placeholder={"Enter Password"} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <br />
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button><br/>
                    </form>
                        </div>
                </div>
                :
                user==="doctor"?
                    <p>You have already logged in</p>
                    :
                    <p>You are not a doctor</p>
            }
        </div>
    );
};

export default DoctorLogin;
