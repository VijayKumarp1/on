const Video = require('../models/Video');

const getVideos = async (_req, res) => {
  const videos = await Video.find()
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.json(videos);
};

const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id).populate('user', 'name avatar');

  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  return res.json(video);
};

const uploadVideo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !req.files?.video?.[0] || !req.files?.thumbnail?.[0]) {
    return res.status(400).json({ message: 'Title, video, and thumbnail are required' });
  }

  const video = await Video.create({
    title,
    description,
    videoUrl: `/uploads/videos/${req.files.video[0].filename}`,
    thumbnailUrl: `/uploads/thumbnails/${req.files.thumbnail[0].filename}`,
    user: req.user._id
  });

  const populatedVideo = await video.populate('user', 'name avatar');

  return res.status(201).json(populatedVideo);
};

const getMyVideos = async (req, res) => {
  const videos = await Video.find({ user: req.user._id })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.json(videos);
};

module.exports = { getVideos, getVideoById, uploadVideo, getMyVideos };
