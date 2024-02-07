import {useParams} from "react-router-dom";
// import {useState} from "react";
//import axios from "axios";

function PatientDashboard(props){
    const {user,setuser}=props
    const {username}=useParams()


    return (
        <div>
            {user==="None"?
                <p>You Dont have access to this page go back to home and login</p>
                :
                user==="patient"?
                    <div>
                        <h1>welcome {username}</h1>
                        <div className={"personalDetails"}>
                            <h3>Personal Details</h3>
                            <p>details</p>
                        </div>
                        <div className={"bookings"}>
                            <button>Book Appointment</button>
                            <button>Diagnosis</button>
                            <button>Past records</button>
                        </div>
                    </div>
                    :
                    <p>You dont have access to this page</p>
            }

        </div>
    )
}
export default PatientDashboard