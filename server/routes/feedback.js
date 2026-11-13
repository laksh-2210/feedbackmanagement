
const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

// Submit feedback
router.post("/", async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;

        if (!name || !email || !rating || !message) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const newFeedback = new Feedback({
            name,
            email,
            rating,
            message
        });

        await newFeedback.save();

        res.status(201).json({
            message: "Feedback submitted successfully!",
            feedback: newFeedback
        });

    } catch (error) {
        res.status(500).json({
            message: "Error submitting feedback",
            error: error.message
        });
    }
});

// Get all feedback
router.get("/", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });

        res.status(200).json(feedbacks);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching feedback",
            error: error.message
        });
    }
});

module.exports = router;
