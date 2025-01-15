import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartZoom from 'chartjs-plugin-zoom';

// Register chart.js and the zoom plugin
ChartJS.register(...registerables, ChartZoom);

const App = () => {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tourist footfall data and prediction from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/footfall')  // Backend API
      .then(response => {
        setData(response.data.data); // Actual footfall data
        setPrediction(response.data.prediction); // Predicted footfall data
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Set up chart data for display
  const chartData = {
    labels: data.map(item => item.date), // Dates on the X-axis
    datasets: [
      {
        label: 'Tourist Footfall',
        data: data.map(item => item.count), // Tourist count on the Y-axis
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Predicted Footfall',
        data: prediction.map(item => item.count), // Prediction count on the Y-axis
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5], // Dashed line for prediction
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow resizing
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy', // Allow pan in both x and y directions
        },
        zoom: {
          enabled: true,
          mode: 'xy', // Allow zoom in both x and y directions
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Footfall Count',
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
      <h1>Tourist Footfall Dashboard</h1>
      {loading ? <p>Loading...</p> : <Line data={chartData} options={options} />}
    </div>
  );
};

export default App;
