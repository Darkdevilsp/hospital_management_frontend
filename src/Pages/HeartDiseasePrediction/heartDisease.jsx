import React, { useState } from 'react';
import axios from 'axios';

function HeartDisease() {
    const [prediction, setPrediction] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/predict', formData);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleForm = () => {
        const form = document.getElementById('form');
        form.classList.toggle('hide');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ width: '50%' }}>
                <div>
                    <h1 style={{ fontSize: '80px', fontWeight: '800', textAlign: 'center' }}>Save Heart</h1>
                    <p style={{ fontSize: '20px', textAlign: 'center' }}>This website is designed for to predict CAD's by using ML</p>
                </div>
                <div style={{ width: '50%', height: '40%' }}>
                    <button onClick={toggleForm} style={{ margin: '20px', height: '50%', width: '20%', position: 'relative', padding: '5px', borderRadius: '5px', marginLeft: '200px', fontSize: 'large', fontWeight: '500', color: 'black', transition: 'all 0.2s ease' }}>Check_out</button>
                    <form id="form" style={{ width: '50%', justifyContent: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', margin: '40px' }} className="hide" onSubmit={handleSubmit}>
                        <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="sex" value={formData.sex} onChange={handleInputChange} placeholder="Sex" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="cp" value={formData.cp} onChange={handleInputChange} placeholder="CP" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="trestbps" value={formData.trestbps} onChange={handleInputChange} placeholder="Trestbps" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="chol" value={formData.chol} onChange={handleInputChange} placeholder="Chol" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="fbs" value={formData.fbs} onChange={handleInputChange} placeholder="FBS" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="restecg" value={formData.restecg} onChange={handleInputChange} placeholder="Restecg" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="thalach" value={formData.thalach} onChange={handleInputChange} placeholder="Thalach" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="exang" value={formData.exang} onChange={handleInputChange} placeholder="Exang" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="oldpeak" value={formData.oldpeak} onChange={handleInputChange} placeholder="Oldpeak" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="slope" value={formData.slope} onChange={handleInputChange} placeholder="Slope" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="ca" value={formData.ca} onChange={handleInputChange} placeholder="CA" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <input type="number" name="thal" value={formData.thal} onChange={handleInputChange} placeholder="Thal" required style={{ justifyContent: 'right', width: '50px', flex: '1 0 140px' }} />
                        <button type="submit" style={{ width: '35%', margin: '5px', padding: '10px', backgroundColor: 'rgb(86, 83, 83)', color: 'white' }}>Predict</button>
                    </form>
                </div>
            </div>
            <div style={{ width: '50%' }}>
                <img src='C:\Users\srini\OneDrive\Documents\Final Year Project\hospital_management\hospital_management_frontend\static\img1.jpg' alt="heart" width="75%" height="75%" />
            </div>
            {prediction !== null && (
                <div>
                    <h1>Heart Disease Prediction Result</h1>
                    <p>The predicted result is: <span className="spa">{prediction}</span></p>
                    {prediction === 1 ? (
                        <p style={{ backgroundColor: 'red' }}>Sorry, You may be suffering from heart disease. Please consult a doctor.</p>
                    ) : (
                        <p style={{ backgroundColor: 'green' }}>Congratulations! You are perfectly alright.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default HeartDisease;
