const mongoose = require('mongoose');

const aimodelSchema = new mongoose.Schema({
    aiimage: {
        type: String,
        required: true
    },
    ainame: {
        type: String,
        required: true
    },
    aidescription: {
        type: String,
        required: true
    },
    aitags: [{
        type: String
    }],
    ailink: {
        type: String,
        required: true
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
});
const aischema = mongoose.model("aischema", aimodelSchema);
module.exports = aischema;