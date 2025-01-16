# 🚀 CNC Monitoring and Control App
A web-based CNC machine monitoring and control system that integrates React, Node.js, Firebase, and Dgraph/Neo4j. This app allows real-time control of CNC operations with features like spindle control, G-code execution, and machine insights visualization.

# 🛠️ Tech Stack
Frontend: React.js, Modus, Axios  
Backend: Node.js, Express.js  
Database: Dgraph or Neo4j (Knowledge Graph)  
Authentication & Hosting: Firebase  
Hardware: Arduino Uno, 500W CNC Spindle, TB6600 Driver, NEMA 17 Stepper Motors  

# 📂 Project Structure
CNC-Monitoring-Control-App/  
 ├── backend/  
 │   ├── server.js            # Backend server (Node.js + Express)  
 │   ├── cncService.js        # CNC command handling  
 │   └── insightsService.js   # Insights from Dgraph/Neo4j  
 ├── frontend/  
 │   ├── public/  
 │   └── src/  
 │       ├── components/  
 │       │   ├── Dashboard.js  
 │       │   ├── ControlPanel.js  
 │       │   └── Insights.js  
 │       ├── services/  
 │       │   ├── cncService.js  
 │       │   └── insightsService.js  
 │       ├── App.js  
 │       └── index.js  
 ├── package.json  
 └── README.md  

# ⚙️ Features
Real-Time CNC Control: Start, stop, and pause the CNC machine.  <br>
G-Code Execution: Send custom G-code commands directly to the CNC.  <br>
Spindle Speed Control: Adjust spindle speed using PWM signals.  <br>
Machine Insights: View performance insights using a knowledge graph.<br>  
User Authentication: Secure login and signup with Firebase.  

#🔌 Hardware Setup
Arduino Uno → TB6600 Driver

STEP → Pin 3
DIR → Pin 2
GND → GND
Arduino Uno → Spindle Controller

PWM (Spindle Speed) → Pin 9
GND → GND
Power Supply

TB6600 & Spindle: 24V or 48V power supply.
Arduino: USB or 5V DC.

# 🚀 Installation
1. Clone the Repository  
git clone https://github.com/creativeweb12/cnc-monitoring-control-app.git  <br>
cd cnc-monitoring-control-app  

3. Install Backend Dependencies
cd backend  <br>
npm install  

4. Install Frontend Dependencies
cd ../frontend  <br>
npm install  

5. Configure Firebase
Create a file frontend/src/firebase-config.js:  <br>
import { initializeApp } from "firebase/app";  <br>
import { getAuth } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  <br>
  authDomain: "YOUR_AUTH_DOMAIN",<br>
  projectId: "YOUR_PROJECT_ID",  <br>
  storageBucket: "YOUR_STORAGE_BUCKET",<br>
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", <br>
  appId: "YOUR_APP_ID"  
};  

const app = initializeApp(firebaseConfig);  <br>
export const auth = getAuth(app);  <br>
export default app;  

5. Start the Backend Server
cd backend  <br>
node server.js

7. Start the Frontend App
cd ../frontend  <br>
npm start

# 📱 Usage
Login/Signup:  <br>
Access the app at http://localhost:3000 and sign in with Firebase authentication.

CNC Control:  <br>
Start, stop, and pause the CNC machine.<br>
Send G-code commands.  <br>
Monitor real-time spindle speed.<br>
Insights:  <br>
Visualize CNC performance and machine health through data-driven insights.

❗ Troubleshooting <br> 
404 Error on Insights: <br>
Ensure the backend server is running (node server.js) and Dgraph/Neo4j is connected.

Serial Port Error:  <br>
Verify the correct COM port in server.js for Arduino:  <br>
const cncPort = new SerialPort('COM4', { baudRate: 115200 }); <br>
CORS Issues:  <br>
Install CORS middleware in the backend:<br>
npm install cors

# 💡 Acknowledgements  <br>
React.js  <br>
Firebase  <br>
Dgraph / Neo4j<br>
Arduino  <br>
TB6600 Stepper Driver  

# 📞 Contact
Your Name – Balamurugan D  <br>
Email: dbalamurugan@creativewebgraphic.com
