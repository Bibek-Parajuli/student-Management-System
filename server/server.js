require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected"))
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

const { Student, Auth, Attendance } = require("./models/studentDetails");
const studentsRoute = require("./routes/students");

const authRoute = require("./routes/authentication");
const attendanceRoutes = require("./routes/attendance");
const noticeRoutes = require("./routes/noticeRoute")
app.use(express.json());


app.use("/auth", authRoute);
app.use("/student", studentsRoute);
app.use("/api", attendanceRoutes);
app.use("/api/notice", noticeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
