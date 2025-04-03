const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    semester: { type: String, required: true },
    faculty: { type: String, enum: ["CSIT", "BCA", "BIM"], required: true },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      // match: /^[0-9]{10}$/,
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    auth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" }, // Link to authentication data
  },
  { timestamps: true }
);

// Attendance Schema
const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["Present", "Absent"], required: true },
  },
  { timestamps: true }
);

// Authentication Schema
const authSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

// Export all models in one object
module.exports = {
  Student: mongoose.model("Student", studentSchema),
  Attendance: mongoose.model("Attendance", attendanceSchema),
  Auth: mongoose.model("Auth", authSchema),
};
