// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { auth } from '../firebase-config';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = db.collection('items')
        .onSnapshot(snapshot => {
          setData(snapshot.docs.map(doc => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in first</p>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {user.email}</h2>
      <div className="items-list">
        <h3>Items</h3>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="item">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
