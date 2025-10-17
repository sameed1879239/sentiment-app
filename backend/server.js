const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for frontend requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB (use your local or cloud connection string)
mongoose.connect('mongodb://localhost:27017/sentimentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a schema and model for storing sentiment results
const ResultSchema = new mongoose.Schema({
  text: String,
  score: Number,
  comparative: Number,
  createdAt: { type: Date, default: Date.now },
});
const Result = mongoose.model('Result', ResultSchema);

// API endpoint to save sentiment results
app.post('/results', async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json({ message: 'Result saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
