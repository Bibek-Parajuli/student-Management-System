const express = require("express");
const router = express.Router();
const { Attendance, Student } = require("../models/studentDetails"); // Adjust path
const mongoose = require("mongoose");


router.get("/attendance/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { date } = req.query;

  if (!studentId || !date)
    return res.status(400).json({ error: "Missing studentId or date" });

  const normalizedDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0));

  try {
    const record = await Attendance.findOne({
      student: studentId,
      date: normalizedDate,
    });

    if (!record) {
      return res.status(200).json({ status: "absent" }); // default to absent if not found
    }

    res.status(200).json({ status: record.status });
  } catch (err) {
    console.error("Error fetching attendance:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/attendance", async (req, res) => {
  const { studentId, status, date } = req.body;

  if (!studentId || !date || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      student: new mongoose.Types.ObjectId(studentId),
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ message: "Attendance updated", attendance: existing });
    }

    const attendance = new Attendance({
      student: studentId,
      status,
      date: new Date(date),
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance created", attendance });
  } catch (err) {
    console.error("Error saving attendance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// GET: Monthly summary
router.get("/summary/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { month } = req.query;

  if (!studentId || !month) {
    return res.status(400).json({ error: "Student ID and month required" });
  }

  try {
    const [year, mon] = month.split("-"); // e.g. "2025-06"
    const start = new Date(year, mon - 1, 1);
    const end = new Date(year, mon, 0, 23, 59, 59); // Last day of month

    const records = await Attendance.find({
      student: studentId,
      date: {
        $gte: start,
        $lte: end,
      },
    });

    const presentCount = records.filter((r) => r.status.toLowerCase() === "present").length;
    const absentCount = records.filter((r) => r.status.toLowerCase() === "absent").length;
    const total = presentCount + absentCount;

    const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

    return res.json({
      present: presentCount,
      absent: absentCount,
      percentage,
    });
  } catch (err) {
    console.error("Error getting monthly summary:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
