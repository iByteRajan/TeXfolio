import React, {
    useEffect,
    useState,
    useRef,
    useCallback
} from "react";

import {
    useSearchParams,
    useNavigate
} from "react-router-dom";

import api from "../services/api";
import LatexEditor from "../components/LatexEditor";
import PdfPreview from "../components/PdfPreview";

const templateNames = {
    modern: "Modern",
    classic: "Classic",
    creative: "Creative"
};

// -------------------------------------------------------
// Minimal in-modal loading animation shown while tailoring
// -------------------------------------------------------
const STEPS = [
    "Analyzing job description...",
    "Matching your experience...",
    "Selecting best content...",
    "Polishing the language...",
    "Assembling your resume...",
];

const TailoringLoader = () => {
    const [step, setStep] = React.useState(0);
    React.useEffect(() => {
        const t = setInterval(() => setStep(s => (s + 1) % STEPS.length), 1800);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-8 gap-5">
            {/* Animated dots */}
            <div className="flex items-end gap-2 h-8">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-indigo-500"
                        style={{
                            animation: `tailorBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                    />
                ))}
            </div>
            {/* Step text */}
            <div className="text-center">
                <p
                    key={step}
                    className="text-base font-semibold text-slate-800"
                    style={{ animation: "tailorFade 0.4s ease" }}
                >
                    {STEPS[step]}
                </p>
                <p className="text-xs text-slate-400 mt-1">AI is working its magic ✨</p>
            </div>
            {/* Progress bar */}
            <div className="w-48 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{
                        background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
                        backgroundSize: "200% 100%",
                        animation: "tailorShimmer 1.8s linear infinite",
                    }}
                />
            </div>
            <style>{`
                @keyframes tailorBounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
                    30% { transform: translateY(-12px); opacity: 1; }
                }
                @keyframes tailorFade {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes tailorShimmer {
                    0%   { background-position: 200% 0; width: 30%; }
                    50%  { background-position: 0% 0;   width: 80%; }
                    100% { background-position: -200% 0; width: 30%; }
                }
            `}</style>
        </div>
    );
};

const defaultSections = {
    summary: true,
    education: true,
    experience: true,
    projects: true,
    skills: true,
    achievements: true,
    certifications: true,
    codingProfiles: true
};

const ResumeStudio = () => {
    const [searchParams] =
        useSearchParams();

    const navigate = useNavigate();

    const templateId =
        searchParams.get("template") ||
        "modern";

    const templateName =
        templateNames[templateId] ||
        templateId;

    // =========================
    // RESUME STATE
    // =========================

    const [latex, setLatex] =
        useState("");

    const [pdfUrl, setPdfUrl] =
        useState(null);

    const [
        tailoredResume,
        setTailoredResume
    ] = useState(null);

    // =========================
    // GENERATION STATE
    // =========================

    const [generating, setGenerating] =
        useState(false);

    const [isTailoring, setIsTailoring] =
        useState(false);

    const [compiling, setCompiling] =
        useState(false);

    // =========================
    // TAILORING MODAL STATE
    // =========================

    const [
        showTailoringPanel,
        setShowTailoringPanel
    ] = useState(false);

    const [
        jobDescription,
        setJobDescription
    ] = useState("");

    const [
        projectLimit,
        setProjectLimit
    ] = useState(2);

    const [
        sections,
        setSections
    ] = useState(
        defaultSections
    );

    const [
        instructions,
        setInstructions
    ] = useState("");

    // =========================
    // RESIZER STATE
    // =========================

    const [leftWidth, setLeftWidth] =
        useState(50);

    const [isResizing, setIsResizing] =
        useState(false);

    const containerRef =
        useRef(null);

    const startResizing =
        useCallback(
            () => setIsResizing(true),
            []
        );

    const stopResizing =
        useCallback(
            () => setIsResizing(false),
            []
        );

    const resize =
        useCallback(
            (e) => {
                if (
                    isResizing &&
                    containerRef.current
                ) {
                    const containerRect =
                        containerRef.current.getBoundingClientRect();

                    const newWidth =
                        ((e.clientX -
                            containerRect.left) /
                            containerRect.width) *
                        100;

                    if (
                        newWidth > 20 &&
                        newWidth < 80
                    ) {
                        setLeftWidth(
                            newWidth
                        );
                    }
                }
            },
            [isResizing]
        );

    useEffect(() => {
        if (isResizing) {
            window.addEventListener(
                "mousemove",
                resize
            );

            window.addEventListener(
                "mouseup",
                stopResizing
            );
        }

        return () => {
            window.removeEventListener(
                "mousemove",
                resize
            );

            window.removeEventListener(
                "mouseup",
                stopResizing
            );
        };
    }, [
        isResizing,
        resize,
        stopResizing
    ]);

    // =========================
    // COMPILE LATEX
    // =========================

    const compileLatex = async (
        latexToCompile
    ) => {
        if (!latexToCompile) {
            return;
        }

        try {
            setCompiling(true);

            const response =
                await api.post(
                    "/render/compile",
                    {
                        latex:
                            latexToCompile
                    },
                    {
                        responseType:
                            "blob"
                    }
                );

            const blob = new Blob(
                [response.data],
                {
                    type:
                        "application/pdf"
                }
            );

            const url =
                URL.createObjectURL(
                    blob
                );

            setPdfUrl(
                (previousUrl) => {
                    if (previousUrl) {
                        URL.revokeObjectURL(
                            previousUrl
                        );
                    }

                    return url;
                }
            );
        } catch (error) {
            console.error(
                "Compilation error:",
                error
            );

            alert(
                "Failed to compile the LaTeX resume."
            );
        } finally {
            setCompiling(false);
        }
    };

    // =========================
    // RENDER RESUME
    // =========================

    const renderResume = async (
        tailored = null
    ) => {
        const response =
            await api.post(
                "/render",
                {
                    templateId,
                    tailoredResume:
                        tailored
                }
            );

        const generatedLatex =
            response.data.latex;

        setLatex(
            generatedLatex
        );

        await compileLatex(
            generatedLatex
        );


        return generatedLatex;
    };

    // =========================
    // GENERATE MASTER RESUME
    // =========================

    const generateMasterResume =
        async () => {
            try {
                setGenerating(true);

                await renderResume(
                    null
                );
            } catch (error) {
                console.error(
                    "Resume rendering error:",
                    error
                );

                alert(
                    "Failed to generate the resume."
                );
            } finally {
                setGenerating(false);
            }
        };

    // =========================
    // TAILOR RESUME
    // =========================

    const tailorResume =
        async () => {
            if (
                !jobDescription.trim()
            ) {
                alert(
                    "Please enter a job description."
                );

                return;
            }

            try {
                setGenerating(true);

                const config = {
                    sections: {
                        ...sections
                    },

                    limits: {
                        projects:
                            projectLimit
                                ? Number(
                                    projectLimit
                                )
                                : null
                    },

                    target_pages: 1,

                    instructions:
                        instructions
                            .split("\n")
                            .map(
                                (item) =>
                                    item.trim()
                            )
                            .filter(
                                Boolean
                            )
                };

                // =========================
                // 1. AI TAILORING
                // =========================

                const tailoringResponse =
                    await api.post(
                        "/tailoring/generate",
                        {
                            jobDescription:
                                jobDescription,
                            config
                        }
                    );

                const generatedTailoredResume =
                    tailoringResponse.data
                        .tailored_resume;

                if (
                    !generatedTailoredResume
                ) {
                    throw new Error(
                        "Tailoring service returned no resume."
                    );
                }

                setTailoredResume(
                    generatedTailoredResume
                );

                // =========================
                // 2. RENDER TAILORED RESUME
                // =========================

                await renderResume(
                    generatedTailoredResume
                );

                // Overlay is dismissed once
                // generation completes.
                setShowTailoringPanel(
                    false
                );
            } catch (error) {
                console.error(
                    "Tailoring error:",
                    error
                );

                console.error(
                    "Response:",
                    error.response?.data
                );

                alert(
                    error.response?.data
                        ?.message ||
                    error.response?.data
                        ?.detail ||
                    "Failed to tailor the resume."
                );
            } finally {
                setGenerating(false);
                setIsTailoring(false);
            }
        };

    // =========================
    // TEMPLATE CHANGE
    // =========================

    useEffect(() => {
        generateMasterResume();
    }, [templateId]);

    // =========================
    // SECTION TOGGLE
    // =========================

    const toggleSection =
        (sectionName) => {
            setSections(
                (previous) => ({
                    ...previous,
                    [sectionName]:
                        !previous[
                        sectionName
                        ]
                })
            );
        };

    // =========================
    // CLEAN PDF URL
    // =========================

    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(
                    pdfUrl
                );
            }
        };
    }, [pdfUrl]);

    // =========================
    // UI
    return (
        <div className="h-screen flex flex-col bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 font-sans">

            {/* ========================= */}
            {/* TAILORING PANEL           */}
            {/* ========================= */}

            {showTailoringPanel && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">

                    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-white/20 animate-slide-up">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 bg-gradient-to-r from-slate-50 to-white sticky top-0 z-10">

                            <div>
                                <h2 className="text-2xl font-bold font-display text-slate-900">
                                    Tailor Resume
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Generate a resume specifically
                                    for this job description.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowTailoringPanel(
                                        false
                                    )
                                }
                                disabled={
                                    generating
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>

                        </div>

                        <div className="space-y-8 p-8">

                            {/* In-modal loading state */}
                            {generating ? (
                                <TailoringLoader />
                            ) : (<>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Job Description
                                </label>

                                <textarea
                                    value={
                                        jobDescription
                                    }
                                    onChange={(e) =>
                                        setJobDescription(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder="Paste the job description here..."
                                    rows={10}
                                    disabled={
                                        generating
                                    }
                                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                                />
                            </div>

                            {/* ========================= */}
                            {/* PROJECT LIMIT              */}
                            {/* ========================= */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Maximum Projects
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={
                                        projectLimit
                                    }
                                    onChange={(e) =>
                                        setProjectLimit(
                                            e.target
                                                .value
                                        )
                                    }
                                    disabled={
                                        generating
                                    }
                                    className="w-32 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    Leave empty if you don't
                                    want to enforce a project limit.
                                </p>
                            </div>

                            {/* ========================= */}
                            {/* SECTIONS                   */}
                            {/* ========================= */}

                            <div>
                                <label className="mb-3 block text-sm font-semibold text-slate-700">
                                    Sections to Include
                                </label>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                                    {Object.entries(
                                        sections
                                    ).map(
                                        ([
                                            section,
                                            enabled
                                        ]) => (
                                            <label
                                                key={
                                                    section
                                                }
                                                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${enabled ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        enabled
                                                    }
                                                    onChange={() =>
                                                        toggleSection(
                                                            section
                                                        )
                                                    }
                                                    disabled={
                                                        generating
                                                    }
                                                    className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                                />

                                                <span className={`text-sm capitalize font-medium ${enabled ? "text-indigo-900" : "text-slate-700"}`}>
                                                    {
                                                        section
                                                    }
                                                </span>
                                            </label>
                                        )
                                    )}

                                </div>
                            </div>

                            {/* ========================= */}
                            {/* INSTRUCTIONS               */}
                            {/* ========================= */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Additional Instructions
                                </label>

                                <textarea
                                    value={
                                        instructions
                                    }
                                    onChange={(e) =>
                                        setInstructions(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder={
                                        "One instruction per line.\nExample: Emphasize backend development.\nExample: Keep the resume concise."
                                    }
                                    rows={5}
                                    disabled={
                                        generating
                                    }
                                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    These instructions guide the
                                    tailoring process without allowing
                                    the AI to invent resume facts.
                                </p>
                            </div>

                            </>)}

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 rounded-b-2xl sticky bottom-0">

                            <button
                                onClick={() =>
                                    setShowTailoringPanel(
                                        false
                                    )
                                }
                                disabled={
                                    generating
                                }
                                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm active:scale-95">
                                Cancel
                            </button>

                            <button
                                onClick={
                                    tailorResume
                                }
                                disabled={
                                    generating ||
                                    !jobDescription.trim()
                                }
                                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-md active:scale-95 flex items-center gap-2"
                            >
                                {generating ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Tailoring...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                        Generate Tailored Resume
                                    </>
                                )}
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* ========================= */}
            {/* MAIN CONTENT              */}
            {/* ========================= */}

            <main className="flex-1 min-h-0 p-4 md:p-6 pb-6 pt-4">

                <div
                    ref={containerRef}
                    className={`h-full min-h-0 flex gap-4 ${isResizing
                        ? "select-none"
                        : ""
                        }`}
                >

                    {/* ========================= */}
                    {/* LATEX EDITOR              */}
                    {/* ========================= */}

                    <section
                        style={{
                            width: `${leftWidth}%`
                        }}
                        className="min-w-[20%] min-h-0 bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl overflow-hidden flex flex-col"
                    >

                        {/* Toolbar */}
                        <div className="h-16 shrink-0 flex items-center justify-between px-6 bg-white/50 border-b border-slate-200/60 backdrop-blur-sm">

                            <div className="flex items-center gap-4">

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/templates"
                                        )
                                    }
                                    className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                    Templates
                                </button>

                                <div className="h-6 w-px bg-slate-300" />

                                <span className="text-sm font-bold font-display text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                                    {templateName}
                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <button
                                    onClick={() =>
                                        setShowTailoringPanel(
                                            true
                                        )
                                    }
                                    disabled={
                                        generating ||
                                        compiling
                                    }
                                    className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                    Tailor Resume
                                </button>

                                <button
                                    onClick={() =>
                                        compileLatex(
                                            latex
                                        )
                                    }
                                    disabled={
                                        compiling ||
                                        generating ||
                                        !latex
                                    }
                                    className="rounded-xl bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-md flex items-center gap-2"
                                >
                                    {compiling ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Compiling...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            Compile
                                        </>
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Monaco */}
                        <div className="flex-1 min-h-0">
                            <LatexEditor
                                value={latex}
                                onChange={
                                    setLatex
                                }
                            />
                        </div>

                    </section>

                    {/* ========================= */}
                    {/* DRAG HANDLE               */}
                    {/* ========================= */}

                    <div
                        onMouseDown={
                            startResizing
                        }
                        className="w-4 flex items-center justify-center cursor-col-resize hover:bg-indigo-100/50 active:bg-indigo-100 transition-colors flex-shrink-0 group/resize rounded-lg"
                    >
                        <div className="w-1 h-12 bg-slate-300 rounded-full group-hover/resize:bg-indigo-400 transition-colors"></div>
                    </div>

                    {/* ========================= */}
                    {/* PDF PREVIEW               */}
                    {/* ========================= */}

                    <section
                        style={{
                            width: `${100 -
                                leftWidth
                                }%`
                        }}
                        className="min-w-[20%] min-h-0 bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl overflow-hidden flex flex-col relative"
                    >

                        {isResizing && (
                            <div className="absolute inset-0 z-50 cursor-col-resize bg-transparent" />
                        )}

                        {/* Preview Toolbar */}
                        <div className="h-16 shrink-0 flex items-center justify-between px-6 bg-white/50 border-b border-slate-200/60 backdrop-blur-sm">

                            <span className="text-sm font-bold font-display text-slate-800">
                                Live Preview
                            </span>

                            {pdfUrl && (
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    Open PDF
                                </a>
                            )}

                        </div>

                        {/* PDF */}
                        <div className="flex-1 min-h-0 overflow-hidden bg-slate-100/50">
                            <PdfPreview
                                pdfUrl={
                                    pdfUrl
                                }
                            />
                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};

export default ResumeStudio;