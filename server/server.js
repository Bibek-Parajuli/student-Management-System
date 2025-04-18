require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("database connected"));
const { Student, Auth, Attendance } = require("./models/studentDetails");
const studentsRoute = require("./routes/students");
const authRoute=require('./routes/authentication')
app.use(express.json());

app.use('/auth',authRoute);
app.use("/student", studentsRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
