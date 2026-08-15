const Report = require("../models/Report");
const { calculateRiskScore } = require("../utils/riskEngine");

const getPhoneIntelligence = async (req, res) => {
    try {
        const { phoneNumber } = req.params;

        const reports = await Report.find({ phoneNumber });

        if (reports.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No reports found for this phone number"
            });
        }

        const reportCount = reports.length;

        const totalLoss = reports.reduce(
            (sum, report) => sum + (report.amountLost || 0),
            0
        );

        const scamTypes = [
            ...new Set(reports.map(report => report.scamType))
        ];

       const { score, riskLevel } = calculateRiskScore(reports);

        res.status(200).json({
            success: true,
            phoneNumber,
               success: true,
            riskLevel,
            riskScore : score,
            reportCount,
            totalLoss,
            scamTypes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to analyze phone number",
            error: error.message
        });
    }
};

module.exports = {
    getPhoneIntelligence
};