import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const emptyResume = {
    personal: { name: "", email: "", phone: "", location: "", linkedin: "", github: "", portfolio: "" },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievements: [],
    certifications: [],
    codingProfiles: []
};

const Profile = () => {
    const navigate = useNavigate();
    const [resume, setResume] = useState(emptyResume);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await api.get("/resume");
                setResume(response.data.resume);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, []);

    const updatePersonal = (field, value) => setResume((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

    const addEducation = () => setResume((prev) => ({ ...prev, education: [...prev.education, { institution: "", degree: "", field: "", startDate: "", endDate: "", cgpa: "", description: "" }] }));
    const removeEducation = (index) => setResume((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
    const updateEducation = (index, field, value) => setResume((prev) => ({ ...prev, education: prev.education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)) }));

    const addProject = () => setResume((prev) => ({ ...prev, projects: [...prev.projects, { name: "", description: "", technologies: [], bullets: [], github: "", liveUrl: "" }] }));
    const removeProject = (index) => setResume((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
    const updateProject = (index, field, value) => setResume((prev) => ({ ...prev, projects: prev.projects.map((proj, i) => (i === index ? { ...proj, [field]: value } : proj)) }));

    const addExperience = () => setResume((prev) => ({ ...prev, experience: [...prev.experience, { company: "", role: "", location: "", startDate: "", endDate: "", bullets: [] }] }));
    const removeExperience = (index) => setResume((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
    const updateExperience = (index, field, value) => setResume((prev) => ({ ...prev, experience: prev.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)) }));

    const addSkillCategory = () => setResume((prev) => ({ ...prev, skills: [...prev.skills, { category: "", items: [] }] }));
    const removeSkillCategory = (index) => setResume((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
    const updateSkillCategory = (index, field, value) => setResume((prev) => ({ ...prev, skills: prev.skills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill)) }));

    const addAchievement = () => setResume((prev) => ({ ...prev, achievements: [...prev.achievements, { title: "", description: "" }] }));
    const removeAchievement = (index) => setResume((prev) => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
    const updateAchievement = (index, field, value) => setResume((prev) => ({ ...prev, achievements: prev.achievements.map((ach, i) => (i === index ? { ...ach, [field]: value } : ach)) }));

    const addCertification = () => setResume((prev) => ({ ...prev, certifications: [...prev.certifications, { name: "", issuer: "", date: "", url: "" }] }));
    const removeCertification = (index) => setResume((prev) => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
    const updateCertification = (index, field, value) => setResume((prev) => ({ ...prev, certifications: prev.certifications.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert)) }));

    const addCodingProfile = () => setResume((prev) => ({ ...prev, codingProfiles: [...prev.codingProfiles, { platform: "", username: "", url: "", rating: null, maxRating: null, problemsSolved: null, contestsParticipated: null }] }));
    const removeCodingProfile = (index) => setResume((prev) => ({ ...prev, codingProfiles: prev.codingProfiles.filter((_, i) => i !== index) }));
    const updateCodingProfile = (index, field, value) => setResume((prev) => ({ ...prev, codingProfiles: prev.codingProfiles.map((prof, i) => (i === index ? { ...prof, [field]: value } : prof)) }));

    const saveResume = async () => {
        try {
            setSaving(true);
            setMessage("");
            await api.put("/resume", resume);
            setMessage("Resume saved successfully.");
        } catch (error) {
            console.error(error);
            setMessage("Failed to save resume.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading master resume data...</div>;

    // Helper component for standardizing and highlighting labels
    const Label = ({ children }) => (
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 mt-3">
            {children}
        </label>
    );

    return (
        <div className="max-w-5xl mx-auto p-6 font-sans text-gray-800 bg-gray-50 min-h-screen">
            
            {/* Header & Navigation */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <button onClick={() => navigate("/dashboard")} className="text-sm text-gray-500 hover:text-gray-900 mb-2 block">
                        &larr; Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold">Master Resume</h1>
                </div>
                <button onClick={saveResume} disabled={saving} className="px-6 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 disabled:opacity-50 transition-colors">
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
            
            {message && <p className="mb-4 text-sm font-medium text-green-700 bg-green-100 p-3 rounded">{message}</p>}

            {/* PERSONAL */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <div><Label>Full Name</Label><input className="w-full border p-2 rounded" placeholder="e.g. Jane Doe" value={resume.personal.name} onChange={(e) => updatePersonal("name", e.target.value)} /></div>
                    <div><Label>Email Address</Label><input className="w-full border p-2 rounded" placeholder="e.g. jane@example.com" value={resume.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} /></div>
                    <div><Label>Phone Number</Label><input className="w-full border p-2 rounded" placeholder="e.g. +1 234 567 890" value={resume.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} /></div>
                    <div><Label>Location (City, State)</Label><input className="w-full border p-2 rounded" placeholder="e.g. New York, NY" value={resume.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} /></div>
                    <div><Label>LinkedIn URL</Label><input className="w-full border p-2 rounded" placeholder="https://linkedin.com/in/..." value={resume.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} /></div>
                    <div><Label>GitHub URL</Label><input className="w-full border p-2 rounded" placeholder="https://github.com/..." value={resume.personal.github} onChange={(e) => updatePersonal("github", e.target.value)} /></div>
                    <div className="md:col-span-2"><Label>Portfolio / Personal Website URL</Label><input className="w-full border p-2 rounded" placeholder="https://myportfolio.com" value={resume.personal.portfolio} onChange={(e) => updatePersonal("portfolio", e.target.value)} /></div>
                </div>
            </section>

            {/* EDUCATION */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Education</h2>
                {resume.education.map((education, index) => (
                    <div key={index} className="mb-6 pb-6 border-b border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <div><Label>Institution / University</Label><input className="w-full border p-2 rounded" value={education.institution} onChange={(e) => updateEducation(index, "institution", e.target.value)} /></div>
                            <div><Label>Degree (e.g. B.Tech, B.S.)</Label><input className="w-full border p-2 rounded" value={education.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} /></div>
                            <div><Label>Field of Study / Major</Label><input className="w-full border p-2 rounded" value={education.field} onChange={(e) => updateEducation(index, "field", e.target.value)} /></div>
                            <div><Label>CGPA / Grade</Label><input className="w-full border p-2 rounded" value={education.cgpa} onChange={(e) => updateEducation(index, "cgpa", e.target.value)} /></div>
                            <div><Label>Start Date</Label><input className="w-full border p-2 rounded" placeholder="e.g. Aug 2020" value={education.startDate} onChange={(e) => updateEducation(index, "startDate", e.target.value)} /></div>
                            <div><Label>End Date (or Expected)</Label><input className="w-full border p-2 rounded" placeholder="e.g. May 2024" value={education.endDate} onChange={(e) => updateEducation(index, "endDate", e.target.value)} /></div>
                        </div>
                        <button type="button" onClick={() => removeEducation(index)} className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium">Remove Education Item</button>
                    </div>
                ))}
                <button type="button" onClick={addEducation} className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-medium">+ Add Education</button>
            </section>

            {/* EXPERIENCE */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Experience</h2>
                {resume.experience.map((experience, index) => (
                    <div key={experience._id || index} className="mb-6 pb-6 border-b border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-2">
                            <div><Label>Company / Organization Name</Label><input className="w-full border p-2 rounded" value={experience.company} onChange={(e) => updateExperience(index, "company", e.target.value)} /></div>
                            <div><Label>Job Title / Role</Label><input className="w-full border p-2 rounded" value={experience.role} onChange={(e) => updateExperience(index, "role", e.target.value)} /></div>
                            <div><Label>Location</Label><input className="w-full border p-2 rounded" value={experience.location} onChange={(e) => updateExperience(index, "location", e.target.value)} /></div>
                            <div><Label>Start Date</Label><input className="w-full border p-2 rounded" value={experience.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} /></div>
                            <div><Label>End Date</Label><input className="w-full border p-2 rounded" placeholder="e.g. Present" value={experience.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} /></div>
                        </div>
                        <div>
                            <Label>Responsibility Bullets (One point per line)</Label>
                            <textarea className="w-full border p-2 rounded min-h-[120px]" placeholder="- Developed a feature that..." value={experience.bullets.join("\n")} onChange={(e) => updateExperience(index, "bullets", e.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} />
                        </div>
                        <button type="button" onClick={() => removeExperience(index)} className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium">Remove Experience Item</button>
                    </div>
                ))}
                <button type="button" onClick={addExperience} className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-medium">+ Add Experience</button>
            </section>

            {/* PROJECTS */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Projects</h2>
                {resume.projects.map((project, index) => (
                    <div key={project._id || index} className="mb-6 pb-6 border-b border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-2">
                            <div><Label>Project Name</Label><input className="w-full border p-2 rounded" value={project.name} onChange={(e) => updateProject(index, "name", e.target.value)} /></div>
                            <div><Label>Technologies Used (Comma separated)</Label><input className="w-full border p-2 rounded" placeholder="React, Node.js, MongoDB" value={project.technologies.join(", ")} onChange={(e) => updateProject(index, "technologies", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></div>
                            <div><Label>GitHub / Source Code URL</Label><input className="w-full border p-2 rounded" value={project.github} onChange={(e) => updateProject(index, "github", e.target.value)} /></div>
                            <div><Label>Live Deployment URL</Label><input className="w-full border p-2 rounded" value={project.liveUrl} onChange={(e) => updateProject(index, "liveUrl", e.target.value)} /></div>
                        </div>
                        <div>
                            <Label>Short Description (1-2 sentences)</Label>
                            <textarea className="w-full border p-2 rounded min-h-[60px]" value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} />
                        </div>
                        <div>
                            <Label>Project Details / Bullets (One point per line)</Label>
                            <textarea className="w-full border p-2 rounded min-h-[120px]" placeholder="- Implemented authentication using..." value={project.bullets.join("\n")} onChange={(e) => updateProject(index, "bullets", e.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} />
                        </div>
                        <button type="button" onClick={() => removeProject(index)} className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium">Remove Project Item</button>
                    </div>
                ))}
                <button type="button" onClick={addProject} className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-medium">+ Add Project</button>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Achievements</h2>
                {resume.achievements.map((achievement, index) => (
                    <div key={achievement._id || index} className="mb-6 pb-6 border-b border-gray-100">
                        <div><Label>Achievement Title</Label><input className="w-full border p-2 rounded" placeholder="e.g. 1st Place Hackathon" value={achievement.title} onChange={(e) => updateAchievement(index, "title", e.target.value)} /></div>
                        <div><Label>Achievement Description</Label><textarea className="w-full border p-2 rounded min-h-[80px]" value={achievement.description} onChange={(e) => updateAchievement(index, "description", e.target.value)} /></div>
                        <button type="button" onClick={() => removeAchievement(index)} className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium">Remove Achievement Item</button>
                    </div>
                ))}
                <button type="button" onClick={addAchievement} className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-medium">+ Add Achievement</button>
            </section>

            {/* CERTIFICATIONS */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Certifications</h2>
                {resume.certifications.map((certification, index) => (
                    <div key={certification._id || index} className="mb-6 pb-6 border-b border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            <div><Label>Certification Name</Label><input className="w-full border p-2 rounded" value={certification.name} onChange={(e) => updateCertification(index, "name", e.target.value)} /></div>
                            <div><Label>Issuing Organization</Label><input className="w-full border p-2 rounded" placeholder="AWS, Coursera, etc." value={certification.issuer} onChange={(e) => updateCertification(index, "issuer", e.target.value)} /></div>
                            <div><Label>Date Issued</Label><input className="w-full border p-2 rounded" value={certification.date} onChange={(e) => updateCertification(index, "date", e.target.value)} /></div>
                            <div><Label>Certificate Link / Credential URL</Label><input className="w-full border p-2 rounded" type="url" value={certification.url} onChange={(e) => updateCertification(index, "url", e.target.value)} /></div>
                        </div>
                        <button type="button" onClick={() => removeCertification(index)} className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium">Remove Certification Item</button>
                    </div>
                ))}
                <button type="button" onClick={addCertification} className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-medium">+ Add Certification</button>
            </section>

            {/* CODING PROFILES */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Coding Profiles</h2>
                {resume.codingProfiles.map((profile, index) => (
                    <div key={profile._id || index} className="mb-6 pb-6 border-b border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                            <div>
                                <Label>Platform Name</Label>
                                <select className="w-full border p-2 rounded bg-white" value={profile.platform} onChange={(e) => updateCodingProfile(index, "platform", e.target.value)}>
                                    <option value="">Select platform</option>
                                    <option value="LeetCode">LeetCode</option>
                                    <option value="Codeforces">Codeforces</option>
                                    <option value="CodeChef">CodeChef</option>
                                    <option value="GeeksforGeeks">GeeksforGeeks</option>
                                    <option value="HackerRank">HackerRank</option>
                                    <option value="AtCoder">AtCoder</option>
                                    <option value="HackerEarth">HackerEarth</option>
                                    <option value="Coding Ninjas">Coding Ninjas</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div><Label>Username / Handle</Label><input className="w-full border p-2 rounded" value={profile.username} onChange={(e) => updateCodingProfile(index, "username", e.target.value)} /></div>
                            <div><Label>Profile Link URL</Label><input className="w-full border p-2 rounded" type="url" value={profile.url} onChange={(e) => updateCodingProfile(index, "url", e.target.value)} /></div>
                            <div><Label>Current Rating / Score</Label><input className="w-full border p-2 rounded" type="number" value={profile.rating ?? ""} onChange={(e) => updateCodingProfile(index, "rating", e.target.value === "" ? null : Number(e.target.value))} /></div>
                            <div><Label>Maximum Rating</Label><input className="w-full border p-2 rounded" type="number" value={profile.maxRating ?? ""} onChange={(e) => updateCodingProfile(index, "maxRating", e.target.value === "" ? null : Number(e.target.value))} /></div>
                            <div><Label>Total Problems Solved</Label><input className="w-full border p-2 rounded" type="number" value={profile.problemsSolved ?? ""} onChange={(e) => updateCodingProfile(index, "problemsSolved", e.target.value === "" ? null : Number(e.target.value))} /></div>
                            <div><Label>Contests Participated</Label><input className="w-full border p-2 rounded" type="number" value={profile.contestsParticipated ?? ""} onChange={(e) => updateCodingProfile(index, "contestsParticipated", e.target.value === "" ? null : Number(e.target.value))} /></div>
                        </div>
                        <button type="button" onClick={() => removeCodingProfile(index)} className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium">Remove Profile Item</button>
                    </div>
                ))}
                <button type="button" onClick={addCodingProfile} className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-medium">+ Add Coding Profile</button>
            </section>

            {/* SKILLS */}
            <section className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Skills</h2>
                {resume.skills.map((skill, index) => (
                    <div key={index} className="mb-4 pb-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full md:w-1/3">
                            <Label>Skill Category (e.g. Languages)</Label>
                            <input className="w-full border p-2 rounded" value={skill.category} onChange={(e) => updateSkillCategory(index, "category", e.target.value)} />
                        </div>
                        <div className="w-full md:w-2/3">
                            <Label>Skills (Comma separated list)</Label>
                            <input className="w-full border p-2 rounded" placeholder="React, Node.js, Python..." value={skill.items.join(", ")} onChange={(e) => updateSkillCategory(index, "items", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
                        </div>
                        <button type="button" onClick={() => removeSkillCategory(index)} className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 shrink-0 font-medium mb-0.5">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addSkillCategory} className="px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-medium">+ Add Skill Category</button>
            </section>

        </div>
    );
};

export default Profile;