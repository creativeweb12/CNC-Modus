// frontend/src/components/Insights.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Insights = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/graph/insights');
      const formattedData = response.data.map(item => ({
        name: item.command,
        status: item.status,
        timestamp: new Date(item.timestamp).toLocaleString(),
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  return (
    <div>
      <h2>CNC Machine Insights</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="status" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Insights;
