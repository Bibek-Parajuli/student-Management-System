const express = require('express');
const router = express.Router();
const { getAllAnnouncements,createAnnouncement,getAnnouncementById } = require('../controllers/noticeController');

// Routes
router.get('/announcements', getAllAnnouncements);
router.post('/announcements', createAnnouncement);
router.get('/announcements/:id', getAnnouncementById);
module.exports = router;
