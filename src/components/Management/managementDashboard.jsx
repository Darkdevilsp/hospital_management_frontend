import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


function ManagementDashboard() {
    const username=useParams()
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
        <div className="App">
            <>
                <h2>Today Appointments</h2>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        Date: {appointment.date} Time: {appointment.time} Doctor: {appointment.doctor}
                        <button>Reschedule</button> <button>Delete</button>
                    </li>
                ))}
            </>


            <div className={"m-doctors"}>

            </div>

        </div>
    );
}

export default ManagementDashboard;
