import { useState } from "react";

const templates = [
    {
        id: "modern",
        name: "Modern",
        description:
            "Clean modern single-column resume"
    },

    {
        id: "classic",
        name: "Classic",
        description:
            "Traditional professional resume"
    },

    {
        id: "minimal",
        name: "Minimal",
        description:
            "Simple minimalist resume"
    }
];

const TemplateSelector = ({
    onSelect
}) => {
    const [
        selected,
        setSelected
    ] = useState("modern");

    const handleSelect = (id) => {
        setSelected(id);
        onSelect(id);
    };

    return (
        <div>
            <h2>
                Choose Template
            </h2>

            <div>
                {templates.map(
                    (template) => (
                        <div
                            key={template.id}
                        >
                            <h3>
                                {
                                    template.name
                                }
                            </h3>

                            <p>
                                {
                                    template.description
                                }
                            </p>

                            <button
                                onClick={() =>
                                    handleSelect(
                                        template.id
                                    )
                                }
                            >
                                {selected ===
                                template.id
                                    ? "Selected"
                                    : "Use Template"}
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default TemplateSelector;