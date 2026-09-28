const fs = require("fs/promises");
const path = require("path");
const Handlebars = require("handlebars");

const latexEscape = require("../utils/latexEscape");

// Use LaTeX escaping instead of Handlebars' default HTML escaping.
Handlebars.Utils.escapeExpression = latexEscape;

const TEMPLATE_ROOT = path.join(
    process.cwd(),
    "templates"
);

/**
 * Convert a Mongoose document/object into a plain object.
 */
const toPlainObject = (value) => {
    if (!value) {
        return value;
    }

    return value.toObject
        ? value.toObject()
        : value;
};

/**
 * Find a master-resume item using the source_id
 * returned by the tailoring pipeline.
 */
const findSourceItem = (
    masterItems,
    sourceId
) => {
    if (!sourceId) {
        return null;
    }

    return masterItems.find(
        (item) =>
            item._id &&
            item._id.toString() ===
            sourceId.toString()
    );
};

/**
 * Resolve tailored projects back to the
 * corresponding master-resume projects.
 *
 * Master resume remains the source of truth
 * for factual metadata such as:
 * - name
 * - github
 * - liveUrl
 *
 * Tailored data provides:
 * - description
 * - technologies
 * - bullets
 */
const resolveProjects = (
    masterResume,
    tailoredResume
) => {
    if (!tailoredResume) {
        return masterResume.projects || [];
    }

    return (tailoredResume.projects || [])
        .map((tailoredProject) => {
            const masterProject =
                findSourceItem(
                    masterResume.projects || [],
                    tailoredProject.source_id
                );

            if (!masterProject) {
                return null;
            }

            return {
                ...masterProject,

                // Tailored content
                description:
                    tailoredProject.description ??
                    masterProject.description,

                technologies:
                    tailoredProject.technologies ??
                    masterProject.technologies,

                bullets:
                    tailoredProject.bullets ??
                    masterProject.bullets
            };
        })
        .filter(Boolean);
};

/**
 * Resolve tailored experience.
 */
const resolveExperience = (
    masterResume,
    tailoredResume
) => {
    if (!tailoredResume) {
        return masterResume.experience || [];
    }

    return (tailoredResume.experience || [])
        .map((tailoredExperience) => {
            const masterExperience =
                findSourceItem(
                    masterResume.experience || [],
                    tailoredExperience.source_id
                );

            if (!masterExperience) {
                return null;
            }

            return {
                ...masterExperience,

                // Keep company, role, dates, etc.
                // from the master resume.
                //
                // Only replace tailored wording.
                bullets:
                    tailoredExperience.bullets ??
                    masterExperience.bullets
            };
        })
        .filter(Boolean);
};

/**
 * Resolve tailored skills.
 */
const resolveSkills = (
    masterResume,
    tailoredResume
) => {
    if (!tailoredResume) {
        return masterResume.skills || [];
    }

    return (tailoredResume.skills || [])
        .map((tailoredSkill) => {
            const masterSkill =
                findSourceItem(
                    masterResume.skills || [],
                    tailoredSkill.source_id
                );

            if (!masterSkill) {
                return null;
            }

            return {
                ...masterSkill,

                // Use the selected/tailored skill items.
                items:
                    tailoredSkill.items ??
                    masterSkill.items
            };
        })
        .filter(Boolean);
};

/**
 * Resolve tailored achievements.
 */
const resolveAchievements = (
    masterResume,
    tailoredResume
) => {
    if (!tailoredResume) {
        return masterResume.achievements || [];
    }

    return (tailoredResume.achievements || [])
        .map((tailoredAchievement) => {
            const masterAchievement =
                findSourceItem(
                    masterResume.achievements || [],
                    tailoredAchievement.source_id
                );

            if (!masterAchievement) {
                return null;
            }

            return {
                ...masterAchievement,

                // Keep the original achievement title.
                // Allow tailored description wording.
                description:
                    tailoredAchievement.description ??
                    masterAchievement.description
            };
        })
        .filter(Boolean);
};

/**
 * Resolve tailored education.
 */
const resolveEducation = (
    masterResume,
    tailoredResume
) => {
    if (!tailoredResume) {
        return masterResume.education || [];
    }

    return (tailoredResume.education || [])
        .map((tailoredEducation) => {
            const masterEducation =
                findSourceItem(
                    masterResume.education || [],
                    tailoredEducation.source_id
                );

            if (!masterEducation) {
                return null;
            }

            return {
                ...masterEducation,

                // Master resume remains authoritative
                // for institution, degree, field,
                // dates, CGPA, etc.
                //
                // Tailored education currently does
                // not need to override those fields.
            };
        })
        .filter(Boolean);
};

/**
 * Resolve tailored certifications.
 */
const resolveCertifications = (
    masterResume,
    tailoredResume
) => {
    if (!tailoredResume) {
        return masterResume.certifications || [];
    }

    return (tailoredResume.certifications || [])
        .map((tailoredCertification) => {
            const masterCertification =
                findSourceItem(
                    masterResume.certifications || [],
                    tailoredCertification.source_id
                );

            if (!masterCertification) {
                return null;
            }

            return {
                ...masterCertification,

                description:
                    tailoredCertification.description ??
                    ""
            };
        })
        .filter(Boolean);
};

/**
 * Combine master resume + tailored resume.
 *
 * Personal information ALWAYS comes from the master resume.
 *
 * This is important because the LLM should never
 * modify someone's name, email, phone, links, etc.
 */
const resolveResumeData = (
    masterResume,
    tailoredResume
) => {
    const master = toPlainObject(
        masterResume
    );

    if (!tailoredResume) {
        return master;
    }

    return {
        ...master,

        personal: {
            ...master.personal
        },

        summary:
            tailoredResume.summary || "",

        education: resolveEducation(
            master,
            tailoredResume
        ),

        experience: resolveExperience(
            master,
            tailoredResume
        ),

        projects: resolveProjects(
            master,
            tailoredResume
        ),

        skills: resolveSkills(
            master,
            tailoredResume
        ),

        achievements:
            resolveAchievements(
                master,
                tailoredResume
            ),

        certifications:
            resolveCertifications(
                master,
                tailoredResume
            )
    };
};

/**
 * Prepare data specifically for Handlebars.
 */
const prepareResumeData = (
    masterResume,
    tailoredResume = null
) => {
    const data = resolveResumeData(
        masterResume,
        tailoredResume
    );

    return {
        ...data,

        personal: {
            ...data.personal,

            // Build links dynamically so empty links
            // are never rendered.
            links: [
                {
                    label: "GitHub",
                    url: data.personal?.github
                },
                {
                    label: "LinkedIn",
                    url: data.personal?.linkedin
                },
                {
                    label: "Portfolio",
                    url: data.personal?.portfolio
                }
            ].filter(
                (link) => link.url
            )
        },

        education: (
            data.education || []
        ).map(
            (education) => ({
                ...education
            })
        ),

        experience: (
            data.experience || []
        ).map(
            (experience) => ({
                ...experience
            })
        ),

        projects: (
            data.projects || []
        ).map(
            (project) => ({
                ...project,

                technologies:
                    Array.isArray(
                        project.technologies
                    )
                        ? project.technologies.join(
                            ", "
                        )
                        : project.technologies ||
                        ""
            })
        ),

        skills: (
            data.skills || []
        ).map(
            (skill) => ({
                ...skill,

                items:
                    Array.isArray(
                        skill.items
                    )
                        ? skill.items.join(
                            ", "
                        )
                        : skill.items || ""
            })
        ),

        achievements:
            data.achievements || [],

        certifications:
            data.certifications || []
    };
};

/**
 * Render a template.
 *
 * tailoredResume is optional so the existing
 * master-resume rendering flow continues to work.
 */
const renderTemplate = async (
    templateId,
    masterResume,
    tailoredResume = null
) => {
    const templatePath = path.join(
        TEMPLATE_ROOT,
        templateId,
        "template.tex"
    );

    const template =
        await fs.readFile(
            templatePath,
            "utf-8"
        );

    const compiledTemplate =
        Handlebars.compile(
            template
        );

    const data =
        prepareResumeData(
            masterResume,
            tailoredResume
        );

    return compiledTemplate(data);
};

module.exports = {
    renderTemplate,
    resolveResumeData
};