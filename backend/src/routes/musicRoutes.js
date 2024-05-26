const express = require('express');
const router = express.Router();
const MusicReview = require('../models/music');

// Obtener todas las reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await MusicReview.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva review
router.post('/', async (req, res) => {
  const review = new MusicReview({
    title: req.body.title,
    review: req.body.review,
    imageUrl: req.body.imageUrl
  });
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una review
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await MusicReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borrar una review
router.delete('/:id', async (req, res) => {
  try {
    const review = await MusicReview.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;