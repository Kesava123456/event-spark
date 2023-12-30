import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import ConfirmationPage from './ConfirmationPage';

const TicketBookingForm = ({ event, handleBooking }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [numTickets, setNumTickets] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNumTicketsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumTickets(value);
    setShowWarning(false);
  };

  const handleBookTickets = () => {
    if (numTickets <= event.numTickets) {
     
      setBookingConfirmed(true);
    } else {
      setShowWarning(true);
    }
  };

  if (bookingConfirmed) {
    return (
      <ConfirmationPage
        eventName={event.eventName}
        numTickets={numTickets}
        name={name}
      />
    );
  } else {
    return (
      <Card>
      <Card.Body>
        <Card.Title>{event.eventName}</Card.Title>
        <Card.Text>Contact No: {event.contactNo}</Card.Text>
        <Card.Text>Description: {event.description}</Card.Text>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={handleNameChange} />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" value={address} onChange={handleAddressChange} />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="text" value={mobileNumber} onChange={handlePhoneChange} />
        </Form.Group>
        <Form.Group controlId="formNumTickets">
          <Form.Label>Number of Tickets to Buy:</Form.Label>
          <Form.Control
            type="range"
            value={numTickets}
            onChange={handleNumTicketsChange}
            min="1"
            max={event.numTickets}
          />
          <div className="text-center">
            <span className="font-weight-bold">Selected Tickets: {numTickets}</span>
          </div>
          <div className="text-center">
            <span className="font-weight-bold">Available Tickets: {event.numTickets}</span>
          </div>
        </Form.Group>
        {showWarning && (
          <Alert variant="danger">The number of tickets exceeds the available tickets!</Alert>
        )}
        <Card.Text>
          Total Price:{' '}
          <span className="font-weight-bold">{numTickets * event.costOfEachTicket}</span>
        </Card.Text>
        <Button variant="primary" onClick={handleBookTickets}>
          Book Tickets
        </Button>
      </Card.Body>
    </Card>
    );
  }
};

export default TicketBookingForm;
