import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Patients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:4000/allpatients");
                setPatients(response.data);
                console.log(patients)
            } catch (error) {
                alert("Unable to fetch the data. Please reload the page.");
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        const filtered = patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
    }, [searchTerm, patients]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`http://localhost:4000/deletepatient/${id}`);
            if (response.data) {
                alert("Successfully deleted");
                setPatients(prevPatients => prevPatients.filter(patient => patient._id !== id));
            } else {
                alert("Failed to delete record");
            }
        } catch (error) {
            alert("Failed to delete patient");
            console.error(error);
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <ul>
                {filteredPatients.map(patient => (
                    <li key={patient._id}>
                        {patient.name}
                        <button onClick={() => handleDelete(patient._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Patients;
