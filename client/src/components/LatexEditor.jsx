import Editor from "@monaco-editor/react";

const LatexEditor = ({
    value,
    onChange
}) => {
    return (
        <Editor
            height="700px"
            language="latex"
            theme="vs-dark"
            value={value}
            onChange={(value) =>
                onChange(value || "")
            }
            options={{
                minimap: {
                    enabled: false
                },

                fontSize: 14,

                wordWrap: "on",

                automaticLayout: true
            }}
        />
    );
};

export default LatexEditor;