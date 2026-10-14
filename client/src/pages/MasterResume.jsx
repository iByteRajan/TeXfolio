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

const MasterResume = () => {
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
            setMessage("Resume saved successfully 🎉");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error(error);
            setMessage("Failed to save resume.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    const Label = ({ children }) => (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 mt-3">
            {children}
        </label>
    );

    const inputClasses = "w-full bg-white/50 border border-slate-200/60 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400 outline-none hover:bg-white/80 shadow-sm";
    const sectionClasses = "mb-8 p-8 glass-panel animate-slide-up relative overflow-hidden group";
    const sectionHeaderClasses = "text-2xl font-bold font-display text-slate-900 mb-6 flex items-center gap-3";
    const addBtnClasses = "mt-4 px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-100 hover:text-indigo-700 transition-all active:scale-[0.98] border border-indigo-100 shadow-sm flex items-center gap-2";
    const removeBtnClasses = "mt-4 px-4 py-2 text-sm text-red-500 hover:text-red-700 font-medium hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1";

    return (
        <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 font-sans pb-20 relative">
            {/* Background Decorations */}
            <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/40 blur-[120px] mix-blend-multiply pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-[120px] mix-blend-multiply pointer-events-none z-0"></div>

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm mb-8 px-6 py-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/dashboard")} className="p-2 -ml-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </button>
                        <h1 className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Master Resume</h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {message && (
                            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg animate-fade-in border border-emerald-100">
                                {message}
                            </span>
                        )}
                        <button 
                            onClick={saveResume} 
                            disabled={saving} 
                            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-indigo-600 disabled:opacity-70 transition-all shadow-md active:scale-95 flex items-center gap-2"
                        >
                            {saving ? (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                            )}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* PERSONAL */}
                <section className={sectionClasses} style={{animationDelay: '100ms'}}>
                    <h2 className={sectionHeaderClasses}>
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div><Label>Full Name</Label><input className={inputClasses} placeholder="e.g. Jane Doe" value={resume.personal.name} onChange={(e) => updatePersonal("name", e.target.value)} /></div>
                        <div><Label>Email Address</Label><input className={inputClasses} placeholder="e.g. jane@example.com" value={resume.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} /></div>
                        <div><Label>Phone Number</Label><input className={inputClasses} placeholder="e.g. +1 234 567 890" value={resume.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} /></div>
                        <div><Label>Location (City, State)</Label><input className={inputClasses} placeholder="e.g. New York, NY" value={resume.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} /></div>
                        <div><Label>LinkedIn URL</Label><input className={inputClasses} placeholder="https://linkedin.com/in/..." value={resume.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} /></div>
                        <div><Label>GitHub URL</Label><input className={inputClasses} placeholder="https://github.com/..." value={resume.personal.github} onChange={(e) => updatePersonal("github", e.target.value)} /></div>
                        <div className="md:col-span-2"><Label>Portfolio / Personal Website URL</Label><input className={inputClasses} placeholder="https://myportfolio.com" value={resume.personal.portfolio} onChange={(e) => updatePersonal("portfolio", e.target.value)} /></div>
                    </div>
                </section>

                {/* EXPERIENCE */}
                <section className={sectionClasses} style={{animationDelay: '150ms'}}>
                    <h2 className={sectionHeaderClasses}>
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                        Work Experience
                    </h2>
                    <div className="space-y-8">
                        {resume.experience.map((experience, index) => (
                            <div key={experience._id || index} className="p-6 bg-white/40 border border-slate-200/50 rounded-2xl relative group/item hover:bg-white/60 transition-colors">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                                    <div><Label>Company / Organization Name</Label><input className={inputClasses} value={experience.company} onChange={(e) => updateExperience(index, "company", e.target.value)} /></div>
                                    <div><Label>Job Title / Role</Label><input className={inputClasses} value={experience.role} onChange={(e) => updateExperience(index, "role", e.target.value)} /></div>
                                    <div><Label>Location</Label><input className={inputClasses} value={experience.location} onChange={(e) => updateExperience(index, "location", e.target.value)} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Start Date</Label><input className={inputClasses} value={experience.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} /></div>
                                        <div><Label>End Date</Label><input className={inputClasses} placeholder="Present" value={experience.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} /></div>
                                    </div>
                                </div>
                                <div>
                                    <Label>Responsibility Bullets (One point per line)</Label>
                                    <textarea className={`${inputClasses} min-h-[120px] resize-y`} placeholder="- Developed a feature that..." value={experience.bullets.join("\n")} onChange={(e) => updateExperience(index, "bullets", e.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} />
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button type="button" onClick={() => removeExperience(index)} className={removeBtnClasses}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addExperience} className={addBtnClasses}>+ Add Experience</button>
                </section>

                {/* PROJECTS */}
                <section className={sectionClasses} style={{animationDelay: '200ms'}}>
                    <h2 className={sectionHeaderClasses}>
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div>
                        Projects
                    </h2>
                    <div className="space-y-8">
                        {resume.projects.map((project, index) => (
                            <div key={project._id || index} className="p-6 bg-white/40 border border-slate-200/50 rounded-2xl relative group/item hover:bg-white/60 transition-colors">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                                    <div><Label>Project Name</Label><input className={inputClasses} value={project.name} onChange={(e) => updateProject(index, "name", e.target.value)} /></div>
                                    <div><Label>Technologies (Comma separated)</Label><input className={inputClasses} placeholder="React, Node.js, MongoDB" value={project.technologies.join(", ")} onChange={(e) => updateProject(index, "technologies", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></div>
                                    <div><Label>GitHub URL</Label><input className={inputClasses} value={project.github} onChange={(e) => updateProject(index, "github", e.target.value)} /></div>
                                    <div><Label>Live URL</Label><input className={inputClasses} value={project.liveUrl} onChange={(e) => updateProject(index, "liveUrl", e.target.value)} /></div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Short Description</Label>
                                        <textarea className={`${inputClasses} min-h-[60px] resize-y`} value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Project Details (One point per line)</Label>
                                        <textarea className={`${inputClasses} min-h-[120px] resize-y`} placeholder="- Implemented authentication using..." value={project.bullets.join("\n")} onChange={(e) => updateProject(index, "bullets", e.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button type="button" onClick={() => removeProject(index)} className={removeBtnClasses}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addProject} className={addBtnClasses}>+ Add Project</button>
                </section>

                {/* SKILLS */}
                <section className={sectionClasses} style={{animationDelay: '250ms'}}>
                    <h2 className={sectionHeaderClasses}>
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                        Skills
                    </h2>
                    <div className="space-y-4">
                        {resume.skills.map((skill, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 items-start p-4 bg-white/40 border border-slate-200/50 rounded-xl">
                                <div className="w-full md:w-1/3">
                                    <Label>Category</Label>
                                    <input className={inputClasses} placeholder="e.g. Languages" value={skill.category} onChange={(e) => updateSkillCategory(index, "category", e.target.value)} />
                                </div>
                                <div className="w-full md:w-2/3">
                                    <Label>Skills (Comma separated)</Label>
                                    <div className="flex gap-2">
                                        <input className={inputClasses} placeholder="React, Node.js..." value={skill.items.join(", ")} onChange={(e) => updateSkillCategory(index, "items", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
                                        <button type="button" onClick={() => removeSkillCategory(index)} className="px-3 py-3 mt-[26px] bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-700 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addSkillCategory} className={addBtnClasses}>+ Add Skill Category</button>
                </section>

                {/* EDUCATION */}
                <section className={sectionClasses} style={{animationDelay: '300ms'}}>
                    <h2 className={sectionHeaderClasses}>
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg></div>
                        Education
                    </h2>
                    <div className="space-y-6">
                        {resume.education.map((education, index) => (
                            <div key={index} className="p-6 bg-white/40 border border-slate-200/50 rounded-2xl relative group/item hover:bg-white/60 transition-colors">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="md:col-span-2"><Label>Institution</Label><input className={inputClasses} value={education.institution} onChange={(e) => updateEducation(index, "institution", e.target.value)} /></div>
                                    <div><Label>Degree</Label><input className={inputClasses} value={education.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} /></div>
                                    <div><Label>Field of Study</Label><input className={inputClasses} value={education.field} onChange={(e) => updateEducation(index, "field", e.target.value)} /></div>
                                    <div><Label>CGPA / Grade</Label><input className={inputClasses} value={education.cgpa} onChange={(e) => updateEducation(index, "cgpa", e.target.value)} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Start</Label><input className={inputClasses} placeholder="Aug 2020" value={education.startDate} onChange={(e) => updateEducation(index, "startDate", e.target.value)} /></div>
                                        <div><Label>End</Label><input className={inputClasses} placeholder="May 2024" value={education.endDate} onChange={(e) => updateEducation(index, "endDate", e.target.value)} /></div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button type="button" onClick={() => removeEducation(index)} className={removeBtnClasses}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addEducation} className={addBtnClasses}>+ Add Education</button>
                </section>

                {/* Additional sections collapsed for brevity, can be fully implemented similar to above */}
            </div>
        </div>
    );
};

export default MasterResume;