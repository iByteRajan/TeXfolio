import { useState } from "react";

import api from "../services/api";

import TemplateSelector from "../components/TemplateSelector";
import LatexEditor from "../components/LatexEditor";
import PdfPreview from "../components/PdfPreview";

const ResumeStudio = () => {
    const [selectedTemplate, setSelectedTemplate] =
        useState("modern");

    const [latex, setLatex] = useState("");
    const [pdfUrl, setPdfUrl] = useState(null);

    const [generating, setGenerating] = useState(false);
    const [compiling, setCompiling] = useState(false);

    const generateLatex = async () => {
        try {
            setGenerating(true);

            const response = await api.post(
                "/render",
                {
                    templateId: selectedTemplate
                }
            );

            setLatex(response.data.latex);
        } catch (error) {
            console.error(error);
        } finally {
            setGenerating(false);
        }
    };

    const compileLatex = async () => {
        try {
            setCompiling(true);

            const response = await api.post(
                "/render/compile",
                {
                    latex
                },
                {
                    responseType: "blob"
                }
            );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const url = URL.createObjectURL(blob);

            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }

            setPdfUrl(url);
        } catch (error) {
            console.error(error);
        } finally {
            setCompiling(false);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "20px",
                boxSizing: "border-box"
            }}
        >
            <h1>Resume Studio</h1>

            {/* Controls */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "20px"
                }}
            >
                <TemplateSelector
                    onSelect={setSelectedTemplate}
                />

                <button
                    onClick={generateLatex}
                    disabled={generating}
                >
                    {generating
                        ? "Generating..."
                        : "Generate LaTeX"}
                </button>
            </div>

            {/* Editor + Preview */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "minmax(0, 1fr) minmax(0, 1fr)",
                    gap: "20px",
                    width: "100%"
                }}
            >
                {/* LaTeX Editor */}
                <div
                    style={{
                        minWidth: 0
                    }}
                >
                    <h2>LaTeX</h2>

                    <div
                        style={{
                            width: "100%",
                            height: "650px",
                            overflow: "hidden"
                        }}
                    >
                        <LatexEditor
                            value={latex}
                            onChange={setLatex}
                        />
                    </div>

                    <div
                        style={{
                            marginTop: "10px"
                        }}
                    >
                        <button
                            onClick={compileLatex}
                            disabled={
                                compiling ||
                                !latex
                            }
                        >
                            {compiling
                                ? "Compiling..."
                                : "Compile"}
                        </button>
                    </div>
                </div>

                {/* PDF Preview */}
                <div
                    style={{
                        minWidth: 0
                    }}
                >
                    <h2>Preview</h2>

                    <div
                        style={{
                            width: "100%",
                            height: "650px",
                            border: "1px solid #ccc",
                            overflow: "auto"
                        }}
                    >
                        <PdfPreview
                            pdfUrl={pdfUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeStudio;