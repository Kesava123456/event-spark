import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrganizerList = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrganizerData();
  }, []);

  const fetchOrganizerData = () => {
    fetch('http://localhost:3001/api/organiserdata')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setOrganizers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  };

  const navigate = useNavigate(); // Use the useNavigate hook

  const handleBooking = (organizerId) => {
    // Use navigate to go to the booking form with the organizerId as a query parameter
    navigate(`/booking-form1`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {organizers.map((organizer) => (
          <div key={organizer.id} className="col-md-4 mb-4">
            <Card>
              <div className="card-body">
                <div className="card-img-container">
                  <img src={organizer.imageUrl} className="card-img-left" alt="Event" />
                </div>
                <div className="card-details">
                  <h5 className="card-title">{organizer.eventName}</h5>
                  <p className="card-text">Organizer: {organizer.organizerName}</p>
                  <p className="card-text">Contact: {organizer.contactNo}</p>
                  <p className="card-text">Address: {organizer.address}</p>
                  <Button variant="primary" onClick={() => handleBooking(organizer.id)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizerList;
