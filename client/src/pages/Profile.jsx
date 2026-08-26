import { useEffect, useState } from "react";

import api from "../services/api";

const emptyResume = {
    personal: {
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        portfolio: ""
    },

    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievements: [],
    certifications: [],
    codingProfiles: []
};

const Profile = () => {
    const [resume, setResume] =
        useState(emptyResume);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response =
                    await api.get("/resume");

                setResume(response.data.resume);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, []);

    const updatePersonal = (field, value) => {
        setResume((prev) => ({
            ...prev,

            personal: {
                ...prev.personal,
                [field]: value
            }
        }));
    };

    const addEducation = () => {
        setResume((prev) => ({
            ...prev,

            education: [
                ...prev.education,

                {
                    institution: "",
                    degree: "",
                    field: "",
                    startDate: "",
                    endDate: "",
                    cgpa: "",
                    description: ""
                }
            ]
        }));
    };

    const removeEducation = (index) => {
        setResume((prev) => ({
            ...prev,

            education: prev.education.filter(
                (_, i) => i !== index
            )
        }));
    };

    const updateEducation = (
        index,
        field,
        value
    ) => {
        setResume((prev) => ({
            ...prev,

            education: prev.education.map(
                (education, i) =>
                    i === index
                        ? {
                              ...education,
                              [field]: value
                          }
                        : education
            )
        }));
    };

    const addProject = () => {
        setResume((prev) => ({
            ...prev,

            projects: [
                ...prev.projects,

                {
                    name: "",
                    description: "",
                    technologies: [],
                    bullets: [],
                    github: "",
                    liveUrl: ""
                }
            ]
        }));
    };

    const removeProject = (index) => {
        setResume((prev) => ({
            ...prev,

            projects: prev.projects.filter(
                (_, i) => i !== index
            )
        }));
    };

    const updateProject = (
        index,
        field,
        value
    ) => {
        setResume((prev) => ({
            ...prev,

            projects: prev.projects.map(
                (project, i) =>
                    i === index
                        ? {
                              ...project,
                              [field]: value
                          }
                        : project
            )
        }));
    };

    const addExperience = () => {
        setResume((prev) => ({
            ...prev,

            experience: [
                ...prev.experience,

                {
                    company: "",
                    role: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    bullets: []
                }
            ]
        }));
    };

    const removeExperience = (index) => {
        setResume((prev) => ({
            ...prev,

            experience:
                prev.experience.filter(
                    (_, i) => i !== index
                )
        }));
    };

    const updateExperience = (
        index,
        field,
        value
    ) => {
        setResume((prev) => ({
            ...prev,

            experience:
                prev.experience.map(
                    (experience, i) =>
                        i === index
                            ? {
                                  ...experience,
                                  [field]: value
                              }
                            : experience
                )
        }));
    };

    const addSkillCategory = () => {
        setResume((prev) => ({
            ...prev,

            skills: [
                ...prev.skills,

                {
                    category: "",
                    items: []
                }
            ]
        }));
    };

    const removeSkillCategory = (index) => {
        setResume((prev) => ({
            ...prev,

            skills: prev.skills.filter(
                (_, i) => i !== index
            )
        }));
    };

    const updateSkillCategory = (
        index,
        field,
        value
    ) => {
        setResume((prev) => ({
            ...prev,

            skills: prev.skills.map(
                (skill, i) =>
                    i === index
                        ? {
                              ...skill,
                              [field]: value
                          }
                        : skill
            )
        }));
    };

    const addAchievement = () => {
        setResume((prev) => ({
            ...prev,

            achievements: [
                ...prev.achievements,

                {
                    title: "",
                    description: ""
                }
            ]
        }));
    };

    const removeAchievement = (index) => {
        setResume((prev) => ({
            ...prev,

            achievements: prev.achievements.filter(
                (_, i) => i !== index
            )
        }));
    };

    const updateAchievement = (
        index,
        field,
        value
    ) => {
        setResume((prev) => ({
            ...prev,

            achievements: prev.achievements.map(
                (achievement, i) =>
                    i === index
                        ? {
                            ...achievement,
                            [field]: value
                        }
                        : achievement
            )
        }));
    };

    const addCertification = () => {
        setResume((prev) => ({
            ...prev,

            certifications: [
                ...prev.certifications,
                {
                    name: "",
                    issuer: "",
                    date: "",
                    url: ""
                }
            ]
        }));
    };

    const removeCertification = (index) => {
        setResume((prev) => ({
            ...prev,

            certifications: prev.certifications.filter(
                (_, i) => i !== index
            )
        }));
    };

    const updateCertification = (
        index,
        field,
        value
    ) => {
        setResume((prev) => ({
            ...prev,

            certifications: prev.certifications.map(
                (certification, i) =>
                    i === index
                        ? {
                            ...certification,
                            [field]: value
                        }
                        : certification
            )
        }));
    };


    const addCodingProfile = () => {
        setResume((prev) => ({
            ...prev,

            codingProfiles: [
                ...prev.codingProfiles,

                {
                    platform: "",
                    username: "",
                    url: "",
                    rating: null,
                    maxRating: null,
                    problemsSolved: null,
                    contestsParticipated: null
                }
            ]
        }));
    };

    const removeCodingProfile = (index) => {
        setResume((prev) => ({
            ...prev,

            codingProfiles:
                prev.codingProfiles.filter(
                    (_, i) => i !== index
                )
        }));
    };

    const updateCodingProfile = (
        index,
        field,
        value
    ) => {
        setResume((prev) => ({
            ...prev,

            codingProfiles:
                prev.codingProfiles.map(
                    (profile, i) =>
                        i === index
                            ? {
                                ...profile,
                                [field]: value
                            }
                            : profile
                )
        }));
    };

    const saveResume = async () => {
        try {
            setSaving(true);
            setMessage("");

            await api.put("/resume", resume);

            setMessage(
                "Resume saved successfully."
            );
        } catch (error) {
            console.error(error);

            setMessage(
                "Failed to save resume."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Master Resume</h1>

            {/* PERSONAL */}

            <section>
                <h2>Personal Information</h2>

                <input
                    placeholder="Name"
                    value={
                        resume.personal.name
                    }
                    onChange={(e) =>
                        updatePersonal(
                            "name",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Email"
                    value={
                        resume.personal.email
                    }
                    onChange={(e) =>
                        updatePersonal(
                            "email",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Phone"
                    value={
                        resume.personal.phone
                    }
                    onChange={(e) =>
                        updatePersonal(
                            "phone",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Location"
                    value={
                        resume.personal.location
                    }
                    onChange={(e) =>
                        updatePersonal(
                            "location",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="LinkedIn"
                    value={
                        resume.personal.linkedin
                    }
                    onChange={(e) =>
                        updatePersonal(
                            "linkedin",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="GitHub"
                    value={
                        resume.personal.github
                    }
                    onChange={(e) =>
                        updatePersonal(
                            "github",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Portfolio"
                    value={
                        resume.personal.portfolio
                    }
                    onChange={(e) =>
                        updatePersonal(
                            "portfolio",
                            e.target.value
                        )
                    }
                />
            </section>

            {/* EDUCATION */}

            <section>
                <h2>Education</h2>

                {resume.education.map(
                    (education, index) => (
                        <div key={index}>
                            <input
                                placeholder="Institution"
                                value={
                                    education.institution
                                }
                                onChange={(e) =>
                                    updateEducation(
                                        index,
                                        "institution",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Degree"
                                value={
                                    education.degree
                                }
                                onChange={(e) =>
                                    updateEducation(
                                        index,
                                        "degree",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Field"
                                value={
                                    education.field
                                }
                                onChange={(e) =>
                                    updateEducation(
                                        index,
                                        "field",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Start Date"
                                value={
                                    education.startDate
                                }
                                onChange={(e) =>
                                    updateEducation(
                                        index,
                                        "startDate",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="End Date"
                                value={
                                    education.endDate
                                }
                                onChange={(e) =>
                                    updateEducation(
                                        index,
                                        "endDate",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="CGPA"
                                value={
                                    education.cgpa
                                }
                                onChange={(e) =>
                                    updateEducation(
                                        index,
                                        "cgpa",
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeEducation(
                                        index
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    )
                )}

                <button
                    type="button"
                    onClick={addEducation}
                >
                    Add Education
                </button>
            </section>

            {/* EXPERIENCE */}

            <section>
                <h2>Experience</h2>

                {resume.experience.map(
                    (experience, index) => (
                        <div
                            key={
                                experience._id || index
                            }
                        >
                            <input
                                placeholder="Company"
                                value={experience.company}
                                onChange={(e) =>
                                    updateExperience(
                                        index,
                                        "company",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Role"
                                value={experience.role}
                                onChange={(e) =>
                                    updateExperience(
                                        index,
                                        "role",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Location"
                                value={experience.location}
                                onChange={(e) =>
                                    updateExperience(
                                        index,
                                        "location",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Start Date"
                                value={experience.startDate}
                                onChange={(e) =>
                                    updateExperience(
                                        index,
                                        "startDate",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="End Date"
                                value={experience.endDate}
                                onChange={(e) =>
                                    updateExperience(
                                        index,
                                        "endDate",
                                        e.target.value
                                    )
                                }
                            />

                            <textarea
                                placeholder="Resume bullets — one bullet per line"
                                value={experience.bullets.join("\n")}
                                onChange={(e) =>
                                    updateExperience(
                                        index,
                                        "bullets",
                                        e.target.value
                                            .split("\n")
                                            .map(
                                                (item) =>
                                                    item.trim()
                                            )
                                            .filter(Boolean)
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeExperience(index)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    )
                )}

                <button
                    type="button"
                    onClick={addExperience}
                >
                    Add Experience
                </button>
            </section>

            {/* PROJECTS */}

            <section>
                <h2>Projects</h2>

                {resume.projects.map(
                    (project, index) => (
                        <div key={project._id || index}>

                            <input
                                placeholder="Project Name"
                                value={project.name}
                                onChange={(e) =>
                                    updateProject(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />

                            <textarea
                                placeholder="Description"
                                value={project.description}
                                onChange={(e) =>
                                    updateProject(
                                        index,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Technologies separated by commas"
                                value={project.technologies.join(", ")}
                                onChange={(e) =>
                                    updateProject(
                                        index,
                                        "technologies",
                                        e.target.value
                                            .split(",")
                                            .map(
                                                (item) =>
                                                    item.trim()
                                            )
                                            .filter(Boolean)
                                    )
                                }
                            />

                            <textarea
                                placeholder="Resume bullets — one bullet per line"
                                value={project.bullets.join("\n")}
                                onChange={(e) =>
                                    updateProject(
                                        index,
                                        "bullets",
                                        e.target.value
                                            .split("\n")
                                            .map(
                                                (item) =>
                                                    item.trim()
                                            )
                                            .filter(Boolean)
                                    )
                                }
                            />

                            <input
                                placeholder="GitHub URL"
                                value={project.github}
                                onChange={(e) =>
                                    updateProject(
                                        index,
                                        "github",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Live URL"
                                value={project.liveUrl}
                                onChange={(e) =>
                                    updateProject(
                                        index,
                                        "liveUrl",
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeProject(index)
                                }
                            >
                                Remove
                            </button>

                        </div>
                    )
                )}

                <button
                    type="button"
                    onClick={addProject}
                >
                    Add Project
                </button>
            </section>


            {/* ACHIEVEMENTS */}

            <section>
                <h2>Achievements</h2>

                {resume.achievements.map(
                    (achievement, index) => (
                        <div key={achievement._id || index}>
                            <input
                                placeholder="Achievement title"
                                value={achievement.title}
                                onChange={(e) =>
                                    updateAchievement(
                                        index,
                                        "title",
                                        e.target.value
                                    )
                                }
                            />

                            <textarea
                                placeholder="Achievement description"
                                value={
                                    achievement.description
                                }
                                onChange={(e) =>
                                    updateAchievement(
                                        index,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeAchievement(index)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    )
                )}

                <button
                    type="button"
                    onClick={addAchievement}
                >
                    Add Achievement
                </button>
            </section>

            {/* CERTIFICATIONS */}

            <section>
                <h2>Certifications</h2>

                {resume.certifications.map(
                    (certification, index) => (
                        <div
                            key={
                                certification._id || index
                            }
                        >
                            <input
                                type="text"
                                placeholder="Certification name"
                                value={certification.name}
                                onChange={(e) =>
                                    updateCertification(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="text"
                                placeholder="Issuing organization"
                                value={certification.issuer}
                                onChange={(e) =>
                                    updateCertification(
                                        index,
                                        "issuer",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="text"
                                placeholder="Date"
                                value={certification.date}
                                onChange={(e) =>
                                    updateCertification(
                                        index,
                                        "date",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="url"
                                placeholder="Certificate URL"
                                value={certification.url}
                                onChange={(e) =>
                                    updateCertification(
                                        index,
                                        "url",
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeCertification(
                                        index
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    )
                )}

                <button
                    type="button"
                    onClick={addCertification}
                >
                    Add Certification
                </button>
            </section>


            {/* CODING PROFILES */}

            <section>
                <h2>Coding Profiles</h2>

                {resume.codingProfiles.map(
                    (profile, index) => (
                        <div
                            key={
                                profile._id || index
                            }
                        >
                            <select
                                value={profile.platform}
                                onChange={(e) =>
                                    updateCodingProfile(
                                        index,
                                        "platform",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Select platform
                                </option>

                                <option value="LeetCode">
                                    LeetCode
                                </option>

                                <option value="Codeforces">
                                    Codeforces
                                </option>

                                <option value="CodeChef">
                                    CodeChef
                                </option>

                                <option value="GeeksforGeeks">
                                    GeeksforGeeks
                                </option>

                                <option value="HackerRank">
                                    HackerRank
                                </option>

                                <option value="AtCoder">
                                    AtCoder
                                </option>

                                <option value="HackerEarth">
                                    HackerEarth
                                </option>

                                <option value="Coding Ninjas">
                                    Coding Ninjas
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>

                            <input
                                type="text"
                                placeholder="Username"
                                value={profile.username}
                                onChange={(e) =>
                                    updateCodingProfile(
                                        index,
                                        "username",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="url"
                                placeholder="Profile URL"
                                value={profile.url}
                                onChange={(e) =>
                                    updateCodingProfile(
                                        index,
                                        "url",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="number"
                                placeholder="Current Rating"
                                value={
                                    profile.rating ?? ""
                                }
                                onChange={(e) =>
                                    updateCodingProfile(
                                        index,
                                        "rating",
                                        e.target.value === ""
                                            ? null
                                            : Number(
                                                e.target.value
                                            )
                                    )
                                }
                            />

                            <input
                                type="number"
                                placeholder="Maximum Rating"
                                value={
                                    profile.maxRating ?? ""
                                }
                                onChange={(e) =>
                                    updateCodingProfile(
                                        index,
                                        "maxRating",
                                        e.target.value === ""
                                            ? null
                                            : Number(
                                                e.target.value
                                            )
                                    )
                                }
                            />

                            <input
                                type="number"
                                placeholder="Problems Solved"
                                value={
                                    profile.problemsSolved ?? ""
                                }
                                onChange={(e) =>
                                    updateCodingProfile(
                                        index,
                                        "problemsSolved",
                                        e.target.value === ""
                                            ? null
                                            : Number(
                                                e.target.value
                                            )
                                    )
                                }
                            />

                            <input
                                type="number"
                                placeholder="Contests Participated"
                                value={
                                    profile.contestsParticipated ??
                                    ""
                                }
                                onChange={(e) =>
                                    updateCodingProfile(
                                        index,
                                        "contestsParticipated",
                                        e.target.value === ""
                                            ? null
                                            : Number(
                                                e.target.value
                                            )
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeCodingProfile(
                                        index
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    )
                )}

                <button
                    type="button"
                    onClick={addCodingProfile}
                >
                    Add Coding Profile
                </button>
            </section>


            {/* SKILLS */}

            <section>
                <h2>Skills</h2>

                {resume.skills.map(
                    (skill, index) => (
                        <div key={index}>
                            <input
                                placeholder="Category"
                                value={
                                    skill.category
                                }
                                onChange={(e) =>
                                    updateSkillCategory(
                                        index,
                                        "category",
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                placeholder="Skills separated by commas"
                                value={
                                    skill.items.join(
                                        ", "
                                    )
                                }
                                onChange={(e) =>
                                    updateSkillCategory(
                                        index,
                                        "items",
                                        e.target.value
                                            .split(",")
                                            .map(
                                                (item) =>
                                                    item.trim()
                                            )
                                            .filter(
                                                Boolean
                                            )
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeSkillCategory(
                                        index
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    )
                )}

                <button
                    type="button"
                    onClick={
                        addSkillCategory
                    }
                >
                    Add Skill Category
                </button>
            </section>

            <hr />

            <button
                type="button"
                onClick={saveResume}
                disabled={saving}
            >
                {saving
                    ? "Saving..."
                    : "Save Resume"}
            </button>

            {message && (
                <p>{message}</p>
            )}
        </div>
    );
};

export default Profile;