import {
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
    classic: "Classic"
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

                // Close panel after
                // successful generation.
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
    // =========================

    return (
        <div className="h-screen flex flex-col bg-gray-100">

            {/* ========================= */}
            {/* TAILORING PANEL           */}
            {/* ========================= */}

            {showTailoringPanel && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">

                    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Tailor Resume
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
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
                                className="text-xl text-gray-400 hover:text-gray-700"
                            >
                                ×
                            </button>

                        </div>

                        <div className="space-y-6 p-6">

                            {/* ========================= */}
                            {/* JOB DESCRIPTION            */}
                            {/* ========================= */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                    className="w-full resize-y rounded-lg border border-gray-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* ========================= */}
                            {/* PROJECT LIMIT              */}
                            {/* ========================= */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                    className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                                <label className="mb-3 block text-sm font-medium text-gray-700">
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
                                                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50"
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
                                                    className="h-4 w-4"
                                                />

                                                <span className="text-sm capitalize text-gray-700">
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
                                <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                    className="w-full resize-y rounded-lg border border-gray-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    These instructions guide the
                                    tailoring process without allowing
                                    the AI to invent resume facts.
                                </p>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">

                            <button
                                onClick={() =>
                                    setShowTailoringPanel(
                                        false
                                    )
                                }
                                disabled={
                                    generating
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
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
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {generating
                                    ? "Tailoring..."
                                    : "Generate Tailored Resume"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* ========================= */}
            {/* MAIN CONTENT              */}
            {/* ========================= */}

            <main className="flex-1 min-h-0 p-4">

                <div
                    ref={containerRef}
                    className={`h-full min-h-0 flex gap-2 ${isResizing
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
                        className="min-w-[20%] min-h-0 bg-white rounded-xl border overflow-hidden flex flex-col"
                    >

                        {/* Toolbar */}
                        <div className="h-12 shrink-0 flex items-center justify-between px-4 bg-gray-50 border-b">

                            <div className="flex items-center gap-3">

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/templates"
                                        )
                                    }
                                    className="text-sm text-gray-600 hover:text-gray-900 transition"
                                >
                                    ← Back to Templates
                                </button>

                                <div className="h-5 w-px bg-gray-300" />

                                <span className="text-sm font-medium text-gray-700">
                                    {templateName}
                                </span>

                            </div>

                            <div className="flex items-center gap-2">

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
                                    className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
                                >
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
                                    className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
                                >
                                    {compiling
                                        ? "Compiling..."
                                        : "Compile"}
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
                        className="w-2 rounded bg-gray-200 cursor-col-resize hover:bg-blue-400 active:bg-blue-600 transition-colors flex-shrink-0"
                    />

                    {/* ========================= */}
                    {/* PDF PREVIEW               */}
                    {/* ========================= */}

                    <section
                        style={{
                            width: `${100 -
                                leftWidth
                                }%`
                        }}
                        className="min-w-[20%] min-h-0 bg-white rounded-xl border overflow-hidden flex flex-col relative"
                    >

                        {isResizing && (
                            <div className="absolute inset-0 z-50 cursor-col-resize bg-transparent" />
                        )}

                        {/* Preview Toolbar */}
                        <div className="h-12 shrink-0 flex items-center justify-between px-4 bg-gray-50 border-b">

                            <span className="text-sm font-medium text-gray-700">
                                Preview
                            </span>

                            {pdfUrl && (
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Open PDF
                                </a>
                            )}

                        </div>

                        {/* PDF */}
                        <div className="flex-1 min-h-0 overflow-auto bg-gray-100">
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