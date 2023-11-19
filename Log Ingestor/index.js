const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Connect to MongoDB (replace 'mongodb://localhost:27017/dbname' with your MongoDB connection string)
mongoose.connect('mongodb://127.0.0.1:27017/logsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Log schema
const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

// Create a Log model
const Log = mongoose.model('Log', logSchema);

// Endpoint to receive logs
app.post('/logs', async (req, res) => {
  try {
    const logData = req.body;

    // Store the log data in MongoDB
    const log = new Log(logData);
    await log.save();

    console.log('Received Log:', logData);
    res.status(200).send('Log received and stored successfully');
  } catch (error) {
    console.error('Error storing log:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update the search endpoint to handle regex and date range parameters
app.get('/search', async (req, res) => {
  const query = req.query.query;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const useRegex = req.query.useRegex === 'true'; // Convert string to boolean

  const dateFilter = {};

  // Check if both startDate and endDate are provided
  if (startDate && endDate) {
    dateFilter.timestamp = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  // Use Mongoose to search logs in MongoDB with the additional date filter and regex
  const searchResults = await Log.find({
    $and: [
      {
        $or: [
          { level: useRegex ? { $regex: query, $options: 'i' } : query },
          { message: useRegex ? { $regex: query, $options: 'i' } : query },
          { resourceId: useRegex ? { $regex: query, $options: 'i' } : query },
          // Add more fields as needed
        ],
      },
      dateFilter,
    ],
  });

  res.status(200).json(searchResults);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Log Ingestor listening on port ${PORT}`);
});