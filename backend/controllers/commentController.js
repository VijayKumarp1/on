const Comment = require('../models/Comment');
const Video = require('../models/Video');

const getComments = async (req, res) => {
  const comments = await Comment.find({ video: req.params.videoId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.json(comments);
};

const addComment = async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  const video = await Video.findById(req.params.videoId);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  const comment = await Comment.create({
    text,
    video: video._id,
    user: req.user._id
  });

  const populatedComment = await comment.populate('user', 'name avatar');

  return res.status(201).json(populatedComment);
};

module.exports = { getComments, addComment };
