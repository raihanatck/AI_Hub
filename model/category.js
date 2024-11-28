import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    CategoryName: {
        type: String,
        require: [true, 'Categoryname is required']
    },
    CategoryDescription:{
        type: String,
        require: [true, 'Category description is required']
    }
});

module.exports = CategorySchema;