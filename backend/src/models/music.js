const mongoose = require('mongoose');

const musicReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('MusicReview', musicReviewSchema);
