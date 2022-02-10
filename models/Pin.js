const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 20
  },
  description: {
    type: String,
    required: true,
    max: 200,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pin', PinSchema);
