const Announcement = require('../models/announcement');

// Fetch all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 }); // latest first
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Fetch all events
// const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: 1 }); // upcoming first
//     res.status(200).json(events);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


const createAnnouncement = async (req, res) => {
  try {
    const { title, body, date } = req.body;

    // Validate required fields
    if (!title || !body || !date) {
      return res.status(400).json({ message: "Title, body, and date are required." });
    }

    const newAnnouncement = new Announcement({
      title,
      body,
      date: new Date(date),
    });

    await newAnnouncement.save();
    console.log("done");
    

    res.status(201).json({ message: "Announcement created successfully.", announcement: newAnnouncement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find announcement by MongoDB _id
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement,getAnnouncementById
};
