// src/components/CNCControl.js
import React, { useState } from 'react';
import { sendCNCCommand, sendGCodeCommand } from '../services/cncService';

const CNCControl = () => {
  const [status, setStatus] = useState('Idle');
  const [gcode, setGcode] = useState('');

  // Handle predefined CNC commands (Start, Stop, Pause)
  const handleCommand = async (command) => {
    setStatus(`Sending ${command} command...`);
    try {
      await sendCNCCommand(command);
      setStatus(`${command} command executed successfully.`);
    } catch (error) {
      setStatus(`Failed to send ${command} command.`);
    }
  };

  // Handle G-code command input
  const handleGcodeSend = async () => {
    if (!gcode.trim()) {
      setStatus("G-code input is empty.");
      return;
    }

    setStatus(`Sending G-code: ${gcode}`);
    try {
      await sendGCodeCommand(gcode);
      setStatus(`G-code "${gcode}" sent successfully.`);
      setGcode('');
    } catch (error) {
      setStatus(`Failed to send G-code: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Status: {status}</h3>

      {/* Predefined CNC Control Buttons */}
      <button style={styles.start} onClick={() => handleCommand('START')}>Start CNC</button>
      <button style={styles.pause} onClick={() => handleCommand('PAUSE')}>Pause CNC</button>
      <button style={styles.stop} onClick={() => handleCommand('STOP')}>Stop CNC</button>
      <button style={styles.increase} onClick={() => handleCommand('INCREASE_SPEED')}>Increase Speed</button>
      <button style={styles.decrease} onClick={() => handleCommand('DECREASE_SPEED')}>Decrease Speed</button>

      {/* G-code Input Field */}
      <div style={styles.gcodeContainer}>
        <input
          type="text"
          value={gcode}
          onChange={(e) => setGcode(e.target.value)}
          placeholder="Enter G-code (e.g., G01 X10 Y10)"
          style={styles.gcodeInput}
        />
        <button style={styles.gcodeButton} onClick={handleGcodeSend}>Send G-code</button>
      </div>
    </div>
  );
};

// Button and Input Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  start: { padding: '10px 20px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', cursor: 'pointer' },
  pause: { padding: '10px 20px', backgroundColor: '#f1c40f', color: '#fff', border: 'none', cursor: 'pointer' },
  stop: { padding: '10px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', cursor: 'pointer' },
  increase: { padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', cursor: 'pointer' },
  decrease: { padding: '10px 20px', backgroundColor: '#9b59b6', color: '#fff', border: 'none', cursor: 'pointer' },
  gcodeContainer: { display: 'flex', gap: '10px', marginTop: '20px' },
  gcodeInput: { padding: '10px', width: '300px' },
  gcodeButton: { padding: '10px 20px', backgroundColor: '#1abc9c', color: '#fff', border: 'none', cursor: 'pointer' },
};

export default CNCControl;
