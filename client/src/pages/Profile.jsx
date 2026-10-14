
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setName(user?.name || "");
        setEmail(user?.email || "");
    }, [user]);

    const handleCancel = () => {
        setName(user?.name || "");
        setEmail(user?.email || "");
        setError("");
        setSuccess("");
        setIsEditing(false);
    };

    const handleSave = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedName || !trimmedEmail) {
            setError("Name and email are required.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        setSaving(true);

        try {
            await updateUser({
                name: trimmedName,
                email: trimmedEmail
            });

            setIsEditing(false);
            setSuccess("Your profile has been updated successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to update your profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const displayName = user?.name || "User";
    const initial = displayName.trim().charAt(0).toUpperCase() || "U";

    const inputClass =
        "mt-2 w-full rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

    return (
        <div className="min-h-screen bg-[#EEF2F8] text-slate-900">
            {/* Navigation */}
            <header className="sticky top-0 z-40 border-b border-indigo-100 bg-white/95 shadow-sm backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
                    <Link
                        to="/dashboard"
                        className="text-lg font-extrabold tracking-tight text-slate-900"
                    >
                        Resume
                        <span className="text-indigo-600">Studio</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/dashboard"
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            Dashboard
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-9">
                {/* Page heading */}
                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
                        Account settings
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                        Manage your account information and keep
                        your personal details up to date.
                    </p>
                </div>

                {/* Compact profile card */}
                <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-xl shadow-indigo-950/[0.05]">
                    {/* Profile header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#4338CA] px-5 py-6 text-white sm:px-7">
                        <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl" />

                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-2xl font-extrabold shadow-lg backdrop-blur">
                                {initial}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-indigo-200">
                                    Your account
                                </p>

                                <h2 className="mt-1 break-words text-xl font-bold">
                                    {displayName}
                                </h2>

                                <p className="mt-1 break-all text-sm text-indigo-100">
                                    {user?.email}
                                </p>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={() => {
                                        setError("");
                                        setSuccess("");
                                        setIsEditing(true);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:self-center"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                                    </svg>
                                    Edit profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Profile details */}
                    <div className="p-5 sm:p-7">
                        {error && (
                            <div
                                role="alert"
                                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        {success && (
                            <div
                                role="status"
                                className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                            >
                                {success}
                            </div>
                        )}

                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Personal information
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    {isEditing
                                        ? "Update your details below."
                                        : "Your registered account details."}
                                </p>
                            </div>

                            <span className="hidden rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 sm:inline-flex">
                                {isEditing ? "EDIT MODE" : "PROFILE"}
                            </span>
                        </div>

                        <form onSubmit={handleSave}>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="profile-name"
                                        className="text-sm font-bold text-slate-700"
                                    >
                                        Full name
                                    </label>

                                    <input
                                        id="profile-name"
                                        type="text"
                                        autoComplete="name"
                                        maxLength={100}
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        disabled={!isEditing || saving}
                                        required
                                        className={`${inputClass} disabled:cursor-default disabled:bg-slate-50 disabled:text-slate-600`}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="profile-email"
                                        className="text-sm font-bold text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="profile-email"
                                        type="email"
                                        autoComplete="email"
                                        maxLength={254}
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        disabled={!isEditing || saving}
                                        required
                                        className={`${inputClass} disabled:cursor-default disabled:bg-slate-50 disabled:text-slate-600`}
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={saving}
                                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#312E81] to-[#4338CA] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {saving && (
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="9"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    opacity=".25"
                                                />
                                                <path
                                                    d="M21 12a9 9 0 0 0-9-9"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        )}

                                        {saving
                                            ? "Saving changes..."
                                            : "Save changes"}
                                    </button>
                                </div>
                            )}
                        </form>

                        {/* Account information note */}
                        <div className="mt-7 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-700 shadow-sm">
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <rect
                                            x="3"
                                            y="5"
                                            width="18"
                                            height="14"
                                            rx="2"
                                        />
                                        <path d="m3 7 9 6 9-6" />
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">
                                        Keep your details up to date
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-slate-600">
                                        Review your personal information
                                        and email address carefully before
                                        saving any changes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer navigation */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <Link
                        to="/dashboard"
                        className="font-semibold text-indigo-700 transition hover:text-indigo-950"
                    >
                        ← Back to dashboard
                    </Link>

                    <Link
                        to="/templates"
                        className="font-semibold text-slate-600 transition hover:text-indigo-700"
                    >
                        Explore resume templates →
                    </Link>
                </div>
            </main>

            <footer className="mt-7 border-t border-indigo-100 bg-white px-5 py-5">
                <p className="text-center text-sm text-slate-500">
                    Resume Studio · Your experience, presented clearly.
                </p>
            </footer>
        </div>
    );
};

export default Profile;
