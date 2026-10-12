import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ArrowIcon = ({ className = "h-4 w-4" }) => (

    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />

    </svg>

);

const CheckIcon = ({ className = "h-5 w-5" }) => (

    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

        <path d="m5 12 4 4L19 6" />

    </svg>

);

const SparkleIcon = ({ className = "h-5 w-5" }) => (

    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />

        <path d="m19 14 1.1 2.4L22 17l-1.9.8L19 20l-.9-2.2L16 17l2.1-.6L19 14Z" />

    </svg>

);

const FileIcon = ({ className = "h-5 w-5" }) => (

    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />

        <path d="M14 2v6h6M8 13h8M8 17h6" />

    </svg>

);

const steps = [

    { number: "01", title: "Add your experience", description: "Save your skills, projects, education, and work experience in one place.", tag: "Your career profile" },

    { number: "02", title: "Choose a job", description: "Paste the job description so your resume can focus on what matters for that role.", tag: "Job-specific focus" },

    { number: "03", title: "Review your content", description: "Use your real career details to shape relevant, clear resume statements.", tag: "You stay in control" },

    { number: "04", title: "Generate your resume", description: "Choose a design, review the result, and prepare your professional document.", tag: "Ready to use" },

];

const capabilities = [

    { number: "01", title: "Relevant experience, not guesswork", description: "Find useful details from your saved projects, skills, and experience instead of starting from a blank page." },

    { number: "02", title: "Reviewable AI suggestions", description: "Check suggested statements against your career information and edit them before using them." },

    { number: "03", title: "Professional document output", description: "Use structured templates for consistent formatting and a polished final resume." },

];

function Dashboard() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const displayName = user?.name || user?.username || user?.email?.split("@")[0] || "there";

    const initial = displayName.trim().charAt(0).toUpperCase() || "U";

    const handleLogout = async () => {

        try {

            await logout();

            navigate("/login");

        } catch (error) {

            console.error("Logout failed:", error);

        }

    };

    return (

        <div className="rs-page min-h-screen bg-[#EEF2F8] text-slate-900">
            <style>{`

       @keyframes rs-drift-one { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(28px,18px,0) scale(1.08); } }

       @keyframes rs-drift-two { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-24px,-16px,0) scale(1.12); } }

       @keyframes rs-gradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

       @keyframes rs-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

       @keyframes rs-float { 0%,100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(-7px) rotate(-1deg); } }

       .rs-animate-rise { animation: rs-rise .65s both; }

       .rs-delay-1 { animation-delay: .08s; } .rs-delay-2 { animation-delay: .16s; } .rs-delay-3 { animation-delay: .24s; }

       .rs-hero-gradient { background-size: 180% 180%; animation: rs-gradient 16s ease-in-out infinite; }

       .rs-orb-one { animation: rs-drift-one 14s ease-in-out infinite; }

       .rs-orb-two { animation: rs-drift-two 17s ease-in-out infinite; }

       .rs-resume-float { animation: rs-float 7s ease-in-out infinite; }

       @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; } }

     `}</style>

            {/* Navigation */}

            <header className="sticky top-0 z-50 border-b border-indigo-100/80 bg-white/95 shadow-sm shadow-indigo-950/[0.04] backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">

                    <Link to="/dashboard" className="group flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#312E81] to-[#4338CA] text-white shadow-lg shadow-indigo-900/20 transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">

                            <FileIcon className="h-6 w-6" />

                        </div>

                        <span className="text-lg font-extrabold tracking-tight text-slate-900">Resume<span className="text-indigo-600">Studio</span></span>

                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4">

                        <Link to="/profile" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-800 sm:inline-flex">My Profile</Link>

                        <Link to="/templates" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-800 sm:inline-flex">Templates</Link>

                        <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

                        <div className="flex items-center gap-2.5">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-100 bg-indigo-100 text-sm font-extrabold text-indigo-800">{initial}</div>

                            <div className="hidden md:block"><p className="max-w-32 truncate text-sm font-bold text-slate-800">{displayName}</p><p className="text-xs text-slate-500">Your workspace</p></div>

                        </div>

                        <button onClick={handleLogout} title="Sign out" aria-label="Sign out" className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">

                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17l5-5-5-5m5 5H3m9-9h5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-5" /></svg>

                        </button>

                    </div>

                </div>

            </header>

            <main>

                {/* Hero: animated indigo gradient and resume preview */}

                <section className="px-4 pt-6 sm:px-6 lg:px-10 lg:pt-8">

                    <div className="rs-hero-gradient rs-animate-rise relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#4338CA] p-6 text-white shadow-2xl shadow-indigo-950/20 sm:p-8 lg:p-9">

                        <div className="pointer-events-none absolute inset-0 opacity-[0.09]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

                        <div className="rs-orb-one pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl" />

                        <div className="rs-orb-two pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

                        <div className="pointer-events-none absolute right-[28%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />

                        <div className="relative grid items-center gap-9 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_280px] lg:gap-10">

                            <div className="rs-animate-rise">

                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-100 backdrop-blur-sm">

                                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> YOUR RESUME WORKSPACE

                                </div>

                                <h1 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem]">Your next job deserves a <span className="text-indigo-200">better resume.</span></h1>

                                <p className="mt-4 max-w-lg text-sm leading-6 text-indigo-100/85 sm:text-base">Turn your experience into a resume tailored to the job you want. We'll guide you through the process, step by step.</p>

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Link
                                        to="/profile"
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold leading-5 text-white backdrop-blur-sm transition hover:bg-white/20"
                                    >
                                        Complete My Profile
                                    </Link>

                                    <Link
                                        to="/templates"
                                        className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-4 py-3 text-sm font-bold leading-5 text-indigo-950 shadow-lg shadow-indigo-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-xl"
                                    >
                                        <SparkleIcon className="!h-4 !w-4 shrink-0 text-indigo-600" />
                                        <span>Generate My Resume</span>
                                        <ArrowIcon className="!h-4 !w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-indigo-100/90 sm:text-sm">

                                    <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-emerald-300" /> Uses your experience</span>

                                    <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-emerald-300" /> Tailored to the role</span>

                                </div>

                            </div>

                            <div className="relative mx-auto w-full max-w-[260px] md:max-w-[250px] lg:max-w-[280px]">

                                <div className="rs-resume-float rounded-2xl border border-white/25 bg-white/10 p-3 shadow-2xl backdrop-blur-md">

                                    <div className="rounded-xl bg-white p-4 text-slate-800 shadow-lg sm:p-5">

                                        <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">

                                            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-100 to-blue-200" />

                                            <div className="min-w-0 flex-1"><div className="h-3 w-28 max-w-full rounded bg-[#25364D]" /><div className="mt-2 h-2 w-20 rounded bg-indigo-300" /></div>

                                        </div>

                                        {["PROFILE", "EXPERIENCE", "EDUCATION", "SKILLS"].map((label) => (

                                            <div key={label} className="mb-3.5"><p className="mb-2 text-[8px] font-extrabold tracking-[0.18em] text-indigo-700">{label}</p><div className="mb-1.5 h-1.5 w-full rounded-full bg-slate-200" /><div className="mb-1.5 h-1.5 w-5/6 rounded-full bg-slate-200" /><div className="h-1.5 w-2/3 rounded-full bg-slate-200" /></div>

                                        ))}

                                        <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="text-[9px] font-bold text-slate-500">RESUME.PDF</span><span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">READY TO REVIEW</span></div>

                                    </div>

                                </div>

                                <div className="absolute -bottom-3 -left-5 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-xl sm:-left-7"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><CheckIcon className="h-4 w-4" /></div><div><p className="text-xs font-bold text-slate-900">Your story, clearly told</p><p className="text-[10px] text-slate-500">You review the final content</p></div></div></div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* Workflow */}

                <section id="workflow" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-16">

                    <div className="mx-auto max-w-7xl">

                        <div className="mx-auto max-w-2xl text-center rs-animate-rise">

                            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-indigo-700">A simpler workflow</p>

                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl">From your experience to your next opportunity</h2>

                            <p className="mt-4 leading-7 text-slate-600">You don't need to understand every tool. Just follow these simple steps to build a role-specific resume.</p>

                        </div>

                        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {steps.map((step, index) => (

                                <article key={step.number} style={{ animationDelay: `${index * 90}ms` }} className="rs-animate-rise group relative rounded-2xl border border-indigo-100/80 bg-white p-6 shadow-sm shadow-indigo-950/[0.04] transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-950/[0.09]">

                                    <div className="flex items-center justify-between"><span className="text-xs font-extrabold tracking-[0.2em] text-indigo-600">STEP {step.number}</span><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 text-sm font-extrabold text-indigo-800 transition group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:text-white">{step.number}</span></div>

                                    <h3 className="mt-6 text-lg font-bold text-slate-950">{step.title}</h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>

                                    <div className="mt-6 border-t border-indigo-50 pt-4"><span className="text-xs font-bold text-indigo-700">{step.tag}</span></div>

                                    {index < steps.length - 1 && <div className="absolute -right-3 top-10 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-indigo-100 bg-white text-indigo-400 lg:flex"><ArrowIcon className="h-3 w-3" /></div>}

                                </article>

                            ))}

                        </div>

                    </div>

                </section>

                {/* Technology and trust */}

                <section id="technology" className="scroll-mt-24 border-y border-indigo-100 bg-[#F8FAFF] px-5 py-14 sm:px-8 sm:py-16">

                    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div className="rs-animate-rise">

                            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-indigo-700">Made to help you stand out</p>

                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl">AI should highlight your experience, not invent it.</h2>

                            <p className="mt-5 leading-7 text-slate-600">Resume Studio helps organize your career details and present them in a way that fits the role you're applying for. You remain in control of the final content.</p>

                            <button onClick={() => navigate("/profile")} className="mt-6 inline-flex items-center gap-2 font-bold text-indigo-700 transition hover:gap-3 hover:text-indigo-950">Review your profile <ArrowIcon /></button>

                        </div>

                        <div className="space-y-4">

                            {capabilities.map((item, index) => (

                                <article key={item.number} style={{ animationDelay: `${index * 100}ms` }} className="rs-animate-rise flex gap-4 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm shadow-indigo-950/[0.03] transition duration-300 hover:border-indigo-200 hover:shadow-md sm:p-6">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 text-sm font-extrabold text-indigo-800">{item.number}</div>

                                    <div><h3 className="font-bold text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></div>

                                </article>

                            ))}

                        </div>

                    </div>

                    <div className="mx-auto mt-10 max-w-7xl rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-5 shadow-sm sm:p-6">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700"><FileIcon className="h-6 w-6" /></div><div className="flex-1"><h3 className="font-bold text-slate-950">Want more control over the final look?</h3><p className="mt-1 text-sm leading-6 text-slate-600">Explore the available templates and choose a style that suits your professional needs.</p></div><Link to="/templates" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-50">Explore templates <ArrowIcon /></Link></div>

                    </div>

                </section>

                {/* Final CTA */}

                <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10">

                    <div className="rs-hero-gradient relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#4338CA] px-6 py-11 text-center text-white shadow-xl shadow-indigo-950/15 sm:px-12 sm:py-14">

                        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

                        <div className="rs-orb-one pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-indigo-300/25 blur-3xl" />

                        <div className="rs-orb-two pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

                        <div className="relative mx-auto max-w-2xl rs-animate-rise">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm"><SparkleIcon className="h-7 w-7" /></div>

                            <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">Ready to build a resume for your next opportunity?</h2>

                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-indigo-100/85 sm:text-base">Start with your experience. We'll help you shape it into a resume for the job you want.</p>

                            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link
                                    to="/profile"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold leading-5 text-white backdrop-blur-sm transition hover:bg-white/20"
                                >
                                    Complete My Profile
                                </Link>

                                <Link
                                    to="/templates"
                                    className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-4 py-3 text-sm font-bold leading-5 text-indigo-950 shadow-lg shadow-indigo-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-xl"
                                >
                                    <SparkleIcon className="!h-4 !w-4 shrink-0 text-indigo-600" />
                                    <span>Generate My Resume</span>
                                    <ArrowIcon className="!h-4 !w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>

                    </div>

                </section>

            </main>

            <footer className="border-t border-indigo-100 bg-white px-5 py-7 sm:px-8">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">

                    <Link to="/dashboard" className="font-extrabold text-[#1E1B4B] transition hover:text-indigo-600">Resume Studio</Link>

                    <p className="text-center">Built to help you present your experience with clarity and confidence.</p>

                    <div className="flex gap-5"><Link to="/profile" className="transition hover:text-indigo-700">Profile</Link><Link to="/templates" className="transition hover:text-indigo-700">Templates</Link></div>

                </div>

            </footer>

        </div>

    );

}

export default Dashboard;

