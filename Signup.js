// Signup.js (React frontend)
import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import img1 from './eventspark.jpg';
import './project.css';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsChecked: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [signupError, setSignupError] = useState('');
  const change = () => {
    window.location.href = '/login';
  }
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupError('');
    const errors = {};

    // Validation checks
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.termsChecked) {
      errors.termsChecked = 'You must accept the terms and conditions';
    }

    setFormErrors(errors);
    console.log('Form Data:', formData);
    console.log('Form Errors:', formErrors);
    // If there are no errors, make API call to insert data into the database
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:3001/api/signup', formData)
        .then((response) => {
          console.log(response.data.message); // "User created successfully"

          // Save data to local storage
          localStorage.setItem('user', JSON.stringify(response.data.user));

          // Redirect to home page (change 'home' to the desired URL)
          window.location.href = '/home';
        })
        .catch((error) => {
          if (error.response && error.response.data.error) {
            setSignupError(error.response.data.error);
          } else {
            setSignupError('Error signing up');
          }
        });
    }

  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="sign col-md-6 offset-md-1">
          <Card>
            <Card.Body>
              <h3 className="mb-4">Signup</h3>
              {signupError && <Alert variant="danger">{signupError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="name">Name</label>
                </Form.Floating>
                {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="tel"
                    id="phoneNumber"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="phoneNumber">Phone Number</label>
                </Form.Floating>
                {formErrors.phoneNumber && <div className="invalid-feedback">{formErrors.phoneNumber}</div>}

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password">Create Password</label>
                </Form.Floating>
                {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </Form.Floating>
                {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}

                <Form.Check className="mb-3">
                  <Form.Check.Input
                    type="checkbox"
                    id="termsChecked"
                    name="termsChecked"
                    checked={formData.termsChecked}
                    onChange={handleInputChange}
                  />
                  <Form.Check.Label htmlFor="termsChecked">Accept Terms and Conditions</Form.Check.Label>
                </Form.Check>
                {formErrors.termsChecked && <div className="invalid-feedback">{formErrors.termsChecked}</div>}

                <Button type="submit" variant="primary">Signup</Button>
              </Form>
            </Card.Body>
            <span onClick={change}>Hava Account?Login</span>
          </Card>
        </div>
        <div className="name col-md-5">
          <img src={img1} className="card-img2" alt="EventSpark" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
