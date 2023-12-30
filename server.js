// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kireeti@123',
  database: 'eventspark',
});
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from only http://localhost:3000
}));
app.use(cors());

// Signup API endpoint
app.post('/api/signup', (req, res) => {
  const { name, phone, password } = req.body;

  // Perform validation if needed

  // Insert user data into the database
  const query = 'INSERT INTO userdetails (name, phone, password) VALUES (?, ?, ?)';
  pool.query(query, [name, phone, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Since the phone_number is the primary key, we can directly fetch the user from the database using it
    const selectQuery = 'SELECT * FROM userdetails WHERE phone = ?';
    pool.query(selectQuery, [phone], (err, userResult) => {
      if (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // User created successfully
      return res.status(200).json({ message: 'User created successfully', user: userResult[0] });
    });
  });

  // In the /api/signup endpoint
  console.log('Signup Data:', name, phone, password);
});


// Login API endpoint
app.post('/api/login', (req, res) => {
  const { phone, password } = req.body;

  // Perform validation if needed

  // Check if the user exists in the database
  const query = 'SELECT * FROM userdetails WHERE phone = ? AND password = ?';
  pool.query(query, [phone, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // User exists, send success response
    return res.status(200).json({ message: 'Login successful', user: results[0] });
  });
});

app.post('/api/organiserdata', (req, res) => {
  const {
    eventName,
    organiserName,
    contactNo,
    numTickets,
    costOfEachTicket,
    address,
    imageUrl
  } = req.body;

  // Perform validation if needed

  // Insert event data into the database
  const query =
    'INSERT INTO organiserdata (eventname, organisername, phone, numtickets, cost, address, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  pool.query(
    query,
    [eventName, organiserName, contactNo, numTickets, costOfEachTicket, address, imageUrl],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Fetch the inserted event from the database
      const selectQuery = 'SELECT * FROM organiserdata WHERE id = ?';
      pool.query(selectQuery, [result.insertId], (err, eventResult) => {
        if (err) {
          console.error('Error fetching event data:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Event created successfully
        return res.status(200).json({
          message: 'Event created successfully',
          event: eventResult[0]
        });
      });
    }
  );

  // In the /api/event endpoint
  console.log(
    'Event Data:',
    eventName,
    organiserName,
    contactNo,
    numTickets,
    costOfEachTicket,
    address,
    imageUrl
  );
});





const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
