import Editor from "@monaco-editor/react";

const LatexEditor = ({ value, onChange }) => {
    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                width="100%"
                language="latex"
                value={value}
                onChange={(value) => onChange(value || "")}
                theme="vs-dark"
                options={{
                    minimap: {
                        enabled: false
                    },
                    fontSize: 14,
                    wordWrap: "on",
                    automaticLayout: true
                }}
            />
        </div>
    );
};

export default LatexEditor;