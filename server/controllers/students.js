const mongoose = require("mongoose");
const students = require("../models/studentDetails");

const addStudent = async (req, res) => {
  const { name, faculty, semester, contactNumber, email } = req.body;

  // Validate the input fields
  if (!name || !faculty || !semester || !contactNumber || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if student already exists
    const existingStudent = await students.findOne({ contactNumber, email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create new student document
    const newItem = new students({ name, faculty, semester, contactNumber, email });

    // Save the new student
    await newItem.save();

    // Respond with success message
    res.status(201).json({ message: "Student added successfully", student: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error while adding student to database", error });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;  // Access the ID from req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing student ID" });
  }

  try {
    const deletedUser = await students.findOneAndDelete({ _id: id });

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
    const updatedStudent = await students.findByIdAndUpdate(id, req.body, { new: true });

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
    // Retrieve all students from the database
    const allStudents = await students.find();

    // Respond with the list of students
    res.status(200).json({ students: allStudents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

module.exports = { getAllStudent, updateStudent, deleteUser, addStudent };
