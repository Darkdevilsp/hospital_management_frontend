import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./doctor.css"; // Import CSS file for styling
import { Box, Button, Typography, TextField } from '@mui/material';
import back2 from "../../utils/back2.png"

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
    }, [searchQuery,setDoctors]); // Run effect when searchQuery changes

    // Handler for search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to delete a doctor
    async function handleDeleteDoctor(doctorId) {
        console.log(doctorId)
        try {
            const response = await axios.delete(`http://localhost:4000/deletedoctors/${doctorId}`);
            console.log(response.data)
            if (response.data == "Deleted") {
                setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor._id !== doctorId));
                setDoctorsCount(doctors.length);

            }
        } catch (error) {
            console.log("Error deleting doctor:", error);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${back2})`,
            backgroundSize: 'cover',
            minHeight: '87vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black'
        }}>
            <Box
                sx={{
                    maxWidth: '600px',
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography variant="h4" textAlign={"center"} gutterBottom>
                    Total Doctors: {doctorsCount}
                </Typography>
                <TextField
                    type="text"
                    placeholder="Search doctors by name"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    fullWidth
                    margin="normal"
                />
                <Link to="/m-doctorSignup">
                    <Button variant="contained" sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '20px'}}
                        fullWidth>
                        Add Doctor
                    </Button>
                </Link>
                {username === "admin" && (
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        Doctor requests
                    </Button>
                )}
                <hr style={{ margin: '20px 0' }} />
                <Typography variant="h5" gutterBottom>
                    Doctors
                </Typography>
                {searchResultFound ? (
                    <Box>
                        {doctors.map((doctor) => (
                            <div
                                key={doctor._id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '10px'
                                }}
                            >
                                <Typography variant="body1">{doctor.name}</Typography>
                                <Button
                                    sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '20px'}}
                                    onClick={() => handleDeleteDoctor(doctor._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body1">No doctors found.</Typography>
                )}
            </Box>
        </div>
    );
}

export default Doctors;
