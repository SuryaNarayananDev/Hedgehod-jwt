const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String, // Optional additional field
  phone: String, // Optional additional field
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
