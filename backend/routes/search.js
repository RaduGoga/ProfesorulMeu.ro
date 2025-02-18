const express = require('express');
const Teacher = require('../models/teacher');
const router = express.Router();

// Search teachers by name or school
router.get('/', async (req, res) => {
  const query = req.query.q;
  const teachers = await Teacher.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { school: { $regex: query, $options: 'i' } },
    ],
  });
  res.json(teachers);
});

module.exports = router;
