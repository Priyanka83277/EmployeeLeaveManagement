// import React from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes instead of Switch
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import Login from './components/Auth/Login';
import LeaveRequest from './components/Leave/LeaveRequest'
// import PrivateRoute from './components/PrivateRoute'; // Optional if using private routes
import { AuthContextProvider } from './context/AuthContext'; // Assuming you have an AuthContext
import ManagerLogin from './components/Auth/Managerlogin';
const App = () => {
  const [leaveRequestStatus, setLeaveRequestStatus] = useState(null); // To manage the leave request status

  // Function to update leave request status
  const handleLeaveRequestSubmit = (status) => {
    setLeaveRequestStatus(status); // Set the status as success or failure
  };
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          {/* Define routes for Login and Dashboards */}
          <Route path="/" element={<Login />} />
          
          <Route path="/leave-request" element={<LeaveRequest/>} />
          <Route path="/managerlogin" element={<ManagerLogin/>} />

          <Route
            path="/employee-dashboard"
            element={
                <EmployeeDashboard onLeaveRequestSubmit={handleLeaveRequestSubmit} />
            }
          />

          {/* Manager Dashboard */}
          <Route
            path="/manager-dashboard"
            element={
                <ManagerDashboard leaveRequestStatus={leaveRequestStatus} />
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
