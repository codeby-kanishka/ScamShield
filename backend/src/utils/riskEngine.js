const calculateRiskScore = (reports) => {
    let score = 0;

    const reportCount = reports.length;

    // 1. REPORT COUNT — 30 points
    if (reportCount >= 5) {
        score += 30;
    } else if (reportCount >= 3) {
        score += 20;
    } else if (reportCount >= 2) {
        score += 10;
    }

    // 2. FINANCIAL LOSS — 25 points
    const totalLoss = reports.reduce(
        (sum, report) => sum + (report.amountLost || 0),
        0
    );

    if (totalLoss >= 100000) {
        score += 25;
    } else if (totalLoss >= 50000) {
        score += 20;
    } else if (totalLoss >= 25000) {
        score += 15;
    } else if (totalLoss >= 10000) {
        score += 10;
    }

    // 3. VERIFIED REPORTS — 20 points
    const verifiedCount = reports.filter(
        report => report.status === "Verified"
    ).length;

    if (verifiedCount >= 3) {
        score += 20;
    } else if (verifiedCount >= 2) {
        score += 15;
    } else if (verifiedCount >= 1) {
        score += 10;
    }

    // 4. SCAM DIVERSITY — 15 points
    const scamTypeCount = new Set(
        reports.map(report => report.scamType)
    ).size;

    if (scamTypeCount >= 3) {
        score += 15;
    } else if (scamTypeCount >= 2) {
        score += 10;
    } else if (scamTypeCount >= 1) {
        score += 5;
    }

    // 5. RECENT ACTIVITY — 10 points
    const now = new Date();

    const recentReports = reports.filter(report => {
        const reportDate = new Date(report.createdAt);

        const daysDifference =
            (now - reportDate) / (1000 * 60 * 60 * 24);

        return daysDifference <= 30;
    });

    if (recentReports.length >= 3) {
        score += 10;
    } else if (recentReports.length >= 1) {
        score += 5;
    }

    // Make sure score never exceeds 100
    score = Math.min(score, 100);

    // Risk level
    let riskLevel = "LOW";

    if (score >= 60) {
        riskLevel = "HIGH";
    } else if (score >= 30) {
        riskLevel = "MEDIUM";
    }

    return {
        score,
        riskLevel
    };
};

module.exports = {
    calculateRiskScore
};