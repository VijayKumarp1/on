const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const folder = file.mimetype.startsWith('video/') ? 'videos' : 'thumbnails';
    cb(null, path.join('uploads', folder));
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

const uploadMedia = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/');
    if (!allowed) return cb(new Error('Only video and image files are allowed'));
    cb(null, true);
  }
});

module.exports = { uploadMedia };
