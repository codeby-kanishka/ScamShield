const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const analyzeScam = async (text) => {
    const response = await client.responses.create({
        model: "gpt-5-mini",
        input: [
            {
                role: "system",
                content: `
You are ScamShield's scam detection assistant.

Analyze the user's suspicious message and return ONLY valid JSON.

The JSON must contain:
- scamType
- confidence
- riskLevel
- redFlags
- recommendation

confidence must be a number from 0 to 100.

riskLevel must be one of:
LOW, MEDIUM, HIGH

redFlags must be an array of strings.
`
            },
            {
                role: "user",
                content: text
            }
        ]
    });

    return JSON.parse(response.output_text);
};

module.exports = {
    analyzeScam
};