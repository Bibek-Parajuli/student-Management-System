const mongoose=require('mongoose')


const studentDetailsSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true, unique: true },
    class: { type: String, required: true }, // e.g., "10A", "12B"
    attendance: [
      {
        date: { type: Date, required: true },
        status: { type: String, enum: ["Present", "Absent"], required: true },
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Authentication", required: true }, // Reference to the Authentication schema
  },
  { timestamps: true }
);

// Contact Details Schema
const contactDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Authentication", required: true }, // Reference to the Authentication schema
  studentContactNumber: { type: Number, required: true },
  guardianName: { type: String, required: true },
  guardianContactNumber: { type: Number, required: true },
});

// Exporting Models
module.exports = {
  StudentDetails: mongoose.model("StudentDetails", studentDetailsSchema),
  ContactDetails: mongoose.model("ContactDetails", contactDetailsSchema),
};
