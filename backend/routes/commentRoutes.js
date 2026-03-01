const express = require('express');
const auth = require('../middleware/auth');
const { getComments, addComment } = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', auth, addComment);

module.exports = router;
