const express = require("express");
const { analyzeScamText } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", analyzeScamText);

module.exports = router;