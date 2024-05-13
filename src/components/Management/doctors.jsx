import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./doctor.css"; // Import CSS file for styling
import { Box, Button, Typography } from "@mui/material";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [doctorsCount, setDoctorsCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const { username } = useParams();
    const [searchResultFound, setSearchResultFound] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/getdoctors");
                let filteredDoctors = response.data;
                if (searchQuery) {
                    filteredDoctors = filteredDoctors.filter(doctor =>
                        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }
                setDoctors(filteredDoctors);
                setDoctorsCount(filteredDoctors.length);
                setSearchResultFound(filteredDoctors.length > 0);
            } catch (error) {
                alert("Unable to fetch doctors");
                console.log(error);
            }
        };

        fetchData();
    }, [searchQuery]); // Run effect when searchQuery changes

    // Handler for search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to delete a doctor
    async function handleDeleteDoctor  (doctorId) {
        console.log(doctorId)
        try {
            const response=await axios.delete(`http://localhost:4000/deletedoctors/${doctorId}`);
            console.log(response.data)
            if(response.data=="Deleted")
            {
                setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor._id !== doctorId));
            }
        } catch (error) {
            console.log("Error deleting doctor:", error);
        }
    };

    return (
        <div className="container" style={{justifyContent: 'center', position: 'relative', left: '30%', width: '600px', background: 'white', marginTop: '5%', color: 'black'}}>
            <div className="header">
                <h2>Total Doctors: {doctorsCount}</h2>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search doctors by name"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <Link to={`/m-doctorSignup`}><Button variant="contained"
                        color="secondary" fullWidth>Add Doctor</Button></Link>
            {username === "admin" && <button>Doctor requests</button>}
            <hr />
            <Typography variant="h5" gutterBottom>Doctors</Typography>
            {searchResultFound ? (
                <Box>
                    {doctors.map((doctor) => (
                        <div key={doctor._id} className="doctorCard">
                            <li>{doctor.name}
                            <Button color="secondary" sx={{position: 'relative', right: '0px'}} onClick={() => handleDeleteDoctor(doctor._id)}>Delete</Button></li>
                        </div>
                    ))}
                </Box>
            ) : (
                <p>No doctors found.</p>
            )}
        </div>
    );
}

export default Doctors;
