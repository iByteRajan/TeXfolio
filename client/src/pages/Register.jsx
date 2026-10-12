
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setError("");
            await register(name, email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rs-register relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F7FF] px-4 py-10 font-sans sm:px-6">

            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="rs-glow rs-glow-one absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-indigo-300/30 blur-[100px]" />
                <div className="rs-glow rs-glow-two absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-blue-300/25 blur-[110px]" />
                <div className="rs-glow rs-glow-three absolute left-[35%] top-[35%] h-64 w-64 rounded-full bg-violet-200/20 blur-[100px]" />

                {/* Subtle dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.28]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#A5B4FC 0.8px, transparent 0.8px)",
                        backgroundSize: "24px 24px",
                        maskImage:
                            "linear-gradient(to bottom, black, transparent 85%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, black, transparent 85%)",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-[460px] animate-[register-enter_0.6s_ease-out_both]">

                {/* Brand */}
                <Link
                    to="/login"
                    className="mb-7 flex items-center justify-center gap-2.5"
                    aria-label="Resume Studio"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/20">
                        <svg
                            className="h-5 w-5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                            <path d="M8 13h8M8 17h6" />
                        </svg>
                    </div>

                    <span className="text-xl font-extrabold tracking-tight text-slate-900">
                        Resume<span className="text-indigo-600">Studio</span>
                    </span>
                </Link>

                {/* Main card */}
                <div className="relative overflow-hidden rounded-[28px] border border-white/90 bg-white/90 p-6 shadow-[0_20px_70px_-25px_rgba(79,70,229,0.20)] backdrop-blur-xl sm:p-9">

                    {/* Top accent */}
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                    {/* Decorative corner glow */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-100/60 blur-3xl" />

                    <div className="relative z-10">

                        {/* Heading */}
                        <div className="mb-7 text-center">

                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[30px]">
                                Create your account
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Start building a resume that gets noticed.
                            </p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div
                                role="alert"
                                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-[register-enter_0.25s_ease-out_both]"
                            >
                                <svg
                                    className="mt-0.5 h-5 w-5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Registration form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Full name
                                </label>

                                <div className="relative">
                                    <svg
                                        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                    </svg>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        maxLength={100}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your full name"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Email address
                                </label>

                                <div className="relative">
                                    <svg
                                        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="m3 7 9 6 9-6" />
                                    </svg>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <svg
                                        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="4" y="10" width="16" height="11" rx="2" />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Create a password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                <p className="mt-2 text-xs text-slate-400">
                                    Choose a strong password to keep your account secure.
                                </p>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-blue-500 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-90"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create account
                                        <svg
                                            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Sign in link */}
                        <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                            <p className="text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-400">
                    Build your future, one application at a time.
                </p>
            </div>

            {/* Page animations */}
            <style>{`
                @keyframes register-enter {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes register-glow {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(18px, -14px, 0) scale(1.08);
                    }
                }

                .rs-glow-one {
                    animation: register-glow 16s ease-in-out infinite;
                }

                .rs-glow-two {
                    animation: register-glow 20s ease-in-out infinite reverse;
                }

                .rs-glow-three {
                    animation: register-glow 24s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .rs-register *,
                    .rs-register *::before,
                    .rs-register *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Register;
