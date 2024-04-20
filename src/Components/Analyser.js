import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Recommendations = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {
    try {
      await axios.post('http://localhost:5000/predict-specialization',{symptoms : symptoms},{headers: {'Content-Type': 'application/json'}}).then((response)=>{
        // Update the state with the prediction
      setPrediction(response.data.prediction);

      
      });


    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div style={styles.new}>
    <Navbar/>
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Enter symptoms separated by commas"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        style={styles.input}
      />
      <button onClick={handlePredict} style={styles.button}>
        Predict
      </button>
      <p style={styles.prediction}>Prediction: {prediction}</p>
    </div>
    </div>
  );
};

const styles = {
  new:{
    
    background: 'linear-gradient(to right, #1A8EFD, #1A8EFD)'
  },
  container: {
   
    margin:'100px',
    backgroundColor: '#1A8EFD',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '10px',
    margin: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '80%',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    margin: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#54de54',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  prediction: {
    fontSize: '18px',
    
  },
};

export default Recommendations;