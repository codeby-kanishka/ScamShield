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

module.exports = {
    createReport
};