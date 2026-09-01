const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();

connectDB();

const app = express();

const renderRoutes = require(
    "./routes/renderRoutes"
);

const tailoringRoutes =
    require("./routes/tailoringRoutes");


app.use(
    "/api/tailoring",
    tailoringRoutes
);

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Resume Builder API is running"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/render", renderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});