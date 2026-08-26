const express = require("express");

const protect = require(
    "../middleware/authMiddleware"
);

const {
    renderResume,
    compileResume
} = require(
    "../controllers/renderController"
);

const router = express.Router();

router.post(
    "/",
    protect,
    renderResume
);

router.post(
    "/compile",
    protect,
    compileResume
);

module.exports = router;