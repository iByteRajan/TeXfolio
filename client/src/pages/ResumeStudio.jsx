import { useState } from "react";

import api from "../services/api";

import TemplateSelector from
    "../components/TemplateSelector";

import LatexEditor from
    "../components/LatexEditor";

import PdfPreview from
    "../components/PdfPreview";

const ResumeStudio = () => {
    const [
        selectedTemplate,
        setSelectedTemplate
    ] = useState("modern");

    const [
        latex,
        setLatex
    ] = useState("");

    const [
        pdfUrl,
        setPdfUrl
    ] = useState(null);

    const [
        generating,
        setGenerating
    ] = useState(false);

    const [
        compiling,
        setCompiling
    ] = useState(false);

    const generateLatex = async () => {
        try {
            setGenerating(true);

            const response =
                await api.post(
                    "/render",
                    {
                        templateId:
                            selectedTemplate
                    }
                );

            setLatex(
                response.data.latex
            );
        } catch (error) {
            console.error(error);
        } finally {
            setGenerating(false);
        }
    };

    const compileLatex = async () => {
        try {
            setCompiling(true);

            const response =
                await api.post(
                    "/render/compile",
                    {
                        latex
                    },
                    {
                        responseType:
                            "blob"
                    }
                );

            const blob =
                new Blob(
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

            if (pdfUrl) {
                URL.revokeObjectURL(
                    pdfUrl
                );
            }

            setPdfUrl(url);
        } catch (error) {
            console.error(error);
        } finally {
            setCompiling(false);
        }
    };

    return (
        <div>
            <h1>
                Resume Studio
            </h1>

            <TemplateSelector
                onSelect={
                    setSelectedTemplate
                }
            />

            <button
                onClick={
                    generateLatex
                }
                disabled={generating}
            >
                {generating
                    ? "Generating..."
                    : "Generate LaTeX"}
            </button>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "1fr 1fr",
                    gap: "10px"
                }}
            >
                <div>
                    <h2>
                        LaTeX
                    </h2>

                    <LatexEditor
                        value={latex}
                        onChange={
                            setLatex
                        }
                    />

                    <button
                        onClick={
                            compileLatex
                        }
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

                <div>
                    <h2>
                        Preview
                    </h2>

                    <PdfPreview
                        pdfUrl={
                            pdfUrl
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeStudio;