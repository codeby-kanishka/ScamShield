const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
    getPhoneIntelligence,
    getThreatMapData,
    getDashboardStats
} = require("../controllers/intelligenceController");

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

router.get("/phone/:phoneNumber", protect, getPhoneIntelligence);

router.get("/map", protect, getThreatMapData);

module.exports = router;