import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import "./patient.css"


function PatientDashboard(props) {
    const { user,setuser, usingname,setUsingname } = props;
    const [appointments, setAppointments] = useState([]);
    const navigate =useNavigate();
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:4000/allAppointments");
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    function handleHdp() {
        navigate(`/p-hdp`)
    }

    return (
        <div className="patient-dashboard">
            {user === "None" ?
                <p>You don't have access to this page. Please go back to the home page and log in.</p>
                :
                user === "patient" ?
                    <div>
                        <h1>Welcome {usingname}</h1>
                        <div className="personal-details">
                            <h3>Personal Details</h3>
                            <p>Details</p>

                        </div>
                        <div className="bookings">
                            <Link to={`/p-appointment`}><button>Book Appointment</button></Link>
                            <button onClick={handleHdp}>Heart disease prediction</button>
                            <button>Past Records</button>
                        </div>
                        <div className="appointments">
                            <h4>Appointments</h4>
                            <ul>
                                {appointments.map((appointment) => {
                                    if (appointment.patientName === usingname) {
                                        return (
                                            <li key={appointment._id}>
                                                Date: {appointment.date} Time: {appointment.time} Doctor: {appointment.doctor}
                                                <button>Reschedule</button> <button>Delete</button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>
                        </div>
                    </div>
                    :
                    <p>You don't have access to this page.</p>
            }
        </div>
    );
}

export default PatientDashboard;
