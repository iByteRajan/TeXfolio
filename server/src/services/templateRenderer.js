const fs = require("fs/promises");
const path = require("path");
const Handlebars = require("handlebars");

const latexEscape = require("../utils/latexEscape");

// 1. OVERRIDE default HTML escaping with LaTeX escaping
Handlebars.Utils.escapeExpression = latexEscape;

const TEMPLATE_ROOT = path.join(process.cwd(), "templates");

const prepareResumeData = (resume) => {
    const data = resume.toObject
        ? resume.toObject()
        : resume;

    return {
        ...data,

        personal: {
            ...data.personal
        },

        education: data.education.map(
            (education) => ({
                ...education
            })
        ),

        experience: data.experience.map(
            (experience) => ({
                ...experience
            })
        ),

        projects: data.projects.map(
            (project) => ({
                ...project,

                technologies:
                    project.technologies.join(", ")
            })
        ),

        skills: data.skills.map(
            (skill) => ({
                ...skill,

                items: skill.items.join(", ")
            })
        )
    };
};

const renderTemplate = async (templateId, resume) => {
    const templatePath = path.join(TEMPLATE_ROOT, templateId, "template.tex");
    const template = await fs.readFile(templatePath, "utf-8");

    // 2. REMOVE 'noEscape: true' so Handlebars uses the latexEscape override
    const compiledTemplate = Handlebars.compile(template);

    const data = prepareResumeData(resume);
    return compiledTemplate(data);
};

module.exports = { renderTemplate };