const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    tailorResume
} = require("../controllers/tailoringController");

const router = express.Router();

router.post(
    "/generate",
    protect,
    tailorResume
);

module.exports = router;