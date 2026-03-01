const express = require('express');
const auth = require('../middleware/auth');
const Video = require('../models/Video');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const videos = await Video.find({ user: req.user._id }).sort({ createdAt: -1 });

  return res.json({
    user: req.user,
    videos
  });
});

module.exports = router;
