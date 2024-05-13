import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Banner from '../Banner/Banner';
import DetailsChart from '../DetailsChart/DetailsChart';
import Feedback from '../Feedback/Feedback';  // Import the AlzheimerPrediction component
import RadialChart from '../PatientAgeChart/RadialChart';
import TodaysDoctors from '../TodaysDoctors/TodaysDoctors';
import UserInfo from '../UserInfo/UserInfo';
import back2 from "../../../utils/back2.png"

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${back2})`,
      marginBottom: '82px', width: '1523px',
      marginTop: '15px'
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Banner></Banner>
          <DetailsChart></DetailsChart>
        </Grid>
        <Grid item xs={12} md={4}>
          <Feedback></Feedback>
          <Box style={{
            backgroundColor: '#fff',
            marginTop: '8%',
            borderRadius: '0.3rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
          }}>

            <Typography sx={{ fontSize: '1.2rem', textAlign: 'left', paddingLeft: '20px', paddingTop: '12px', fontFamily: 'monospace', color: 'black' }}><strong>Percentage of patients</strong></Typography>
            <RadialChart ></RadialChart>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
