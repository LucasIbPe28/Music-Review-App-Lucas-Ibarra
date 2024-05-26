const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/music', require('./routes/musicRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});