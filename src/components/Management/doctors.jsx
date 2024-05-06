import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./doctor.css"; // Import CSS file for styling

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [doctorsCount, setDoctorsCount] = useState(0);
    const [onlineCount, setOnlineCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filterOption, setFilterOption] = useState("all"); // State for filter option
    const { username } = useParams();
    const [searchResultFound, setSearchResultFound] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/getdoctors");
                let filteredDoctors = response.data;

                // Filter by search query
                if (searchQuery) {
                    filteredDoctors = filteredDoctors.filter(doctor =>
                        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                // Filter by status based on filter option
                switch (filterOption) {
                    case "available":
                        filteredDoctors = filteredDoctors.filter(doctor => doctor.status === 'available');
                        break;
                    case "offline":
                        filteredDoctors = filteredDoctors.filter(doctor => doctor.status === 'offline');
                        break;
                    default:
                        break;
                }

                setDoctors(filteredDoctors);
                setDoctorsCount(filteredDoctors.length);

                // Update online count based on filter option
                if (filterOption === "available") {
                    setOnlineCount(filteredDoctors.length);
                } else {
                    const onlineDoctors = filteredDoctors.filter(doctor => doctor.status === 'available');
                    setOnlineCount(onlineDoctors.length);
                }

                // Check if search result is found
                setSearchResultFound(filteredDoctors.length > 0);
            } catch (error) {
                alert("Unable to fetch doctors");
                console.log(error);
            }
        };

        fetchData();
    }, [searchQuery, filterOption]); // Run effect when searchQuery or filterOption changes

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

    // Handler for search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handler for filter option change
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    // Function to delete a doctor
    const handleDeleteDoctor = async (doctorId) => {
        try {
            await axios.delete(`http://localhost:4000/doctors/${doctorId}`);
            // Refetch data after deletion
            fetchData();
        } catch (error) {
            console.log("Error deleting doctor:", error);
        }
    };

    // Function to fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getdoctors");
            setDoctors(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
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
            <div>
                <input
                    type="text"
                    placeholder="Search doctors by name"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div>
                <select value={filterOption} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="offline">Offline</option>
                </select>
            </div>
            <Link to={`/m-doctorSignup`}><button>Add Doctor</button></Link>
            {username === "admin" && <button>Doctor requests</button>}
            <hr />
            <h1>Doctors</h1>
            {searchResultFound ? (
                <div className="card-container">
                    {doctors.map((doctor) => (
                        <div key={doctor._id} className={`doctorCard ${getStatusClass(doctor.status)}`}>
                            <h2>{doctor.name}</h2>
                            <p>Status: {doctor.status}</p>
                            <button onClick={() => handleDeleteDoctor(doctor._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No doctors found.</p>
            )}
        </div>
    );
}

export default Doctors;
