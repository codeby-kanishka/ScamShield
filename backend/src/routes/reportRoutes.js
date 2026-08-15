const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { createReport , getReports , updateReport , deleteReport , getMyReports , verifyReport } = require("../controllers/reportController");

const router = express.Router();


console.log("Report routes loaded");

router.get("/my", protect, getMyReports);
router.post("/", protect,createReport);
router.get("/", protect,getReports);
router.put("/:id", protect,updateReport);
router.delete("/:id",protect, deleteReport);
router.put("/:id/verify", protect, admin, verifyReport);

module.exports = router;