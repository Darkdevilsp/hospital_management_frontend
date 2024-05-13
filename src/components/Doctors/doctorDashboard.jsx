import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
            ) : user === 'doctor' ? (
                <div>
                    <h1>Welcome {usingname}</h1>
                    <div className="doctor-details">
                        <h3>Doctor Details</h3>
                        <div>
                            <p><strong>Name:</strong> {doctorDetails.name}</p>
                            <p><strong>Age:</strong> {doctorDetails.age}</p>
                            <p><strong>Gender:</strong> {doctorDetails.gender}</p>
                            <p><strong>Email:</strong> {doctorDetails.email}</p>
                            <p><strong>Designation:</strong> {doctorDetails.designation}</p>
                            <p><strong>Phone No:</strong> {doctorDetails.phoneNo}</p>
                            <p><strong>Address:</strong> {doctorDetails.address}</p>
                            <p><strong>Password:</strong> {doctorDetails.password}</p>
                        </div>
                    </div>
                    <div>
                        <h3>TODAY APPOINTMENTS</h3>
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
                    {/* Other components and buttons */}
                </div>
            ) : (
                <p>You don't have access to this page.</p>
            )}
        </div>
    );
}

export default DoctorDashboard;
