const express = require("express");
const { getPhoneIntelligence } = require("../controllers/intelligenceController");

const router = express.Router();

router.get("/phone/:phoneNumber", getPhoneIntelligence);

module.exports = router;