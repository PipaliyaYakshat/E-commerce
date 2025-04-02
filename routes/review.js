var express = require('express');
var router = express.Router();
const RC = require('../controllers/review')

/* GET home page. */
router.post('/', RC.createReview);
router.get('/find/:id', RC.getReviewById);
router.get('/', RC.getAllReviews);
router.patch('/:id', RC.updateReview);
router.delete('/:id', RC.deleteReview);
module.exports = router;
