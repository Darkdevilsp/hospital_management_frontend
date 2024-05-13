import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import "./doctordashboard.css"

function DoctorDashboard(props) {
    const { user, usingname } = props;
    const [doctorDetails, setDoctorDetails] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        designation: '',
        phoneNo: '',
        address: '',
        password: ''
    });
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/doctorDetails?email=${encodeURIComponent(usingname)}`);
                setDoctorDetails(response.data);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        };
        fetchDoctorDetails();
    }, []);
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

    return (
        <div className="doctor-dashboard">
            {user === 'None' ? (
                <p>You don't have access to this page. Please go back to the home page and log in.</p>
            ) : user === 'doctor' ? (<div>
                <h1>Welcome {usingname}</h1>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around' }}>

                    <div className="doctor-details">
                        <Typography variant="h5" gutterBottom>
                            DOCTOR DETAILS
                        </Typography>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <TableContainer component={Paper} fullwidth >
                                <Table aria-label="doctor details table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Field</strong></TableCell>
                                            <TableCell><strong>Value</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Name</strong></TableCell>
                                            <TableCell>{doctorDetails.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Age</strong></TableCell>
                                            <TableCell>{doctorDetails.age}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Gender</strong></TableCell>
                                            <TableCell>{doctorDetails.gender}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Email</strong></TableCell>
                                            <TableCell>{doctorDetails.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Designation</strong></TableCell>
                                            <TableCell>{doctorDetails.designation}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Phone No</strong></TableCell>
                                            <TableCell>{doctorDetails.phoneNo}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Address</strong></TableCell>
                                            <TableCell>{doctorDetails.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Password</strong></TableCell>
                                            <TableCell>{doctorDetails.password}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    <div>
                        <Typography variant="h5" gutterBottom>
                            TODAY'S APPOINTMENTS
                        </Typography>
                        <ul>
                            {appointments.map((appointment) => {
                                if (appointment.doctor === usingname) {
                                    return (
                                        <li key={appointment._id}>
                                            Date: {appointment.date} Time: {appointment.time} patient: {appointment.patientEmail}

                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            </div>) : (
                <p>You don't have access to this page.</p>
            )}
        </div>
    );
}

export default DoctorDashboard;
