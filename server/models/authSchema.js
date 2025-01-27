const mongoose = require("mongoose");

// Authentication Schema (for both Students and Admins)
const authenticationSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email:{type:String, require:true, unique:true},
    password: { type: String, required: true },
    role: { type: String, enum: ["Student", "Admin"], required: true }, // Role to differentiate between users
    timest: { type: Date, required: true }, // Include the timest field
  },
  { timestamps: true }
);

const Authentication = mongoose.model("Authentication", authenticationSchema);
module.exports = Authentication;
