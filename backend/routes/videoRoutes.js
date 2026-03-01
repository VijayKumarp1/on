const express = require('express');
const auth = require('../middleware/auth');
const { uploadMedia } = require('../middleware/upload');
const {
  getVideos,
  getVideoById,
  uploadVideo,
  getMyVideos
} = require('../controllers/videoController');

const router = express.Router();

router.get('/', getVideos);
router.get('/me', auth, getMyVideos);
router.get('/:id', getVideoById);
router.post('/', auth, (req, res, next) => {
  uploadMedia.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, uploadVideo);

module.exports = router;
