import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);
  const managerId = '54321'; // Replace with the logged-in manager's ID from auth context/session

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://192.168.1.14:8080/leave-requests');
        const allRequests = response.data;
        const filteredRequests = allRequests.filter((request) => request.managerId === managerId);
        setLeaveRequests(filteredRequests);
      } catch (err) {
        console.error('Error fetching leave requests:', err);
        setError('Failed to load leave requests. Please try again later.');
      }
    };

    fetchLeaveRequests();
  }, [managerId]);

  const handleUpdateRequest = async (leaveId, status) => {
    try {
      await axios.put(`http://192.168.1.14:8080/leave-requests/${leaveId}`, 
        { status });
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.leaveId === leaveId ? { ...request, status } : request
        )
      );
      alert(`Leave request ${status.toLowerCase()} successfully.`);
    } catch (err) {
      console.error('Error updating leave request:', err);
      alert('Failed to update the leave request. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Manager Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee ID</th>
            <th style={styles.th}>Leave Type</th>
            <th style={styles.th}>Start Date</th>
            <th style={styles.th}>End Date</th>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.leaveId}>
              <td style={styles.td}>{request.userId}</td>
              <td style={styles.td}>{request.leaveType}</td>
              <td style={styles.td}>
                {new Date(request.startDate).toLocaleDateString()}
              </td>
              <td style={styles.td}>
                {new Date(request.endDate).toLocaleDateString()}
              </td>
              <td style={styles.td}>{request.reason}</td>
              <td style={styles.td}>{request.status}</td>
              <td style={styles.td}>
                {request.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateRequest(request.leaveId, "Approved")
                      }
                      style={styles.approveButton}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateRequest(request.leaveId, "Rejected")
                      }
                      style={styles.rejectButton}
                    >
                      Reject
                    </button>
                  </>
                )}
                {request.status !== "Pending" && <span>{request.status}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

const styles = {
    container: {
      textAlign: "center",
      margin: "20px 0",
    },
    table: {
      width: "90%",
      margin: "20px auto",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "12px 15px",
      border: "1px solid #ddd",
    },
    td: {
      padding: "12px 15px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
    approveButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#4CAF50",
      color: "white",
      marginRight: "10px",
    },
    rejectButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#f44336",
      color: "white",
    },
  };
  

export default ManagerDashboard;