import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DoctorDashboard(props) {
    const {user,setUser,usingname,setUsingname}=props
    const [appointments, setAppointments] = useState([]);
    const [fetchAppointmentsAgain, setFetchAppointmentsAgain] = useState(false); // State to trigger fetching appointments again

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("http://localhost:4000/allAppointments");
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [fetchAppointmentsAgain]); // Fetch appointments again whenever fetchAppointmentsAgain state changes

    const todayDate = new Date().toISOString().split("T")[0];

    async function handleTreat(id) {
        try {
            const response = await axios.delete("http://localhost:4000/deleteAppointment", { data: { id } });
            if (response.data === "Treated") {
                alert("Treated");
                // Set fetchAppointmentsAgain state to true to trigger fetching appointments again
                setFetchAppointmentsAgain(prevState => !prevState);
            } else {
                alert("Failed from server");
            }
        } catch (err) {
            alert("Failed to treat");
        }
    }

    return (
        <div>
            <h1>Welcome {usingname}</h1>
            <div>
                <h4>Today's Appointments</h4>
                <ul>
                    {appointments.map((appointment) => {
                        if (appointment.doctor === usingname && appointment.date === todayDate) {
                            return (
                                <li key={appointment._id}>
                                    Time: {appointment.time} Patient: {appointment.patientName}
                                    <button onClick={() => handleTreat(appointment._id)}>Treat</button>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default DoctorDashboard;
