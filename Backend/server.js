const express = require('express');
const app = express();
const port = 5000;

// Dummy data for tourist footfall and prediction
const footfallData = [
  { date: '2025-01-01', count: 100 },
  { date: '2025-01-02', count: 120 },
  // Add other actual data here...
];

const predictionData = [
  { date: '2025-01-01', count: 110 },
  { date: '2025-01-02', count: 130 },
  // Add other predicted data here...
];

// API endpoint to get the footfall data and prediction
app.get('/api/footfall', (req, res) => {
  res.json({
    data: footfallData,  // Actual footfall data
    prediction: predictionData  // Prediction data
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
