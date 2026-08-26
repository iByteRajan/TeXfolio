const {
    generateLatex
} = require("../services/resumeRenderer");

const {
    compileLatex
} = require("../services/latexCompiler");

const renderResume = async (req, res) => {
    try {
        const {
            templateId
        } = req.body;

        if (!templateId) {
            return res.status(400).json({
                message:
                    "templateId is required"
            });
        }

        const latex =
            await generateLatex(
                req.user.id,
                templateId
            );

        res.json({
            latex
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

const compileResume = async (req, res) => {
    try {
        const {
            latex
        } = req.body;

        if (!latex) {
            return res.status(400).json({
                message:
                    "LaTeX source is required"
            });
        }

        const {
            pdf
        } = await compileLatex(latex);

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.send(pdf);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    renderResume,
    compileResume
};