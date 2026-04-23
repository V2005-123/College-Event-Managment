const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data
const dataPath = path.join(__dirname, 'data', 'events.json');
const usersPath = path.join(__dirname, 'data', 'users.json');

const getEventsData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const getUsersData = () => {
  const jsonData = fs.readFileSync(usersPath);
  return JSON.parse(jsonData);
};

// --- API ROUTES ---

// 1. Get all events
app.get('/api/events', (req, res) => {
  try {
    const events = getEventsData();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error reading events data" });
  }
});

// 2. Get single event by ID
app.get('/api/events/:id', (req, res) => {
  try {
    const events = getEventsData();
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error reading event data" });
  }
});

// 3. Login with verification
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  try {
    const users = getUsersData();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          token: "mock-jwt-token-" + Math.random().toString(36).substring(7)
        }
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error reading users data" });
  }
});

// 4. Change Password
app.post('/api/change-password', (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  
  try {
    const users = getUsersData();
    const userIndex = users.findIndex(u => u.email === email && u.password === currentPassword);
    
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
      res.json({ success: true, message: "Password updated successfully" });
    } else {
      res.status(401).json({ success: false, message: "Incorrect current password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
});

// 4. Register for an event
app.post('/api/register', (req, res) => {
  const { eventId, userEmail } = req.body;
  if (eventId && userEmail) {
    // In a real app, we would save this to a database
    res.json({ success: true, message: "Successfully registered for the event!" });
  } else {
    res.status(400).json({ success: false, message: "Missing registration details" });
  }
});

// 5. Add new event (Admin only)
app.post('/api/events', (req, res) => {
  try {
    const newEvent = req.body;
    const events = getEventsData();
    
    // Simple ID generation
    const nextId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    const eventWithId = { ...newEvent, id: nextId };
    
    events.push(eventWithId);
    
    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
    
    res.status(201).json({ success: true, event: eventWithId });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ success: false, message: "Error saving event" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
