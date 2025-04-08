const mongoose = require("mongoose");
const {Student} = require("../models/studentDetails");

const addStudent = async (req, res) => {
  const { name, email, faculty, contactNumber, semester } = req.body;
  console.log('Add student called with data:', req.body);

  // Validate the input fields
  if (!name || !faculty || !semester || !contactNumber || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if student already exists based on email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Check if student already exists based on contact number
    const existStudent = await Student.findOne({ contactNumber });
    if (existStudent) {
      return res.status(409).json({ message: "Contact number already exists" });
    }

    // Create a new student document
    const newItem = new Student({ name, faculty, semester, contactNumber, email });

    // Save the new student
    await newItem.save();

    console.log('Student added successfully:', newItem);

    // Respond with success message
    res.status(201).json({ message: "Student added successfully", newItem });
  } catch (error) {
    console.error('Error while adding student:', error);
    res.status(500).json({ message: "Error while adding student to database", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;  // Access the ID from req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing student ID" });
  }

  try {
    const deletedUser = await Student.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;  // Access the ID from req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing student ID" });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

const getAllStudent = async (req, res) => {
  try {
    // Retrieve all Student from the database
    const allStudent = await Student.find();

    // Respond with the list of Student
    res.status(200).json({ Student: allStudent });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Student", error });
  }
};

module.exports = { getAllStudent, updateStudent, deleteUser, addStudent };
