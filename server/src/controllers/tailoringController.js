const Resume = require("../models/Resume");

const {
    generateTailoredResume
} = require("../services/aiClient");


const tailorResume = async (
    req,
    res
) => {

    try {

        const {
            jobDescription,
            config
        } = req.body;


        if (!jobDescription) {

            return res.status(400).json({
                message:
                    "jobDescription is required"
            });
        }


        // ==========================================
        // Find authenticated user's master resume
        // ==========================================

        const masterResume =
            await Resume.findOne({
                userId: req.user.id
            }).lean();


        if (!masterResume) {

            return res.status(404).json({
                message:
                    "Master resume not found"
            });
        }


        // ==========================================
        // Send resume + JD to Python AI service
        // ==========================================

        const result =
            await generateTailoredResume({

                userId:
                    req.user.id,

                resumeId:
                    masterResume._id,

                jobDescription,

                masterResume,

                config:
                    config || {}
            });


        return res.json(
            result
        );

    }catch (error) {
        console.error("Tailoring error:", error);

        return res.status(error.response?.status || 500).json({
            message:
                error.response?.data?.detail ||
                error.message
        });
    }
};


module.exports = {
    tailorResume
};