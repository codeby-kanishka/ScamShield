const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();

const app = express();

app.use(express.json());//middleware 

connectDB();

app.use("/api/reports", reportRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});