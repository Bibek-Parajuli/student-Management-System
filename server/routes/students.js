const express = require("express");
const verifyJwt=require('../middleware/verifyJwt')

const {
    getAllStudent,
  updateStudent,
  deleteUser,
  addStudent,
} = require("../controllers/students");

const router = express.Router();

router.post("/add", verifyJwt, addStudent); 
router.delete("/delete/:id",verifyJwt, deleteUser); 
router.put("/update/:id",verifyJwt, updateStudent); 
router.get("/all",verifyJwt, getAllStudent); 

module.exports = router;
