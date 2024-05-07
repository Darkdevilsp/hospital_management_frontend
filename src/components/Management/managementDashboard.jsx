import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Container,
    List,
    ListItem,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
    },
    appointmentsContainer: {
        width: "60%",
        marginTop: 60,
        padding: 20,
        background: "#f0f0f0",
        borderRadius: 10,
        position: 'absolute'
    },
    appointmentItem: {
        marginBottom: 10,
    },
});

function ManagementDashboard() {
    const classes = useStyles();
    const { username } = useParams();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:4000/allAppointments");
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    const handleReschedule = (appointmentId) => {
        // Implement reschedule functionality
        console.log("Reschedule appointment with ID:", appointmentId);
    };

    const handleDelete = (appointmentId) => {
        // Implement delete functionality
        console.log("Delete appointment with ID:", appointmentId);
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Today's Appointments
            </Typography>
            <Box className={classes.appointmentsContainer} style={{
                color: 'black',

            }}>
                <List>
                    {appointments.map((appointment) => (
                        <ListItem key={appointment._id} className={classes.appointmentItem}>
                            <Typography variant="body1" style={{
                                position: 'relative',
                                
                            }}>
                                Date: {appointment.date} | Time: {appointment.time} | Doctor: {appointment.doctor}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleReschedule(appointment._id)}
                                style={{
                                    position: 'absolute',
                                    right: '100px'
                                }}
                            >
                                Reschedule
                            </Button>
                            <Button style={{
                                position: 'absolute',
                                right: '10px'
                            }}
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDelete(appointment._id)}
                            >
                                Delete
                            </Button>
                            <Divider />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default ManagementDashboard;
