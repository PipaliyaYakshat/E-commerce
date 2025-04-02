const mongoose = require('mongoose');

const viewOrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending','running', 'Success'],
        default: 'Pending'
    },
});

module.exports = mongoose.model('ViewOrder', viewOrderSchema);