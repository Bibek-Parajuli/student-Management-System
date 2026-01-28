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
    status: { type: String, enum: ["present", "absent"], required: true },
  },
  { timestamps: true }
);

// Authentication Schema
const authSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    studentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "admin",
      require: true,
    },
    email: { type: String, require: true },

    adminDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },

  { timestamps: true }
);
const adminDetails = new mongoose.Schema({
  name: { type: String, required: true },
  contactNbr: { type: String, require: true },
  address: { type: String, require: true },
});
// Export all models in one object
module.exports = {
  Student: mongoose.model("Student", studentSchema),
  AdminSchema: mongoose.model("Admin", adminDetails),

  Attendance: mongoose.model("Attendance", attendanceSchema),
  Auth: mongoose.model("Auth", authSchema),
};
