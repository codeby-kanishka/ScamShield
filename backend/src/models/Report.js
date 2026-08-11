const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        scamType: {
            type: String,
            required: true
        },

        phoneNumber: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        amountLost: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["Pending", "Verified", "Resolved"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Report", reportSchema);