import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setError(null);

    try {
      const response = await axios.post(
        'http://192.168.1.14:8080/user/login',
        { userName, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if(response.data){
        localStorage.setItem('userId', response.data.userId);
      }
      console.log('Response:', response.data);
      setMessage(response.data);
      navigate('/employee-dashboard'); // Redirect to employee dashboard
    } catch (error) {
      setError('Connection not found');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setError(null);

    try {
      const response = await axios.post(
        'http://192.168.1.14:8080/user/create',
        { userName, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Response:', response.data);
      setMessage(response.data);
      setIsCreatingAccount(false); // Switch back to login mode
    } catch (error) {
      setMessage('Error: Could not connect to the server.');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin} style={styles.form}>
        <h2>{isCreatingAccount ? 'Create Account' : 'Login'}</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          {isCreatingAccount ? 'Create Account' : 'Login'}
        </button>

        <p
          style={styles.toggleLink}
          onClick={() => setIsCreatingAccount((prev) => !prev)}
        >
          {isCreatingAccount
            ? 'Already have an account? Login here.'
            : 'Don’t have an account? Create one.'}
        </p>
      </form>
      <Link to="/managerlogin">If you are Manager click here</Link>
      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  form: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  toggleLink: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Login;
