const mongoose = require('mongoose');
const categoryModel = require('../models/category')

const CreateCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const existingcategory = await categoryModel.findOne({ name: name });
        if (existingcategory) {
            return res.status(404).json({ Message: "Category is already exist." });
        }
        if(!name){
            return res.status(404).json({Message: "Category name is required"});
        }
        if(!description){
            return res.status(404).json({Message: "Category description is required"});
        }
        const newCategory = await categoryModel({
            name,
            description
        });
        const saveCategory = await newCategory.save();
        return res.status(200).json({ Category: saveCategory, Message: "Category created successfully." });
    } catch (error) {
        console.log("Create category error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};


const EditCategory = async (req, res) => {
    const id = req.params.categoryid;
    const { name, description } = req.body;
    try {
        if(!name){
            return res.status(404).json({Message: "Category name is required"});
        }
        if(!description){
            return res.status(404).json({Message: "Category description is required"});
        }
        const editCategory = {
            name,
            description
        };
        await categoryModel.findByIdAndUpdate(id, editCategory, { new: true });
        return res.status(200).json({ editCategory, Message: "Category updated successfully." });

    } catch (error) {
        console.log("Edit category error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const DeleteCategory = async (req, res) => {
    const id = req.params.categoryid;
    try {
        const delcategory = await categoryModel.findByIdAndDelete(id);
        res.status(200).json({ delcategory, Message: "Category deleted successfully." });
    } catch (error) {
        console.log("Delete category error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};
module.exports = { CreateCategory, EditCategory, DeleteCategory };