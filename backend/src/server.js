const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const intelligenceRoutes = require("./routes/intelligenceRoutes");
const cors = require("cors");
//const aiRoutes = require("./routes/aiRoutes");



const app = express();
app.use(cors());

app.use(express.json());//middleware 


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/intelligence", intelligenceRoutes);
//app.use("/api/ai", aiRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});