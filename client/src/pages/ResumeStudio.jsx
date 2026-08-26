import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import LatexEditor from "../components/LatexEditor";
import PdfPreview from "../components/PdfPreview";

const templateNames = {
    modern: "Modern",
    classic: "Classic"
};

const ResumeStudio = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const templateId = searchParams.get("template") || "modern";
    const templateName = templateNames[templateId] || templateId;

    const [latex, setLatex] = useState("");
    const [pdfUrl, setPdfUrl] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [compiling, setCompiling] = useState(false);

    // =========================
    // RESIZER STATE
    // =========================
    const [leftWidth, setLeftWidth] = useState(50); // Tracks width in percentage
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef(null);

    const startResizing = useCallback(() => setIsResizing(true), []);
    const stopResizing = useCallback(() => setIsResizing(false), []);

    const resize = useCallback((e) => {
        if (isResizing && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            // Calculate mouse position relative to the container
            const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            
            // Clamp the widths between 20% and 80% so panels don't disappear
            if (newWidth > 20 && newWidth < 80) {
                setLeftWidth(newWidth);
            }
        }
    }, [isResizing]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
        }
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing, resize, stopResizing]);

    // =========================
    // API FUNCTIONS
    // =========================
    const compileLatex = async (latexToCompile) => {
        if (!latexToCompile) return;
        try {
            setCompiling(true);
            const response = await api.post("/render/compile", { latex: latexToCompile }, { responseType: "blob" });
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
            setPdfUrl(url);
        } catch (error) {
            console.error(error);
        } finally {
            setCompiling(false);
        }
    };

    const generateLatex = async () => {
        try {
            setGenerating(true);
            const response = await api.post("/render", { templateId });
            const generatedLatex = response.data.latex;
            setLatex(generatedLatex);
            await compileLatex(generatedLatex);
        } catch (error) {
            console.error(error);
        } finally {
            setGenerating(false);
        }
    };

    useEffect(() => {
        generateLatex();
    }, [templateId]);


    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <main className="flex-1 min-h-0 p-4">
                
                {/* 
                  Converted from Grid to Flex. 
                  select-none prevents text from highlighting while dragging.
                */}
                <div
                    ref={containerRef}
                    className={`h-full min-h-0 flex gap-2 ${isResizing ? "select-none" : ""}`}
                >

                    {/* ========================= */}
                    {/* LATEX EDITOR              */}
                    {/* ========================= */}
                    <section
                        style={{ width: `${leftWidth}%` }}
                        className="min-w-[20%] min-h-0 bg-white rounded-xl border overflow-hidden flex flex-col"
                    >
                        {/* Editor Toolbar */}
                        <div className="h-12 shrink-0 flex items-center justify-between px-4 bg-gray-50 border-b">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate("/templates")}
                                    className="text-sm text-gray-600 hover:text-gray-900 transition"
                                >
                                    ← Back to Templates
                                </button>
                                <div className="h-5 w-px bg-gray-300" />
                                <span className="text-sm font-medium text-gray-700">
                                    {templateName}
                                </span>
                            </div>

                            <button
                                onClick={() => compileLatex(latex)}
                                disabled={compiling || generating || !latex}
                                className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
                            >
                                {generating ? "Generating..." : compiling ? "Compiling..." : "Compile"}
                            </button>
                        </div>

                        {/* Monaco Editor */}
                        <div className="flex-1 min-h-0">
                            <LatexEditor value={latex} onChange={setLatex} />
                        </div>
                    </section>


                    {/* ========================= */}
                    {/* DRAG HANDLE               */}
                    {/* ========================= */}
                    <div
                        onMouseDown={startResizing}
                        className="w-2 rounded bg-gray-200 cursor-col-resize hover:bg-blue-400 active:bg-blue-600 transition-colors flex-shrink-0"
                    />


                    {/* ========================= */}
                    {/* PDF PREVIEW               */}
                    {/* ========================= */}
                    <section
                        style={{ width: `${100 - leftWidth}%` }}
                        className="min-w-[20%] min-h-0 bg-white rounded-xl border overflow-hidden flex flex-col relative"
                    >
                        {/* 
                           IFRAME OVERLAY: 
                           Prevents the iframe from swallowing mouse events during drag. 
                        */}
                        {isResizing && (
                            <div className="absolute inset-0 z-50 cursor-col-resize bg-transparent" />
                        )}

                        {/* Preview Toolbar */}
                        <div className="h-12 shrink-0 flex items-center justify-between px-4 bg-gray-50 border-b">
                            <span className="text-sm font-medium text-gray-700">Preview</span>
                            {pdfUrl && (
                                <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                                    Open PDF
                                </a>
                            )}
                        </div>

                        {/* PDF */}
                        <div className="flex-1 min-h-0 overflow-auto bg-gray-100">
                            <PdfPreview pdfUrl={pdfUrl} />
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
};

export default ResumeStudio;