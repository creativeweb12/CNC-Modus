const express = require('express');
const { SerialPort } = require('serialport');  // ✅ Corrected Import
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Adjust the COM port based on your Arduino's port
const cncPort = new SerialPort({
  path: 'COM4',     // Replace with your Arduino COM port
  baudRate: 115200,
  autoOpen: true,
});

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('CNC Backend is running.');
});


// CNC Status Route
app.get('/cnc/status', (req, res) => {
  // Replace this with actual CNC machine status logic if available
  const status = {
    machine: 'CNC Router',
    state: 'Idle',  // Possible states: 'Idle', 'Running', 'Paused', 'Error'
    lastCommand: 'None',
    timestamp: new Date(),
  };

  res.status(200).json(status);
});


// CNC command route
app.post('/cnc/command', (req, res) => {
  const { command } = req.body;
  cncPort.write(`${command}\n`, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to send command.' });
    }
    res.send({ message: `${command} sent to CNC.` });
  });
});

// API endpoint to get CNC machine insights
app.get('/api/insights', async (req, res) => {
  try {
    const data = await getCNCInsights();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send('Error fetching CNC insights');
  }
});

// G-code route
app.post('/cnc/gcode', (req, res) => {
  const { gcode } = req.body;
  cncPort.write(`${gcode}\n`, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to send G-code.' });
    }
    res.send({ message: `G-code "${gcode}" sent.` });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});




