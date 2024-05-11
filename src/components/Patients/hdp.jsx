import React, { useState } from 'react';
import heart from "../../utils/heart.png"
import { Box, Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material'; // Import Material-UI components


const Hdp = () => {
    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        cp: '',
        trestbps: '',
        chol: '',
        fbs: '',
        restecg: '',
        thalach: '',
        exang: '',
        oldpeak: '',
        slope: '',
        ca: '',
        thal: ''
    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch prediction');
            }
            const data = await response.json();
            setPrediction(data.prediction);
            if (prediction === 1) {
                alert("You may have a disease consult a doctor")
            }
            else {
                alert("You are healthy")
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };


    return (
        <div style={{
            backgroundImage: `url(${heart})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1600px'
        }}>
            <Box className="form-container" style={{
                width: '400px',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                color: 'black',
                position: 'relative',
                left: '25%',
                textAlign: 'left',
            }}>
                <h1 style={{
                    color: "purple"
                }}>Heart Disease Form</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="age">Age</label>
                    <input type="text" id="age" name="age" value={formData.age} onChange={handleChange}
                        placeholder="Your age.." /><br />
                    <div style={{
                        float: 'left',

                    }}>
                        <label htmlFor="sex">Sex</label>
                        <select id="sex" name="sex" value={formData.sex} onChange={handleChange} style={{ width: '100%', padding: '10px' }}>
                            <option value="">----select option----</option>
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                    </div>
                    <div style={{
                        float: 'right',
                        position: 'absolute',
                        width: '100%',


                    }}>
                        <label htmlFor="cp" style={{ textAlign: 'center', marginLeft: '30px' }} >Chest Pain Type</label>
                        <select id="cp" name="cp" value={formData.cp} onChange={handleChange} style={{ width: '50%', padding: '10px', marginLeft: '40%' }}>
                            <option value="">----select option----</option>
                            <option value="0">Typical Angina</option>
                            <option value="1">Atypical Angina</option>
                            <option value="2">Non-anginal Pain</option>
                            <option value="3">Asymptomatic</option>
                        </select>
                    </div>
                    <div style={{marginTop: '20%'}}>
                        <label htmlFor="trestbps">Resting Blood Pressure</label>
                        <input type="text" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleChange}
                            placeholder="A number in range [94-200] mmHg" /><br />
                    </div>
                    <label htmlFor="chol">Serum Cholesterol</label>
                    <input type="text" id="chol" name="chol" value={formData.chol} onChange={handleChange}
                        placeholder="A number in range [126-564] mg/dl" /><br />

                    <label htmlFor="fbs">Fasting Blood Sugar</label>
                    <select id="fbs" name="fbs" value={formData.fbs} onChange={handleChange} style={{ width: '100%', padding: '10px' }}>
                        <option value="">----select option----</option>
                        <option value="1">Greater than 120 mg/dl</option>
                        <option value="0">Less than 120 mg/dl</option>
                    </select><br />

                    <label htmlFor="restecg" style={{marginTop: '15px'}}>Resting ECG Results</label>
                    <select id="restecg" name="restecg" value={formData.restecg} onChange={handleChange} style={{ width: '100%', padding: '10px' }}>
                        <option value="">----select option----</option>
                        <option value="0">Normal</option>
                        <option value="1">Having ST-T wave abnormality</option>
                        <option value="2">Probable or definite left ventricular hypertrophy</option>
                    </select><br />

                    <label htmlFor="thalach" style={{marginTop: '15px'}}>Max Heart Rate</label>
                    <input type="text" id="thalach" name="thalach" value={formData.thalach} onChange={handleChange}
                        placeholder="A number in range [71-202] bpm" /><br />

                    <label htmlFor="exang">Exercise-induced Angina</label>
                    <select id="exang" name="exang" value={formData.exang} onChange={handleChange} style={{ width: '100%', padding: '10px' }}>
                        <option value="">----select option----</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select><br />

                    <label htmlFor="oldpeak" style={{marginTop: '15px'}}>ST Depression</label>
                    <input type="text" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange}
                        placeholder="ST depression, typically in [0-6.2]" /><br />

                    <label htmlFor="slope">Slope of the peak exercise ST segment</label>
                    <select id="slope" name="slope" value={formData.slope} onChange={handleChange} style={{ width: '100%', padding: '10px' }}>
                        <option value="">----select option----</option>
                        <option value="0">Upsloping</option>
                        <option value="1">Flat</option>
                        <option value="2">Downsloping</option>
                    </select><br />

                    <label htmlFor="ca" style={{marginTop: '15px'}}>Number of Major Vessels</label>
                    <input type="text" id="ca" name="ca" value={formData.ca} onChange={handleChange}
                        placeholder="Typically in [0-4]" /><br />

                    <label htmlFor="thal">Thalassemia</label>
                    <select id="thal" name="thal" value={formData.thal} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
                        <option value="">----select option----</option>
                        <option value="0">Normal</option>
                        <option value="1">Fixed Defect</option>
                        <option value="2">Reversible Defect</option>
                    </select><br />
                    <Button
                        type="submit"
                        value="Predict"
                        variant="contained"
                        color="secondary"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default Hdp;
