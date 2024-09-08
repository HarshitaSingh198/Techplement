const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get a random quote from an external API
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote' });
  }
});

module.exports = router;
