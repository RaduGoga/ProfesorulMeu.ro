const express = require('express');
const Teacher = require('../models/teacher');
const router = express.Router();

// Get all approved teachers
router.get('/', async (req, res) => {
  const teachers = await Teacher.find({ status: 'approved' });
  res.json(teachers);
});

// Search for approved teachers by name or school
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const searchQuery = q
      ? {
          $and: [
            { status: 'approved' }, // Only search among approved teachers
            {
              $or: [
                { name: { $regex: q, $options: 'i' } },
                { school: { $regex: q, $options: 'i' } },
              ],
            },
          ],
        }
      : { status: 'approved' };

    const teachers = await Teacher.find(searchQuery);
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search for teachers.' });
  }
});

// Get all pending teachers (distinct route)
router.get('/pending', async (req, res) => {
  const pendingTeachers = await Teacher.find({ status: 'pending' });
  res.json(pendingTeachers);
});

// Add new teacher (defaults to pending)
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher({
      ...req.body,
      status: 'pending', // New teachers need approval
    });
    await teacher.save();
    res.status(201).json({ message: 'Teacher submitted for review.', teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit teacher.' });
  }
});

// Get teacher by ID (only approved teachers)
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id, status: 'approved' });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found or not approved yet.' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch teacher.' });
  }
});

// Approve a teacher by ID
router.patch('/:id/approve', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to approve teacher.' });
  }
});

// Reject a teacher by ID
router.patch('/:id/reject', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reject teacher.' });
  }
});

module.exports = router;
