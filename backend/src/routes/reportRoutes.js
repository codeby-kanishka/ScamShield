const express = require("express");
const { createReport , getReports , updateReport , deleteReport } = require("../controllers/reportController");

const router = express.Router();


console.log("Report routes loaded");

router.post("/", createReport);
router.get("/", getReports);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

module.exports = router;