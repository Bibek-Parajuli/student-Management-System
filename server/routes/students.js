const express = require("express");
const {
    getAllStudent,
  updateStudent,
  deleteUser,
  addStudent,
} = require("../controllers/students");

const router = express.Router();

// Corrected route handlers
router.post("/add", addStudent); // Directly pass the function
router.delete("/delete/:id", deleteUser); // Directly pass the function
router.put("/update/:id", updateStudent); // Directly pass the function
router.get("/all", getAllStudent); // Directly pass the function

module.exports = router;
