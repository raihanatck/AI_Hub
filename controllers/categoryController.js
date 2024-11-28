const mongoose = require('mongoose');
const categoryModel = require('../models/category')

const CreateCategory = async (req, res) => {
    const { name, descsription } = req.body;
    try {
        const newCategory = await categoryModel({
            name,
            descsription
        });
        const saveCategory = await newCategory.save();
        return res.status(200).json({ Category: saveCategory, Message: "Category created successfully," });
    } catch (error) {
        console.log("Create category error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};


const EditCategory = async (req, res) => {
    const id = req.params.categoryid;
    const { name, descsription } = req.body;
    try {
        const editCategory = {
            name,
            descsription
        };
        await categoryModel.findByIdandUpdate(id, editCategory, { new: true });
        return res.statu(200).json({ editCategory, Message: "Cateory update successfully." });

    } catch (error) {
        console.log("Create category error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const DeleteCategory = async (req, res) => {
    const id = req.params.categoryid;
    try {
        const delcategory = await categoryModel.findByIdandDelete(id);
        res.status(200).json({ delcategory, Message: "Category deleted successfully." });
    } catch (error) {
        console.log("Create category error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};
module.exports = { CreateCategory, EditCategory, DeleteCategory };