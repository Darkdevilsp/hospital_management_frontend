import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Banner from '../Banner/Banner';
import DetailsChart from '../DetailsChart/DetailsChart';
import AlzheimerPrediction from '../Feedback/Feedback';  
import RadialChart from '../PatientAgeChart/RadialChart';
import UserInfo from '../UserInfo/UserInfo';

const Home = () => {
  return (
    <div style={{ paddingTop: '60px' }}> {/* Adjust padding to prevent navbar overlap */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Banner />
          <DetailsChart />
          <UserInfo />
        </Grid>
        <Grid item xs={12} md={4}>
          <AlzheimerPrediction />
          <Box style={{
            backgroundColor: '#f8f9fa', // Set a light background color for the box
            marginTop: '1rem',
            borderRadius: '0.3rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
            padding: '1rem', // Add padding
          }}>
            <Typography sx={{ fontSize: '1.2rem', textAlign: 'left', fontFamily: 'monospace' }}>
              <strong>Percentage of patients</strong>
            </Typography>
            <RadialChart />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
