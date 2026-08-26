const PdfPreview = ({
    pdfUrl
}) => {
    if (!pdfUrl) {
        return (
            <div>
                PDF preview will appear here.
            </div>
        );
    }

    return (
        <iframe
            src={pdfUrl}
            title="Resume Preview"
            style={{
                width: "100%",
                height: "700px",
                border: "none"
            }}
        />
    );
};

export default PdfPreview;