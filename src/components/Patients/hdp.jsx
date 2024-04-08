import React, { useState } from 'react';
import './hdp.css';

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
            const response = await fetch('https://your-backend-url.com/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Optionally handle the response from the server
            const responseData = await response.json();
            console.log(responseData); // You can do something with the response from the server

            // Optionally reset the form after successful submission
            setFormData({
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

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <div className="form-container">
            <h1>Heart Disease Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Age:
                    <input type="text" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Sex:
                    <input type="text" name="sex" value={formData.sex} onChange={handleChange} />
                </label>
                <br />
                <label>
                    CP:
                    <input type="text" name="cp" value={formData.cp} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Trestbps:
                    <input type="text" name="trestbps" value={formData.trestbps} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Chol:
                    <input type="text" name="chol" value={formData.chol} onChange={handleChange} />
                </label>
                <br />
                <label>
                    FBS:
                    <input type="text" name="fbs" value={formData.fbs} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Restecg:
                    <input type="text" name="restecg" value={formData.restecg} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Thalach:
                    <input type="text" name="thalach" value={formData.thalach} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Exang:
                    <input type="text" name="exang" value={formData.exang} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Oldpeak:
                    <input type="text" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Slope:
                    <input type="text" name="slope" value={formData.slope} onChange={handleChange} />
                </label>
                <br />
                <label>
                    CA:
                    <input type="text" name="ca" value={formData.ca} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Thal:
                    <input type="text" name="thal" value={formData.thal} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Hdp;
