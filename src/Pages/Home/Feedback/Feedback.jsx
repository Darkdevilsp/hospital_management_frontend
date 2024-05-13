import React, { useRef, useState } from 'react';
import { Button, Snackbar, TextField, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Feedback = () => {
  const form = useRef();
  const [predictionResult, setPredictionResult] = useState(null);

  function predictAlzheimer(e) {
    e.preventDefault();

    const formData = new FormData(form.current);
    const fileInput = document.querySelector('input[type="file"]');

    if (!fileInput.files.length) {
      alert('Please select an image.');
      return;
    }

    formData.append('file', fileInput.files[0]); // Use 'file' as the key for the uploaded image

    axios.post('http://localhost:5000/predict', formData)
      .then(response => {
        setPredictionResult(response.data.prediction); // Update state with the prediction result
      })
      .catch(error => {
        console.error('Error predicting Alzheimer\'s:', error);
      });
  }

  return (
    <div>
      <Box sx={{ background: 'white', textAlign: 'center', padding: '40px', borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom color={'black'} sx={{ padding: '14px' }}>
          ALZHIEMER'S DISEASE PREDICTION
        </Typography>
        <form onSubmit={predictAlzheimer} ref={form}>
          <TextField
            type="file"
            id="image-upload"
            sx={{ color: 'black' }}
            name="file" // Use 'file' as the name attribute for file input
            inputProps={{ accept: '.jpg, .jpeg, .png' }}
          />
          <Button type="submit" variant="contained"  sx={{
            marginTop: '10px', width: '85%', backgroundColor: "#1572a1", color: 'white'
          }}>
            Predict
          </Button>
        </form>
        {predictionResult && (
          <div>
            <h4>Prediction Result:</h4>
            <p>{predictionResult}</p>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Feedback;
