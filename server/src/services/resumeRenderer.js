const Resume = require("../models/Resume");

const {
    renderTemplate
} = require("./templateRenderer");

const generateLatex = async (
    userId,
    templateId,
    tailoredResume = null
) => {
    const resume =
        await Resume.findOne({
            userId
        });

    if (!resume) {
        throw new Error(
            "Resume not found"
        );
    }

    const latex =
        await renderTemplate(
            templateId,
            resume,
            tailoredResume
        );

    return latex;
};

module.exports = {
    generateLatex
};