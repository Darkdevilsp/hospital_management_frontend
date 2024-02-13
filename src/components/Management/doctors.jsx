import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./doctor.css"; // Import CSS file for styling

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [doctorsCount, setDoctorsCount] = useState(0);
    const [onlineCount, setOnlineCount] = useState(0);
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/getdoctors");
                setDoctors(response.data);
                setDoctorsCount(response.data.length);
                const onlineDoctors = response.data.filter(doctor => doctor.status !== 'offline');
                setOnlineCount(onlineDoctors.length);
            } catch (error) {
                alert("Unable to fetch doctors");
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Function to get class name based on doctor status
    const getStatusClass = (status) => {
        switch (status) {
            case "offline":
                return "offline";
            case "available":
                return "available";
            case "busy":
                return "busy";
            default:
                return "";
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="count">
                    <h2>Total Doctors: {doctorsCount}</h2>
                    <h2>Online Doctors: {onlineCount}</h2>
                </div>

            </div>
            <br/>
            <Link to={`/m/${username}/doctorSignup`}><button>Add Doctor</button></Link>
            {username === "admin" && <button>Doctor requests</button>}
            <hr />
            <h1>Doctors</h1>
            <div className="card-container">
                {doctors.map((doctor) => (
                    <div key={doctor._id} className={`doctorCard ${getStatusClass(doctor.status)}`}>
                        <h2>{doctor.name}</h2>
                        <p>Status: {doctor.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;
