import {Link, useNavigate} from "react-router-dom";
import  {useState} from "react";
import axios from "axios";


function ManagementSignup(props)
{
    const [name2,setName2]=useState()
    const [username2,setUsername2]=useState()
    const [password2,setPassword2]=useState()
    const navigate = useNavigate();
    const {user,setUser}=props

    async function handleSignup() {
        try {
            const response = await axios.post("http://localhost:4000/managementSignup", {
                name: name2,
                username: username2,
                password: password2,
            });

            const ans = response.data;
            console.log("ans: " + ans);

            if (ans === "User already exists") {
                alert(ans);
            } else if (ans === "Added successfully") {
                alert(ans);
                navigate('/managementLogin');
            } else {
                alert(ans);
            }
        } catch (err) {
            console.error("Error during signup:", err);
            if (err.response) {
                if (err.response.status === 409) {
                    alert("User with the same username already exists");
                } else {
                    console.error("Server responded with:", err.response.data);
                }
            }
        }
    }

    function handlePassword(x) {
        setPassword2(x);
    }

    function handleUsername(x) {
        setUsername2(x);
    }

    function handleName(x) {
        setName2(x);
    }

    return (
        <div>
            {user==="Admin"?
        <div className={"signupBox"}>
            <h2>MANAGEMENT SIGNUP</h2>
            <div className={"signform-container"}>
            <form className={"signup"}>
                <label>
                    Name:<br />
                    <input type={"text"} value={name2} placeholder={"Enter your name"} onChange={(e) => handleName(e.target.value)} />
                </label>
                <br />
                <label>
                    Username:<br />
                    <input type="text" placeholder={"Enter username"} value={username2} onChange={(e) => handleUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:<br />
                    <input type="password" placeholder={"Enter password"} value={password2} onChange={(e) => handlePassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleSignup}>
                    SIGNUP
                </button>
                <br />
                Already have an account? <Link to={"/managementLogin"}>LOGIN</Link>
            </form>
            </div>
        </div>
    :
        <p>Only admins has access to this page</p>
            }
        </div>
    );
}
export default ManagementSignup