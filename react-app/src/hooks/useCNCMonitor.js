// src/hooks/useCNCMonitor.js
import { useState, useEffect } from 'react';
import { fetchCNCData } from '../services/cncService';

const useCNCMonitor = (intervalTime = 1000) => {
  const [cncData, setCNCData] = useState({
    spindleSpeed: 0,
    temperature: 0,
    vibration: 0,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchCNCData();
      if (data) setCNCData(data);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime]);

  return cncData;
};

export default useCNCMonitor;
