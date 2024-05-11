import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./patient.css";
import axios from "axios";

function PatientDashboard(props) {
    const { user, setuser, usingname, setUsingname } = props;
    const [patientDetails, setPatientDetails] = useState({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        bloodGroup: "",
        password: ""
    });
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();


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
    }, []);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const url = `http://localhost:4000/patientDetails?email=${encodeURIComponent(usingname)}`;
                const response = await fetch(url);
                const data = await response.json();
                setPatientDetails(data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };
        fetchPatientDetails();
    }, []);



    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/updatePatientDetails/${patientDetails._id}`, patientDetails, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setPatientDetails(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating patient details:", error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails({ ...patientDetails, [name]: value });
    };

    const handleHdp = () => {
        navigate(`/p-hdp`);
    };
    const handleReschedule = async (id) => {
        // Implement rescheduling logic here
        console.log(`Rescheduling appointment with ID ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/deleteAppointment/${id}`);
            if (response.data === "Deleted") {
                alert("Appointment deleted successfully");
                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== id));
            } else {
                alert("Failed to delete appointment");
            }
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert("Failed to delete appointment");
        }
    };


    return (
        <div className="patient-dashboard">
            {user === "None" ?
                <p>You don't have access to this page. Please go back to the home page and log in.</p>
                :
                user === "patient" ?
                    <div>
                        <h1>Welcome {usingname}</h1>
                        <div className="patient-details">
                            <h3>Patient Details</h3>
                            <form>
                                <div>
                                    <label>Name:</label>
                                    <input type="text" name="name" value={patientDetails.name} placeholder={patientDetails.name} onChange={handleChange} disabled={!isEditing} />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input type="email" name="email" value={patientDetails.email} placeholder={patientDetails.email} disabled />
                                </div>
                                <div>
                                    <label>Phone No:</label>
                                    <input type="text" name="phoneNo" value={patientDetails.phoneNo} placeholder={patientDetails.phoneNo} onChange={handleChange} disabled={!isEditing} />
                                </div>
                                <div>
                                    <label>Address:</label>
                                    <input type="text" name="address" value={patientDetails.address} placeholder={patientDetails.address} onChange={handleChange} disabled={!isEditing} />
                                </div>
                                <div>
                                    <label>Blood Group:</label>
                                    <input type="text" name="bloodGroup" value={patientDetails.bloodGroup}  onChange={handleChange} disabled={!isEditing} />
                                </div>
                                <div>
                                    <label>Password:</label>
                                    <input type="password" name="password" value={patientDetails.password} onChange={handleChange} disabled={!isEditing} />
                                </div>
                            </form>
                            {!isEditing && <button onClick={handleEdit}>Edit</button>}
                            {isEditing && <button onClick={handleEdit}>Cancel</button>}
                            {isEditing && <button onClick={handleUpdate}>Update</button>}
                        </div>
                        <div className="appointments">
                            <h4>Appointments</h4>
                            <ul>
                                {appointments.map((appointment) => {
                                    if (appointment.patientEmail === usingname) {
                                        return (
                                            <li key={appointment._id}>
                                                Date: {appointment.date} Time: {appointment.time} Doctor: {appointment.doctor}
                                                <button onClick={() => handleReschedule(appointment._id)}>Reschedule
                                                </button>
                                                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>

                        </div>
                        <div className="bookings">
                            <Link to={`/p-appointment`}>
                                <button>Book Appointment</button>
                            </Link>
                            <button onClick={handleHdp}>Heart disease prediction</button>
                            <button>Past Records</button>
                        </div>
                    </div>
                    :
                    <p>You don't have access to this page.</p>
            }
        </div>
    );
}

export default PatientDashboard;
