const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
});

module.exports = mongoose.model('Quote', quoteSchema);
