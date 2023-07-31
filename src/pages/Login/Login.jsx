import React, { useState } from 'react';
import './Login.css'; // Import custom styles for the Login component
import { publicRequest } from '../../Helper/ApiRequest';
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from '../../Helper/reduxUser';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make the API call to submit the username and password
      dispatch(loginStart());
      const response = await publicRequest.post('/login/checkUser', { username, password });

      // Handle the response as needed (e.g., store user data, redirect to another page)
      alert("Logged in sccuessfully");
      dispatch(loginSuccess(response.data));
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle the error (e.g., show an error message to the user)
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred during login. Please try again later.');
      }
      dispatch(loginFailure());
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card login-card">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleLogin}>
          {/* Input fields for username and password */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" id='login' className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
