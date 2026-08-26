const express = require("express");

const {
    getResume,
    updateResume
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getResume);

router.put("/", protect, updateResume);

module.exports = router;