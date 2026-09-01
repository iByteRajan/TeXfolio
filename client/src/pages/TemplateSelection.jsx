import { useNavigate } from "react-router-dom";

const templates = [
    {
        id: "modern",
        name: "Modern",
        description: "Clean and professional resume layout."
    },
    {
        id: "classic",
        name: "Classic",
        description: "Traditional resume layout."
    }
];

const TemplateSelection = () => {
    const navigate = useNavigate();

    const selectTemplate = (templateId) => {
        navigate(`/studio?template=${templateId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-10">
            <div className="mx-auto max-w-6xl">
                
                {/* Minimal Navigation Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-8 flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                    &larr; Back to Dashboard
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Choose a Template
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Select a template to start building your resume.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Template preview */}
                            <div className="flex h-80 items-center justify-center bg-gray-50">
                                <span className="text-gray-400">
                                    {template.name} Preview
                                </span>
                            </div>

                            <div className="p-5">
                                <h2 className="text-lg font-semibold">
                                    {template.name}
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    {template.description}
                                </p>

                                <button
                                    onClick={() =>
                                        selectTemplate(template.id)
                                    }
                                    className="mt-5 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                                >
                                    Use Template
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateSelection;