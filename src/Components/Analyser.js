import React, { useState } from 'react';


const Recommendations = () => {
  const [symptoms, setSymptoms] = useState('');
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);

  const getRecommendedDoctors = async () => {
    setRecommendedDoctors();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your symptoms here"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={getRecommendedDoctors}>Submit</button>
      <ul>
        {recommendedDoctors.map((doctor, index) => (
          <li key={index}>{doctor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;