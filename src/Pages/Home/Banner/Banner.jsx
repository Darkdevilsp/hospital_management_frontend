import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { FaAccessibleIcon, FaAmbulance, FaUserTie } from "react-icons/fa";
import { GiCherish } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { TbBed } from "react-icons/tb";
import { MdPersonPin } from "react-icons/md";
import axios from "axios";

const Banner = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount,setPatientCount]=useState(0)
  const [patients,setPatients]=useState()
  const [doctor,setDoctors]=useState()
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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getdoctors");
        let filteredDoctors = response.data;
        setDoctors(filteredDoctors);
        setDoctorCount(filteredDoctors.length)
      } catch (error) {
        alert("Unable to fetch doctors");
        console.log(error);
      }
    };
    fetchData();
  }, []);



  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'center', md: 'space-around', lg: 'space-around', xl: 'center' },
        alignItems: 'center',
        gap: '1rem 2.6rem',
        flexWrap: 'wrap',
        width: '100%',
        fontFamily: 'monospace'
      }}>
        <Paper elevation={2} sx={{ padding: '1rem', width: '14rem', }} >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <GiCherish style={{
                fontSize: '3rem',
                color: '#22577E',
                border: '2px solid #22577E',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>{doctorCount}</Typography>
              <p>Doctors</p>
            </div>
          </Box>

        </Paper>
        <Paper elevation={2} sx={{ padding: '1rem', width: '14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <FaAccessibleIcon style={{
                fontSize: '3rem',
                color: '#125B50',
                border: '2px solid #125B50',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>{patientCount}</Typography>
              <p>Patients</p>
            </div>
          </Box>

        </Paper>
        <Paper elevation={2} sx={{ padding: '1rem', width: '14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <FiUsers style={{
                fontSize: '3rem',
                color: '#1572A1',
                border: '2px solid #1572A1',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>452</Typography>
              <p>Staffs</p>
            </div>
          </Box>

        </Paper>

        <Paper elevation={2} sx={{ padding: '1rem', width: '14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <TbBed style={{
                fontSize: '3rem',
                color: '#0E3EDA',
                border: '2px solid #0E3EDA',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>142</Typography>
              <p>Beds</p>
            </div>
          </Box>
          <Typography>
            10 bed remaining usable
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ padding: '1rem', width: '14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <FaAmbulance style={{
                fontSize: '3rem',
                color: '#B33030',
                border: '2px solid #B33030',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>120</Typography>
              <p>Ambulence</p>
            </div>
          </Box>
          <Typography>
            19 Ambulence In service
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ padding: '1rem', width: '14rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div>
              <MdPersonPin style={{
                fontSize: '3rem',
                color: '#7B1EA2',
                border: '2px solid #7B1EA2',
                borderRadius: '20%',
                padding: '5px'
              }} />
            </div>
            <div>
              <Typography sx={{ fontWeight: '800' }}>12</Typography>
              <p>Representative</p>
            </div>
          </Box>
          <Typography>
            6 Representative is active
          </Typography>
        </Paper>
      </Box>

    </Box>
  )
}

export default Banner