// reviews.js

const express = require('express');
const Review = require('../models/review');
const Teacher = require('../models/teacher');
const router = express.Router();

// Get all reviews for a teacher
router.get('/:teacherId', async (req, res) => {
    const teacherId = req.params.teacherId;
    try {
        const reviews = await Review.find({ teacher_id: teacherId });
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve reviews.' });
    }
});

// Add a review for a teacher
router.post('/:teacherId', async (req, res) => {
    const teacherId = req.params.teacherId;
    const { ratings, comment } = req.body;

    if (!ratings || !comment) {
        return res.status(400).json({ error: 'Ratings and comment are required.' });
    }

    try {
        const newReview = await Review.create({
            teacher_id: teacherId,
            ratings,
            comment,
            submitted_at: new Date(),
        });

        // Update teacher's profile stats dynamically
        const reviews = await Review.find({ teacher_id: teacherId });
        const profileSummary = calculateProfileSummary(reviews);

        await Teacher.findByIdAndUpdate(teacherId, {
            profile_summary: profileSummary,
        });

        res.status(201).json({ message: 'Review added successfully.', review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit the review.' });
    }
});

// Helper: Calculate summary for reviews
function calculateProfileSummary(reviews) {
    const total = reviews.length;
    const averages = reviews.reduce((acc, curr) => {
        acc.teaching_quality += curr.ratings.teaching_quality;
        acc.fairness += curr.ratings.fairness;
        acc.subject_knowledge += curr.ratings.subject_knowledge;
        acc.harshness += curr.ratings.harshness;
        acc.course_difficulty += curr.ratings.course_difficulty;
        return acc;
    }, {
        teaching_quality: 0,
        fairness: 0,
        subject_knowledge: 0,
        harshness: 0,
        course_difficulty: 0,
    });

    return {
        average_teaching_quality: averages.teaching_quality / total,
        average_fairness: averages.fairness / total,
        average_subject_knowledge: averages.subject_knowledge / total,
        average_harshness: averages.harshness / total,
        average_course_difficulty: averages.course_difficulty / total,
        total_reviews: total,
    };
}

module.exports = router;
