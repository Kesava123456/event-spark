// Home.js

import React, { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import myImage1 from './@mirandatinoco.jpeg';
import myImage2 from './108770f5a419e133a1b6cb7eecefc1bb.jpg';
import myImage3 from './5.jpg';
import myImage4 from './1c35a454dce2145a6893592331e0af37.jpg';
import EventForm from './EventForm';
import './styles.css';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (eventData) => {
    postEvent(eventData);
  };

  const postEvent = (eventData) => {
    fetch('http://localhost:3001/api/organiserdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Event created successfully:', data);
        // You can perform any other actions after successful form submission here
      })
      .catch((error) => {
        console.error('Error creating event:', error);
        // Handle error in case of form submission failure
      });
  };

  const show = () => {
    window.location.href = '/events';
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const matter = (
    <div className="container">
      <div className="header">
        <Button variant="primary" onClick={show}>Show Events</Button>
      </div>
      <div className="marquee">
        <marquee className="blink" direction="right" display="flex" align-items="center" width="100%" height="55px" scrollamount="12">
          !!!!! Events that inspire and ignite !!!!! The art of making magic happen !!!!! Events that spark joy and excitement !!!!!
        </marquee>
      </div>
      <div className="majorContainer">
        <div className="row">
          <div className="col-md-6">
            {/* <h1>Description</h1>*/}
            <div className="border">
              <p className="description">
                Welcome to the world of event management! Our event management website is your one-stop destination for
                all your event-related needs. Whether you're a passionate event-goer or an event organizer, we've got
                you covered. Our platform provides a comprehensive database of events from all over the world.
                You can easily search and find events based on your preferences, including location, date, category, and
                more. From music concerts and sports events to conferences and festivals, we have it all.
              </p>
              <ul>
                <li>Event Discovery</li>
                <li>Event Details</li>
                <li>Online Booking</li>
                <li>Review</li>
                <li>Rating</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 mt-3  carouselContainer">
            <Carousel>
              <Carousel.Item>
                <img className="carouselImage" src={myImage1} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="carouselImage" src={myImage2} alt="Second slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="carouselImage" src={myImage3} alt="Third slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="carouselImage" src={myImage4} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <h3> Types of Events</h3>
        <p>People get Involved in the umpteenth number of events throughout their life, attending a birthday party, a wedding ceremony, participating in sports events, or music festival, and so on Event planners a wedding organiser a birthday party planner, and others can help with the smooth planning of these events</p>
        <h4>Personal and social events</h4>
        <p>Personal and social events are gatherings involving family members and guests of the family who have come together to celebrate an occasion or a personal achievement Events like s birthday party bachelor's party, baby showers, engagement themed party, wedding anniversary, family reunion, cocktail party, etc. are examples of personal and social events</p>
        <h4>Entertainment events</h4>
        <p>Entertainment is any activity that gives happiness to the participants and thrills and engages them. The range of entertainment events is diverse, it can be fashion shows, beauty pageants music concerts, award nights, jewellery shows, theatrical performances, plays, etc.</p>
        <h4>Corporate events</h4>
        <p>The events organized by the businesses and enterprises for their employees, clients, or other stakeholders are corporate events. The corporate events can be on a larger scale la conferences, seminars product launches buyer-seller meet, etc, or some smaller events like holiday parties or retreats for the staff.</p>
        <h4>Education and career events</h4>
        <p>Educational events are events that impart some kind of knowledge, or upgrade the skills of the participants, training them for the latest breakthroughs in a particular field Events ka education fars, workshops, debates, contests, etc. are education events Career events comprise career expo and job fairs where recruiters and job seekers come face to face to learn more about job opportunities and headhunting</p>
        <h4>Sporting events</h4>
        <p>Sporting event means some athletic sports, amateur sports, national or international level sports, and professional sports, etc. Events like the marathons, Asian Games Clympics FIFA World Cup Wimbledon Pt tourmament, ca are sporting events</p>
        <h4>Political events</h4>
        <p>Events organized by some political parties to get in touch with their supporters to showcase their work to create awareness about government policies and affairs of the country are considered to be political events. They com be a political rally, demonstration protests and dhamas, lunch or dinner parties organized by political leaders to receive some international guests or summits where different country heads are participating, and many more,</p>
      </div>
      <div className="row" style={{ marginLeft: "40px" }}>
       {/* <div className="col-md-7">
          <h3>Want to organize your event here ?? <Button variant="primary" className="eventButton" onClick={toggleForm}> click here </Button></h3>
        </div> */}
       {/*<div className="col-md-3">
          <img src={myImage1} width="50px" height="50px" alt="Your Image" />
  </div> */}
      </div>
      <div>
        {/*<h2 className="aboutUs" style={{ textDecoration: "underline", marginLeft: "40px" }}> About Us</h2>*/}
        {/* Add your About Us content here */}
      </div>
    </div>
  );

  return (
    <div>
      {!showForm ? matter : (
        <div>
          <Button variant="secondary" onClick={toggleForm}>Back</Button>
          <EventForm onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default Home;
