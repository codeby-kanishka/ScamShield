const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const intelligenceRoutes = require("./routes/intelligenceRoutes");

dotenv.config();

const app = express();

app.use(express.json());//middleware 


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/intelligence", intelligenceRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});