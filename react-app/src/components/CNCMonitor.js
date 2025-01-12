// CNCMonitor.js
import React, { useEffect, useState } from 'react';
import { fetchCNCData } from '../services/cncService';

const CNCMonitor = () => {
  const [cncData, setCNCData] = useState({
    spindleSpeed: 0,
    temperature: 0,
    vibration: 0,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchCNCData();
      if (data) setCNCData(data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>CNC Machine Monitoring</h2>
      <p>Spindle Speed: {cncData.spindleSpeed} RPM</p>
      <p>Temperature: {cncData.temperature} °C</p>
      <p>Vibration: {cncData.vibration} mm/s</p>
    </div>
  );
};

export default CNCMonitor;
