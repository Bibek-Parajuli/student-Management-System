require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("database connected"));
const { Student, Auth, Attendance } = require("./models/studentDetails");
const studentsRoute = require("./routes/students");
app.use(cors());
app.use(express.json());


app.use("/student", studentsRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
