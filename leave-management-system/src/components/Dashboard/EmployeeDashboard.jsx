import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const EmployeeDashboard = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  
  const employeeId = localStorage.getItem('userId');
  // const employeeId = '673e19e8a25e5967c07e931b'; 
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const handleLogout = async () => {
        localStorage.removeItem("userId")
        alert('You have been logged out.');
        navigate('/'); // Redirect to login page
  
  };
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://192.168.1.14:8080/leave-requests');
        const allRequests = response.data;
        const filteredRequests = allRequests.filter((request) => request.userId === employeeId);
        setLeaveRequests(filteredRequests);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setError('Failed to load leave requests. Please try again later.');
      }
    };

    fetchLeaveRequests();
  }, [employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let errors = {};
    if (!leaveType) errors.leaveType = 'Leave Type is required.';
    if (!startDate) errors.startDate = 'Start Date is required.';
    if (!endDate) errors.endDate = 'End Date is required.';
    if (!reason) errors.reason = 'Reason for leave is required.';
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    const leaveData = {
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'Pending',
      userId: employeeId, // Reference to the employee making the request
      requestedOn: new Date().toISOString(),
      managerId: "54321", // Replace with actual manager ID if available
    };
  
    try {
      const response = await axios.post('http://192.168.1.14:8080/leave-requests', leaveData);
      setLeaveRequests((prevRequests) => [...prevRequests, response.data]);
      alert('Your leave request has been submitted successfully!');
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
        <h2 style={styles.header}>Submit Leave Request</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Leave Type:</label>
            <select
              style={styles.input}
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select Leave Type</option>
              <option value="vacation">Vacation</option>
              <option value="sick-leave">Sick Leave</option>
              <option value="personal">Personal Leave</option>
            </select>
            {formErrors.leaveType && <p style={styles.error}>{formErrors.leaveType}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Start Date:</label>
            <input
              style={styles.input}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
            />
            {formErrors.startDate && <p style={styles.error}>{formErrors.startDate}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>End Date:</label>
            <input
              style={styles.input}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
            {formErrors.endDate && <p style={styles.error}>{formErrors.endDate}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Reason:</label>
            <textarea
              style={styles.textarea}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for your leave"
            />
            {formErrors.reason && <p style={styles.error}>{formErrors.reason}</p>}
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Request
          </button>
        </form>
      </div>

      <div style={styles.tableContainer}>
        <h2 style={styles.header}>My Leave Requests</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Leave Type</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>End Date</th>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
          
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td style={styles.td}>{request.leaveType}</td>
                <td style={styles.td}>{request.startDate}</td>
                <td style={styles.td}>{request.endDate}</td>
                <td style={styles.td}>{request.reason}</td>
                <td style={styles.td}>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url(/images/img-png.jpg)',
    backgroundSize: 'cover',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '30px',

  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#007bff',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#343a40',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #dee2e6',
  },
};

export default EmployeeDashboard;
