const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productname:{
        type: String,
        require:true
    },
    price: {
        type: Number,
        required: true
    },
    stock:
    {
        type: Number,
        required: true
    },
    description: {
        type: String,
        require:true
    },
    image: {
        type: [String],
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
});

module.exports = mongoose.model('Product', productSchema);