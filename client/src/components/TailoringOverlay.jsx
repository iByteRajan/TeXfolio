import { useEffect, useState } from "react";

const STEPS = [
    { icon: "🔍", label: "Analyzing job description..." },
    { icon: "🧠", label: "Matching your skills & experience..." },
    { icon: "✂️", label: "Selecting the best content..." },
    { icon: "✨", label: "Polishing the language..." },
    { icon: "📄", label: "Generating your resume..." },
];

const TailoringOverlay = ({ visible }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (!visible) {
            setCurrentStep(0);
            return;
        }

        // Generate floating particles once
        setParticles(
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 3,
                delay: Math.random() * 3,
                duration: Math.random() * 4 + 3,
            }))
        );

        // Cycle through steps
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % STEPS.length);
        }, 1800);

        return () => clearInterval(interval);
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
            {/* Animated gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
                    animation: "gradientShift 6s ease infinite alternate",
                }}
            />

            {/* Animated mesh overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, #7c3aed55 0%, transparent 50%),
                                     radial-gradient(circle at 80% 20%, #ec489955 0%, transparent 50%),
                                     radial-gradient(circle at 50% 80%, #3b82f655 0%, transparent 50%)`,
                    animation: "pulseGradient 4s ease-in-out infinite",
                }}
            />

            {/* Floating particles */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full opacity-60"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background: `hsl(${(p.id * 30) % 360}, 80%, 70%)`,
                        animation: `floatParticle ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
                        filter: "blur(1px)",
                    }}
                />
            ))}

            {/* Center card */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-12">
                {/* Orbiting ring animation */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Outer ring */}
                    <div
                        className="absolute inset-0 rounded-full border-2 border-purple-400/40"
                        style={{ animation: "spinSlow 8s linear infinite" }}
                    />
                    {/* Middle ring */}
                    <div
                        className="absolute inset-3 rounded-full border-2 border-pink-400/50"
                        style={{ animation: "spinSlow 5s linear infinite reverse" }}
                    />
                    {/* Inner ring */}
                    <div
                        className="absolute inset-6 rounded-full border-2 border-indigo-400/60"
                        style={{ animation: "spinSlow 3s linear infinite" }}
                    />

                    {/* Orbiting dot - outer */}
                    <div
                        className="absolute inset-0"
                        style={{ animation: "spinSlow 8s linear infinite" }}
                    >
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                    </div>
                    {/* Orbiting dot - middle */}
                    <div
                        className="absolute inset-3"
                        style={{ animation: "spinSlow 5s linear infinite reverse" }}
                    >
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50" />
                    </div>

                    {/* Center icon */}
                    <div
                        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl"
                        style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
                    >
                        <span
                            className="text-3xl"
                            key={currentStep}
                            style={{ animation: "stepSwap 0.4s ease" }}
                        >
                            {STEPS[currentStep].icon}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        Tailoring your resume
                    </h2>
                    <p className="text-white/50 text-sm">Powered by AI · This may take a moment</p>
                </div>

                {/* Step label */}
                <div className="h-8 flex items-center justify-center">
                    <p
                        key={currentStep}
                        className="text-lg font-medium text-white/90"
                        style={{ animation: "fadeSlideUp 0.5s ease" }}
                    >
                        {STEPS[currentStep].label}
                    </p>
                </div>

                {/* Step progress dots */}
                <div className="flex items-center gap-2">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className="rounded-full transition-all duration-500"
                            style={{
                                width: i === currentStep ? "24px" : "8px",
                                height: "8px",
                                background:
                                    i === currentStep
                                        ? "linear-gradient(90deg, #a78bfa, #ec4899)"
                                        : "rgba(255,255,255,0.25)",
                            }}
                        />
                    ))}
                </div>

                {/* Animated progress bar */}
                <div className="w-72 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full"
                        style={{
                            background: "linear-gradient(90deg, #7c3aed, #ec4899, #3b82f6)",
                            backgroundSize: "200% 100%",
                            animation: "progressShimmer 2s linear infinite",
                            width: "60%",
                        }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes gradientShift {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(30deg); }
                }
                @keyframes pulseGradient {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.05); }
                }
                @keyframes floatParticle {
                    0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    100% { transform: translateY(-30px) translateX(15px); opacity: 0.8; }
                }
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.4); }
                    50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6), 0 0 80px rgba(124, 58, 237, 0.3); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes stepSwap {
                    from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
                    to { opacity: 1; transform: scale(1) rotate(0deg); }
                }
                @keyframes progressShimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
};

export default TailoringOverlay;
