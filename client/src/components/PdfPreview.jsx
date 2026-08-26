const PdfPreview = ({ pdfUrl }) => {
    if (!pdfUrl) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                No preview available
            </div>
        );
    }

    return (
        <iframe
            // Appending the parameters hides the browser's default PDF UI
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            title="Resume Preview"
            className="w-full h-full border-0"
        />
    );
};

export default PdfPreview;