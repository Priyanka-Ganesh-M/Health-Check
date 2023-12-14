import React, { useState } from 'react';


const Recommendations = () => {
    const [symptoms, setSymptoms] = useState('');
    const [prediction, setPrediction] = useState('');
  
    const handlePredict = async () => {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symptoms }),
        });
  
        const result = await response.json();
        setPrediction(result.final_prediction);
      } catch (error) {
        console.error('Error predicting:', error);
      }
    }
    return (
        <div>
          <input
            type="text"
            placeholder="Enter symptoms separated by commas"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button onClick={handlePredict}>Predict</button>
          <p>Prediction: {prediction}</p>
        </div>
      );
};

export default Recommendations;