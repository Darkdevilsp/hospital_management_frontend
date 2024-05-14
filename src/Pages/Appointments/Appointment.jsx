import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "./Appointment.css";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const { email } = useParams();
  const [doctorInfo, setDoctorInfo] = useState(null); // Initialize as null

  useEffect(() => {
    fetch(`http://localhost:5000/doctors/${doctorEmail}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setDoctorInfo(data))
      .catch((error) => console.error('Error fetching doctor info:', error));
  }, [email]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Handle form submission
  };

  // Render loading state while fetching doctorInfo
  if (!doctorInfo) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        background: "#fff",
        height: { md: "80vh", lg: "80vh", xs: "100%", sm: "100%" },
      }}
      style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <form onSubmit={handleSubmit} className="text-center">
        <Box className="appointment" sx={{ paddingTop: { md: "5rem", lg: "5rem" } }}>
          <Typography variant="h6" style={{ padding: "2rem 0", marginTop: "-1rem" }}>
            DOCTOR APPOINTMENT CHOSEN{" "}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Selected Doctor</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ background: "#6D67E4", borderRadius: "3px", color: "#fff" }}>
                {doctorInfo.name}
              </Typography>
            </Grid>
          </Grid>
          {/* Render other details similarly */}
        </Box>
        {/* Render form elements and other components */}
      </form>
    </Box>
  );
};

export default Appointment;
