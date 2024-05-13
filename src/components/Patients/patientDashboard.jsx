import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import back2 from "../../utils/back2.png"

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
        <div className="patient-dashboard" style={{
            backgroundImage: `url(${back2})`,
            position: 'relative',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            fontFamily: 'Arial Narrow, sans-serif'
        }}>
            {user === "None" ?
                <p>You don't have access to this page. Please go back to the home page and log in.</p>
                :
                user === "patient" ?
                    <div maxWidth="lg">
                        <Typography sx={{ marginTop: '10px', color: 'black' }} variant="h5" gutterBottom>
                            Welcome {usingname}
                        </Typography>
                        <Box className="patient-details" sx={{
                            width: '40%',
                            background: 'white',
                            padding: '20px',
                            marginBottom: '70px',
                            left: '860px',
                            textAlign: 'center',
                            color: 'black',
                            overflow: "auto",
                            position: 'relative',
                        }}>
                            <Typography variant="h4" gutterBottom>
                                EDIT DETAILS
                            </Typography>
                            <form>
                                <div>
                                    <TextField
                                        type="text"
                                        label='Name'
                                        name="name"
                                        value={patientDetails.name}
                                        fullWidth
                                        margin="normal"
                                        placeholder={patientDetails.name}
                                        onChange={handleChange}
                                        disabled={!isEditing} />
                                </div>
                                <div>
                                    <TextField
                                        type="email"
                                        label="Email"
                                        margin="normal"
                                        fullWidth
                                        name="email"
                                        value={patientDetails.email}
                                        placeholder={patientDetails.email} disabled />
                                </div>
                                <div>
                                    <TextField
                                        type="text"
                                        label="Phone No"
                                        fullWidth
                                        name="phoneNo"
                                        margin="normal"
                                        value={patientDetails.phoneNo}
                                        placeholder={patientDetails.phoneNo}
                                        onChange={handleChange}
                                        disabled={!isEditing} />
                                </div>
                                <div>
                                    <TextField type="text"
                                        label="Address"
                                        fullWidth
                                        name="address"
                                        margin="normal"
                                        value={patientDetails.address}
                                        placeholder={patientDetails.address}
                                        onChange={handleChange}
                                        disabled={!isEditing} />
                                </div>
                                <div>
                                    <TextField type="text"
                                        label="Blood Group"
                                        fullWidth
                                        name="bloodGroup"
                                        margin="normal"
                                        value={patientDetails.bloodGroup}
                                        onChange={handleChange}
                                        disabled={!isEditing} />
                                </div>
                                <div>
                                    <TextField type="password"
                                        label="Password"
                                        fullWidth
                                        name="password"
                                        margin="normal"
                                        value={patientDetails.password}
                                        onChange={handleChange}
                                        disabled={!isEditing} />
                                </div>
                            </form>
                            {!isEditing && (
                                <Button sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '20px', padding: '10px' }}
                                    variant="contained" onClick={handleEdit} fullWidth>
                                    Edit
                                </Button>
                            )}
                            {isEditing && (
                                <>
                                    <Button variant="contained" sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '20px', padding: '10px' }}
                                        onClick={handleEdit}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '20px', padding: '10px' }}
                                        onClick={handleUpdate}>
                                        Update
                                    </Button>
                                </>
                            )}
                        </Box>
                        <Box className="appointments" sx={{
                            position: 'absolute',
                            background: 'transparent',
                            color: 'white',
                            top: '100px',

                        }}>
                            <Typography variant="h4" gutterBottom color={"black"}>
                                APPOINTMENTS
                            </Typography>
                            <ul>
                                {appointments.map((appointment) => {
                                    if (appointment.patientEmail === usingname) {
                                        return (
                                            <li key={appointment._id} style={{ color: 'black' }}>
                                                Date: {appointment.date} Time: {appointment.time} Doctor: {appointment.doctor}

                                                <Button variant="contained" color="secondary" sx={{ position: 'rekative', backgroundColor: "#1572a1", color: 'white', marginLeft: '10px' }} onClick={() => handleDelete(appointment._id)}>Delete</Button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>


                            <Box className="bookings" sx={{ textAlign: 'center' }}>
                                <Link to={`/p-appointment`} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" sx={{alignContent: 'space-around' ,mr: 1, position: 'relative', right: '0px', backgroundColor: "#1572a1", color: 'white', marginTop: '20px', padding: '10px' }}>
                                        Book Appointment
                                    </Button>
                                </Link>
                                <Button variant="contained"  onClick={handleHdp} sx={{mr: 1, position: 'relative', right: '0px', backgroundColor: "#1572a1", color: 'white', marginTop: '20px', padding: '10px' }}>
                                    Heart Disease Prediction
                                </Button>

                            </Box>
                        </Box>
                    </div>
                    :
                    <p>You don't have access to this page.</p>
            }
        </div >
    );
}

export default PatientDashboard;
