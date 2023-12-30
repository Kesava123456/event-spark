import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const ConfirmationPage = (props) => {
  const { eventName, numTickets, name } = props;

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Alert variant="success">
            <h4>Booking Confirmed!</h4>
            <p>Your tickets for the event "{eventName}" have been booked.</p>
            <p>
              Number of Tickets: {numTickets}<br />
              Name: {name}
            </p>
            <p>Enjoy the event!</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmationPage;
