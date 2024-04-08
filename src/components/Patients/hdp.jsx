import React, { useState } from 'react';

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
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Prediction failed');
            }
            const result = await response.json();
            console.log(result);
            // Handle the prediction result here
        } catch (error) {
            console.error('Prediction error:', error);
        }
    };

    return (
        <div className="main">
            <div className="divi">
                <div>
                    <h1 className="header">Save Heart</h1>
                    <p>This website is designed to predict CAD's by using ML</p>
                </div>
                <div className="box">
                    <form className="fo" onSubmit={handleSubmit}>
                        {/* Input fields here */}
                        <div className="btn">
                            <input className="submit" type="submit" value="Predict" />
                            <input className="reset" type="reset" value="Reset" />
                        </div>
                    </form>
                </div>
                <button id="predict">Check Out</button>
            </div>
            <div className="side_img">
                <img src={require('./img1.jpg')} alt="heart" width="75%" height="75%" />
            </div>
        </div>
    );
};

export default Hdp;
