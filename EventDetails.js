import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import EventCard from './EventCard';
import TicketBookingForm from './TicketBookingForm';
import eventData from './eventData';

const EventDetails = () => {
  const [eventDataState, setEventDataState] = useState(eventData);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleBooking = (eventId, numTickets) => {
    const updatedEventData = eventDataState.map((event) => {
      if (event.id === eventId) {
        return { ...event, numTickets: event.numTickets - numTickets };
      }
      return event;
    });
  
    localStorage.setItem('eventData', JSON.stringify(updatedEventData));
    setEventDataState(updatedEventData);
    setSelectedEvent(null);
  };
  

  return (
    <Container>
      {selectedEvent ? (
        <TicketBookingForm event={selectedEvent} handleBooking={handleBooking} />
      ) : (
        eventDataState.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onBookTickets={() => setSelectedEvent(event)}
          />
        ))
      )}
    </Container>
  );
};

export default EventDetails;




