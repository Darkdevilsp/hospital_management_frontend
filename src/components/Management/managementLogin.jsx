import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagementLogin = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {user,setuser}=props

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/managementLogin', {
                username: username,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                setuser("management")
                navigate(`/m/${username}/Dashboard`);
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
                    <h2>Management Login</h2>
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
                    <p>New user? <Link to="/managementSignup">Signup Here</Link></p>
                    </div>
                </div>
                :
                user==="management"?
                    <p>You have already logged in</p>
                    :
                    <p>You are not a management</p>
            }
        </div>
    );
};

export default ManagementLogin;
