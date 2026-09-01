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


        const result =
            await generateTailoredResume({

                jobDescription,

                masterResume,

                config:
                    config || {}
            });


        return res.json(
            result
        );

    } catch (error) {

        console.error(
            "Tailoring error:",
            error
        );


        return res.status(500).json({
            message:
                error.response?.data?.detail ||
                error.message
        });
    }
};


module.exports = {
    tailorResume
};