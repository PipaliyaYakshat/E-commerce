const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    Categories: {
        type: String,
        enum: ['food', 'healthWellness','electronics','homeFurniture','sports','clothing','beautySkincare','accessories','shoes'],
        required: [true,'food , healthWellness , electronics , homeFurniture , clothing , beautySkincare , accessories , shoes '],
        

        

    }
});

module.exports = mongoose.model('Category', categorySchema);
