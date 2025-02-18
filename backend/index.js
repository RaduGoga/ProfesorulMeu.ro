const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const teacherRoutes = require('./routes/teachers');
const reviewRoutes = require('./routes/reviews');
const searchRoutes = require('./routes/search');
app.use('/teachers', teacherRoutes);
app.use('/reviews', reviewRoutes);
app.use('/search', searchRoutes);

// Database and Server Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
