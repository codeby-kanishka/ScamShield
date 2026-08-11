const express = require("express");
const { createReport } = require("../controllers/reportController");

const router = express.Router();


console.log("Report routes loaded");

router.post("/", createReport);

module.exports = router;