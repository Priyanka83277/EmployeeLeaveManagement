import React from 'react';

const LeaveConfirmation = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '20px 30px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '500px',
      width: '90%',
      marginRight: '100px'
    },
    tick: {
        fontSize: '48px',
        color: 'green',
        // marginLeft: '300px',
     
      },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    message: {
      fontSize: '16px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
             <h2 style={styles.heading}>Leave Request Submitted</h2>
             <div style={styles.tick}>&#10004;</div>
        <p style={styles.message}>
          Your leave request has been submitted successfully. You will be notified once it is reviewed.
        </p>
      </div>
    </div>
  );
};

export default LeaveConfirmation;

