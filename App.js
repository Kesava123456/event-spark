import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import OrganizerList from './OrganizerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmationPage from './ConfirmationPage';
import TicketBookingForm from './TicketBookingForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<EventDetails />} />
        <Route path="/organize" element={<EventForm />} />
        <Route path="/booking-form" element={<EventDetails />} />
        <Route path="/confirm" element={<ConfirmationPage />} />
        <Route path="/ticket" element={<TicketBookingForm />} />
      </Routes>
    </Router>
  );
};

export default App;
