const { analyzeScam } = require("../services/aiService");

const analyzeScamText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required"
            });
        }

        const result = await analyzeScam(text);

        res.status(200).json({
            success: true,
            result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to analyze scam",
            error: error.message
        });
    }
};

module.exports = {
    analyzeScamText
};