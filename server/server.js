const express = require("express");
const app=express();
const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(
  `mongodb+srv://bparajuli:uvCQBfn4gpwVi4zc@cluster0.cfjvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.get("/", (req,res)=>{
  res.send('hello')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});