const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');    // Authentication routes
const quoteRoutes = require('./routes/quotes'); // Quote routes

const app = express();
app.use(express.json()); // Parse JSON bodies

// Routes for authentication and quotes
app.use('/auth', authRoutes);
app.use('/quotes', quoteRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quoteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.log('MongoDB connection error:', error);
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Your other routes here...
const fetch = require('node-fetch');

// Fetch random quote from API in the backend
app.get('/quotes', async (req, res) => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching quote from API:', error);
    res.status(500).json({ message: 'Failed to load quote' });
  }
});
