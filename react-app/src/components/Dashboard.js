// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import CNCMonitor from './CNCMonitor';
import CNCControl from './CNCControl';
import { fetchGraphInsights } from '../services/graphService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [graphInsights, setGraphInsights] = useState([]);

  // Check for authenticated user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch knowledge graph insights
  useEffect(() => {
    const loadInsights = async () => {
      const insights = await fetchGraphInsights();
      setGraphInsights(insights);
    };

    loadInsights();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error("Error during logout:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{color: "blue" }}>CNC Monitoring Dashboard</h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </header>

      <section style={styles.section}>
        <div style={styles.panel}>
          <h2>Live CNC Data</h2>
          <CNCMonitor />
        </div>

        <div style={styles.panel}>
          <h2>CNC Control Panel</h2>
          <CNCControl />
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.panel}>
          <h2>Knowledge Graph Insights</h2>
          {graphInsights.length > 0 ? (
            <ul>
              {graphInsights.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p>No insights available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  section: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  panel: {
    width: '45%',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgb(211, 211, 211)',
  },
};

export default Dashboard;
