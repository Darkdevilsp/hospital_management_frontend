import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PatientDashboard(props) {
    const { user, setuser } = props;
    const { username } = useParams();
    const [appointments, setAppointments] = useState([]);

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

    return (
        <div className="patient-dashboard">
            {user === "None" ?
                <p>You don't have access to this page. Please go back to the home page and log in.</p>
                :
                user === "patient" ?
                    <div>
                        <h1>Welcome {username}</h1>
                        <div className="personal-details">
                            <h3>Personal Details</h3>
                            <p>Details</p>
                        </div>
                        <div className="bookings">
                            <Link to={`/p/${username}/appointment`}><button>Book Appointment</button></Link>
                            <Link to={'/p/:username/heartDisease'}><button>Heart disease prediction</button></Link>
                            <button>Past Records</button>
                        </div>
                        <div className="appointments">
                            <h4>Appointments</h4>
                            <ul>
                                {appointments.map((appointment) => {
                                    if (appointment.patientName === username) {
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
