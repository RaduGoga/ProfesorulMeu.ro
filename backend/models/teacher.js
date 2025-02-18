const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  school: String,
  subject: String,
  profile_summary: {
    average_teaching_quality: { type: Number, default: 0 },
    average_fairness: { type: Number, default: 0 },
    average_subject_knowledge: { type: Number, default: 0 },
    average_harshness: { type: Number, default: 0 },
    average_course_difficulty: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 },
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },  // Status field for teacher approval
});

module.exports = mongoose.model('Teacher', teacherSchema);
