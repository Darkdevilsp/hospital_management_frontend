import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import back2 from "../../utils/back2.png"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled('div')({
    display: 'flex',
    backgroundImage: `url(${back2})`,
    width: '100%',
    height: '92vh',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledForm = styled('form')({
    position: 'relative',
    width: '400px',
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', // Box shadow for a card-like appearance
});


function AppointmentBooking(props) {
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const navigate = useNavigate()
    const { user, setuser, usingname, setUsingname } = props;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:4000/getdoctors");
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const generateTimeSlots = () => {
            const slots = [];
            const startTime = 9; // 9:00 am
            const endTime = 16; // 4:00 pm

            for (let hour = startTime; hour < endTime; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    slots.push(time);
                }
            }
            setTimeSlots(slots);
        };

        generateTimeSlots();
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Send selected data to the backend
        try {
            const response = await axios.post("http://localhost:4000/bookappointment", {
                patient: usingname,
                date: selectedDate,
                doctor: selectedDoctor,
                timeSlot: selectedTimeSlot
            });
            console.log("Appointment booked:", response.data);
            if (response.data === "Added successfully") {
                alert("Added successfully")
                navigate(`/p-Dashboard`)
            }
            else {
                alert("Failed to book")
            }

        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <StyledContainer>
            <StyledForm onSubmit={handleSubmit}>
                <InputLabel htmlFor="startDate">Date</InputLabel>
                <TextField
                    type="date"
                    name="startDate"
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    required
                    onChange={handleDateChange}
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Select Doctor</InputLabel>
                    <Select onChange={handleDoctorChange} required>
                        <MenuItem value="">Select a doctor</MenuItem>
                        {doctors.map((doctor) => (
                            <MenuItem key={doctor._id} value={doctor.email}>{doctor.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Select Time Slot</InputLabel>
                    <Select onChange={handleTimeSlotChange} required>
                        <MenuItem value="">Select a time slot</MenuItem>
                        {timeSlots.map((slot) => (
                            <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" fullWidth sx={{ backgroundColor: "#1572a1", color: 'white', marginTop: '20px', padding: '10px' }}
                >
                    Book Appointment
                </Button>
            </StyledForm>
        </StyledContainer>

    );
}

export default AppointmentBooking;
