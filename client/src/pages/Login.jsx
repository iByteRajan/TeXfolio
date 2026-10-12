import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setError("");
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rs-login relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F7FF] px-4 py-10 font-sans text-slate-900 sm:px-6">
            {/* Background decoration — matches Register */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="rs-login-glow rs-login-glow-one absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-indigo-300/30 blur-[100px]" />
                <div className="rs-login-glow rs-login-glow-two absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-blue-300/25 blur-[110px]" />
                <div className="rs-login-glow rs-login-glow-three absolute left-[35%] top-[35%] h-64 w-64 rounded-full bg-violet-200/20 blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-[0.28]"
                    style={{
                        backgroundImage: "radial-gradient(#A5B4FC 0.8px, transparent 0.8px)",
                        backgroundSize: "24px 24px",
                        maskImage: "linear-gradient(to bottom, black, transparent 85%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
                    }}
                />
            </div>

            <main className="relative z-10 w-full max-w-[460px] animate-[login-enter_0.6s_ease-out_both]">
                {/* Brand */}
                <Link
                    to="/dashboard"
                    className="mb-7 flex items-center justify-center gap-2.5"
                    aria-label="Resume Studio home"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/20">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                            <path d="M14 2v6h6M8 13h8M8 17h6" />
                        </svg>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">
                        Resume<span className="text-indigo-600">Studio</span>
                    </span>
                </Link>

                {/* Login card */}
                <div className="relative overflow-hidden rounded-[28px] border border-white/90 bg-white/90 p-6 shadow-[0_20px_70px_-25px_rgba(79,70,229,0.20)] backdrop-blur-xl sm:p-9">
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-100/60 blur-3xl" />

                    <div className="relative z-10">
                        {/* Heading */}
                        <div className="mb-7 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-600 shadow-sm">
                                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <path d="m10 17 5-5-5-5M15 12H3" />
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-indigo-700">Welcome back</p>
                            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[30px]">
                                Sign in to your account
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Pick up where you left off and keep moving toward your next opportunity.
                            </p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                                    Email address
                                </label>
                                <div className="relative">
                                    <svg className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <svg className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="4" y="10" width="16" height="11" rx="2" />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-blue-500 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <svg className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                Your next opportunity
                            </span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <p className="text-center text-sm text-slate-500">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Your resume journey starts here.
                </p>
            </main>

            <style>{`
                @keyframes login-enter {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes login-glow {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(18px, -14px, 0) scale(1.08); }
                }

                .rs-login-glow-one { animation: login-glow 16s ease-in-out infinite; }
                .rs-login-glow-two { animation: login-glow 20s ease-in-out infinite reverse; }
                .rs-login-glow-three { animation: login-glow 24s ease-in-out infinite; }

                @media (prefers-reduced-motion: reduce) {
                    .rs-login *,
                    .rs-login *::before,
                    .rs-login *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;
