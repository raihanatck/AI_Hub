const mongoose = require('mongoose');
const categoryModel = require('../models/category')

const CreateCategory = async (req,res) => {
    const {Name,Descsription} = req.body;
    try {
        const newCategory = await categoryModel({
            Name,
            Descsription
    });
        const saveCategory = await newCategory.save();
        return res.status(200).json({Category : saveCategory, Message: "Category created successfully,"});
    } catch (error) {
        console.log("Create category error: ",error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

module.exports = CreateCategory;