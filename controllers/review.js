const RM = require('../models/review')

exports.createReview = async (req, res) => {
    try {

        const createdata = await RM.create(req.body)

        res.status(201).json({
            status: "success",
            message: "User created successfully !",
            createdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};


exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await RM.find().populate('user').populate('viewOrder');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getReviewById = async (req, res) => {
    try {
        const review = await RM.findById(req.params.id).populate('user').populate('viewOrder');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateReview = async (req, res) => {
    try {
        const review = await RM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteReview = async (req, res) => {
    try {
        const review = await RM.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
