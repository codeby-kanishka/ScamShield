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
const getThreatMapData = async (req, res) => {
    try {
        const reports = await Report.find({
            latitude: { $exists: true },
            longitude: { $exists: true }
        });

        const locationMap = {};

        reports.forEach((report) => {
            const key = `${report.city}-${report.state}`;

            if (!locationMap[key]) {
                locationMap[key] = {
                    city: report.city,
                    state: report.state,
                    latitude: report.latitude,
                    longitude: report.longitude,
                    reportCount: 0,
                    totalLoss: 0,
                    scamTypes: [],
                    verifiedCount: 0
                };
            }

            locationMap[key].reportCount += 1;
            locationMap[key].totalLoss += report.amountLost || 0;

            if (!locationMap[key].scamTypes.includes(report.scamType)) {
                locationMap[key].scamTypes.push(report.scamType);
            }

            if (report.status === "Verified") {
                locationMap[key].verifiedCount += 1;
            }
        });

        const locations = Object.values(locationMap).map((location) => {
            let riskLevel = "LOW";

            if (
                location.reportCount >= 5 ||
                location.totalLoss >= 100000
            ) {
                riskLevel = "HIGH";
            } else if (
                location.reportCount >= 3 ||
                location.totalLoss >= 25000
            ) {
                riskLevel = "MEDIUM";
            }

            return {
                ...location,
                riskLevel
            };
        });

        res.status(200).json({
            success: true,
            locations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch threat map data",
            error: error.message
        });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const [
            totalReports,
            verifiedReports,
            pendingReports,
            lossResult,
            recentReports,
            categoryStats
        ] = await Promise.all([
            Report.countDocuments(),

            Report.countDocuments({
                status: "Verified"
            }),

            Report.countDocuments({
                status: "Pending"
            }),

            Report.aggregate([
                {
                    $group: {
                        _id: null,
                        totalLoss: {
                            $sum: "$amountLost"
                        }
                    }
                }
            ]),

            Report.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("scamType city state status createdAt")
                .lean(),

            Report.aggregate([
                {
                    $group: {
                        _id: "$scamType",
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 6
                }
            ])
        ]);

        res.status(200).json({
            success: true,

            stats: {
                totalReports,
                verifiedReports,
                pendingReports,
                totalLoss: lossResult[0]?.totalLoss || 0
            },

            recentReports,

            categories: categoryStats.map((item) => ({
                name: item._id,
                count: item.count
            }))
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
};
module.exports = {
    getPhoneIntelligence,
    getThreatMapData,
    getDashboardStats
};