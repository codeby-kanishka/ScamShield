const Report = require("../models/Report");

const createReport = async (req, res) => {
    try {
        const report = await Report.create(req.body);

        res.status(201).json({
            success: true,
            message: "Scam report created successfully",
            report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create scam report",
            error: error.message
        });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await Report.find();

        res.status(200).json({
            success: true,
            reports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch scam reports",
            error: error.message
        });
    }
};

module.exports = {createReport,getReports};