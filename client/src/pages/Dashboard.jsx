import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="p-8 font-sans text-gray-800">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 max-w-md">
                <h1 className="text-2xl font-bold">Resume Builder</h1>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-1 text-sm bg-red-100 text-red-600 rounded"
                >
                    Logout
                </button>
            </div>

            <p className="mb-8 text-lg">
                Welcome, {user?.name || "User"}
            </p>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 max-w-xs">
                <Link 
                    to="/profile"
                    className="px-4 py-2 bg-gray-200 rounded text-center hover:bg-gray-300"
                >
                    Edit Master Resume
                </Link>

                <Link 
                    to="/templates"
                    className="px-4 py-2 bg-gray-200 rounded text-center hover:bg-gray-300"
                >
                    Choose Resume Template
                </Link>
            </div>

        </div>
    );
};

export default Dashboard;