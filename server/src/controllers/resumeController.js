const Resume = require("../models/Resume");

const getResume = async (req, res) => {
    try {
        let resume = await Resume.findOne({
            userId: req.user.id
        });

        // Create empty resume if user doesn't have one
        if (!resume) {
            resume = await Resume.create({
                userId: req.user.id
            });
        }

        res.json({
            resume
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            {
                userId: req.user.id
            },
            {
                $set: req.body
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.json({
            message: "Resume updated successfully",
            resume
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getResume,
    updateResume
};