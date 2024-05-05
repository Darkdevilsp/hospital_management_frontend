import React, { useRef, useState } from 'react';
import { Button, Snackbar, TextField, IconButton } from '@mui/material';
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
      <h3>Alzheimer's Prediction</h3>
      <form onSubmit={predictAlzheimer} ref={form}>
        <TextField
          type="file"
          id="image-upload"
          name="file" // Use 'file' as the name attribute for file input
          inputProps={{ accept: '.jpg, .jpeg, .png' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Predict
        </Button>
      </form>
      {predictionResult && (
        <div>
          <h4>Prediction Result:</h4>
          <p>{predictionResult}</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
