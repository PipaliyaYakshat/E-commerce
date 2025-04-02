const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    viewOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ViewOrder',
        required: true
    },
    rating: {

        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Rating value is required']

    },
    comment: {
        type: String
    },
});

module.exports = mongoose.model('Review', reviewSchema);