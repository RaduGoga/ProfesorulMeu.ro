const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  ratings: {
    teaching_quality: Number,
    fairness: Number,
    subject_knowledge: Number,
    harshness: Number,
    course_difficulty: Number,
  },
  comment: String,
  submitted_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
