const express = require("express");
const {
    getAllStudent,
  updateStudent,
  deleteUser,
  addStudent,
} = require("../controllers/students");

const router = express.Router();

router.post("/add", addStudent); 
router.delete("/delete/:id", deleteUser); 
router.put("/update/:id", updateStudent); 
router.get("/all", getAllStudent); 

module.exports = router;
