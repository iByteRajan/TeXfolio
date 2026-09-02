const axios = require("axios");


const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL ||
    "http://localhost:8001";


const generateTailoredResume = async ({
    userId,
    resumeId,
    jobDescription,
    masterResume,
    config
}) => {

    const response =
        await axios.post(
            `${AI_SERVICE_URL}/api/tailoring/generate`,
            {
                user_id: String(userId),

                resume_id: String(resumeId),

                job_description:
                    jobDescription,

                master_resume:
                    masterResume,

                config:
                    config || {}
            }
        );


    return response.data;
};


module.exports = {
    generateTailoredResume
};