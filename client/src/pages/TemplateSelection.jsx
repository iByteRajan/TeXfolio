import { useNavigate } from "react-router-dom";

const templates = [
    {
        id: "modern",
        name: "Modern Professional",
        description: "A clean, contemporary layout emphasizing readability and modern aesthetics.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        id: "classic",
        name: "Executive Classic",
        description: "A traditional, time-tested layout favored by enterprise and finance.",
        color: "from-slate-700 to-slate-900"
    },
    {
        id: "creative",
        name: "Creative Studio",
        description: "A bold, vibrant layout designed for designers and creatives.",
        color: "from-pink-500 to-orange-400"
    },
    {
        id: "alta",
        name: "Alta",
        description: "A bold, vibrant layout designed for designers and creatives.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        id: "emerald executive",
        name: "Emerald Executive",
        description: "A bold, vibrant layout designed for designers and creatives.",
        color: "from-slate-700 to-slate-900"
    },
    {
        id: "awesome",
        name: "Awesome",
        description: "A bold, vibrant layout designed for designers and creatives.",
        color: "from-pink-500 to-orange-400"
    },
    {
        id: "professional",
        name: "Professional",
        description: "A bold, vibrant layout designed for designers and creatives.",
        color: "from-pink-500 to-red-400"
    },
    {
        id: "midnight minimal",
        name: "Midnight Minimal",
        description: "A bold, vibrant layout designed for designers and creatives.",
        color: "from-gray-700 to-gray-900"
    },
    {
        id: "midnight sidebar",
        name: "Midnight Sidebar",
        description: "A bold, vibrant layout designed for designers and creatives.",
        color: "from-blue-500 to-cyan-400"
    }
];

const TemplateSelection = () => {
    const navigate = useNavigate();

    const selectTemplate = (templateId) => {
        navigate(`/studio?template=${templateId}`);
    };

    return (
        <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 px-6 py-12 md:px-12 font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/40 blur-[120px] mix-blend-multiply pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-[120px] mix-blend-multiply pointer-events-none"></div>

            <div className="mx-auto max-w-6xl relative z-10">
                {/* Navigation */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all duration-300 w-max"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Dashboard
                </button>

                <div className="mb-12 animate-slide-up text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight mb-4">
                        Choose your canvas
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Select a template that fits your industry and style. Our AI will automatically adapt your content to fit perfectly.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template, index) => (
                        <div
                            key={template.id}
                            className="group relative glass-panel overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Template Preview Area */}
                            <div className={`relative h-72 w-full overflow-hidden bg-gradient-to-br ${template.color} p-8 flex flex-col`}>
                                {/* Abstract wireframe representation of a resume */}
                                <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 flex flex-col gap-4 transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                                    <div className="w-1/3 h-4 bg-gray-300 rounded-full"></div>
                                    <div className="w-1/4 h-3 bg-gray-200 rounded-full mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                                        <div className="w-5/6 h-2 bg-gray-200 rounded-full"></div>
                                        <div className="w-4/6 h-2 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                                
                                {/* Overlay gradient */}
                                {/*
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                    <span className="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        Preview Template
                                    </span>
                                </div>
                                */}
                                
                            </div>

                            <div className="p-6 bg-white/80">
                                <h2 className="text-xl font-bold font-display text-gray-900 mb-2">
                                    {template.name}
                                </h2>
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    {template.description}
                                </p>
                                <button
                                    onClick={() => selectTemplate(template.id)}
                                    className="w-full relative overflow-hidden rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-600 hover:shadow-indigo-500/30 active:scale-[0.98]"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Use {template.name}
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
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