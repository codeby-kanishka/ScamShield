const express = require("express");
const { createReport , getReports } = require("../controllers/reportController");

const router = express.Router();


console.log("Report routes loaded");

router.post("/", createReport);
router.get("/", getReports);

module.exports = router;