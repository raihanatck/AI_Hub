const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryname:{
        type: String,
        required:[true,"Categoryname is required"]
    },
    categorydescription:{
        type: String,
        required:[true,"Category description is required"]
    },
});

module.exports = mongoose.model("category",categorySchema);
