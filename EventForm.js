import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const EventForm = ({ onSubmit }) => {
  const [eventName, setEventName] = useState('');
  const [organiserName, setOrganiserName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [numTickets, setNumTickets] = useState('');
  const [costOfEachTicket, setCostOfEachTicket] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation (you can add more validation as needed)
    if (!eventName || !organiserName || !contactNo || !numTickets || !costOfEachTicket || !address) {
      setError('All fields are required.');
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/organiserdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventName,
            organiserName,
            contactNo,
            numTickets: parseInt(numTickets),
            costOfEachTicket: parseFloat(costOfEachTicket),
            address,
            imageUrl,
          }),
        });

        if (!response.ok) {
          throw new Error('Event creation failed.');
        }

        const result = await response.json();
        onSubmit(result.event); // Assuming onSubmit function to handle the created event on the parent component
        setEventName('');
        setOrganiserName('');
        setContactNo('');
        setNumTickets('');
        setCostOfEachTicket('');
        setAddress('');
        setImageUrl('');
      } catch (error) {
        console.error('Error creating event:', error);
        setError('Event creation failed. Please try again.');
      }
    }
  };
  return (
    <Card className="col-md-6 offset-md-2">
      <Card.Body>
        <Card.Title>Event Form</Card.Title>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="eventName"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <label htmlFor="eventName">Event Name</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="organiserName"
              placeholder="Organiser Name"
              value={organiserName}
              onChange={(e) => setOrganiserName(e.target.value)}
            />
            <label htmlFor="organiserName">Organiser Name</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="contactNo"
              placeholder="Contact Number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
            <label htmlFor="contactNo">Contact Number</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="number"
              id="numTickets"
              placeholder="Number of Tickets"
              value={numTickets}
              onChange={(e) => setNumTickets(e.target.value)}
            />
            <label htmlFor="numTickets">Number of Tickets</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="number"
              step="0.01"
              id="costOfEachTicket"
              placeholder="Cost of Each Ticket"
              value={costOfEachTicket}
              onChange={(e) => setCostOfEachTicket(e.target.value)}
            />
            <label htmlFor="costOfEachTicket">Cost of Each Ticket</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address">Address</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="imageUrl"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <label htmlFor="imageUrl">Image URL</label>
          </Form.Floating>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};




export default EventForm;
