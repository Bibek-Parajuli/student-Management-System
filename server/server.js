require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL
).then(()=>console.log('database connected'));


const std = require("./routes/students");
app.use(cors());
app.use(express.json());

app.use("/student", std);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

