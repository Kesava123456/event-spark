// Login.js (React frontend)
import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import img from './eventspark.jpg';
import "./App.css";

const Login = () => {
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const change = () =>{
    window.location.href = '/';
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // Perform validation if needed

    // Make API call to check login credentials
    axios.post('http://localhost:3001/api/login', { phone, password })
      .then((response) => {
        // Login successful, save user data to local storage and redirect to home page
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/home';
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setLoginError('Invalid phone number or password');
        } else {
          setLoginError('Error logging in');
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="login col-md-6">
          <Card>
            <Card.Body>
              <h3 className="mb-4">Login</h3>
              {loginError && <Alert variant="danger">{loginError}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="tel"
                    id="phoneNumber"
                    name = "phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <label htmlFor="phoneNumber">Phone Number</label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </Form.Floating>

                <Button type="submit" variant="primary">Login</Button>
              </Form>
            </Card.Body>
            <span  onClick={change}>Create New Account</span>
          </Card>
        </div>
        <div className="name col-md-3 offset-1">
        <img src={img} className="card-img1" alt="EventSpark" />
        </div>
      </div>
    </div>
  );
};

export default Login;
