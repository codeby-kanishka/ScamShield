const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createReport , getReports , updateReport , deleteReport } = require("../controllers/reportController");

const router = express.Router();


console.log("Report routes loaded");

router.post("/", protect,createReport);
router.get("/", protect,getReports);
router.put("/:id", protect,updateReport);
router.delete("/:id",protect, deleteReport);

module.exports = router;