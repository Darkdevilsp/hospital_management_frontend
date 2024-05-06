import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AppointmentBooking(props) {
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const navigate=useNavigate()
    const { user,setuser, usingname,setUsingname } = props;

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
                patient:usingname,
                date: selectedDate,
                doctor: selectedDoctor,
                timeSlot: selectedTimeSlot
            });
            console.log("Appointment booked:", response.data);
            if(response.data==="Added successfully")
            {
                alert("Added successfully")
                navigate(`/p-Dashboard`)
            }
            else{
                alert("Failed to book")
            }

        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="startDate">Date</label>
                <input
                    type="date"
                    name="startDate"
                    min={new Date().toISOString().split("T")[0]}
                    required
                    onChange={handleDateChange}
                />
                <label htmlFor="doctors">Select Doctor</label>
                <select onChange={handleDoctorChange} required>
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.username}>{doctor.name}</option>
                    ))}
                </select>
                <label htmlFor="timeSlots">Select Time Slot</label>
                <select onChange={handleTimeSlotChange} required>
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
                <br/>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
}

export default AppointmentBooking;
