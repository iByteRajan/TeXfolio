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
        <div>
            <h1>Resume Builder</h1>

            <p>
                Welcome, {user?.name}
            </p>

            <Link to="/profile">
                Edit Master Resume
            </Link>

            <Link to="/studio">
                Open Resume Studio
            </Link>

            <br />

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;