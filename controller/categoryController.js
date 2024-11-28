import mongoose from "mongoose";
import CategoryModel from '../model/category';

const createCategory = async (req, res) => {
    const { categoryname, categorydescription } = req.body;
    try {
        const newCategory =  new CategoryModel({
            categoryname,
            categorydescription
        });
       await newCategory.save()
       
    } catch (error) {
        console.log("CreateCategory Error:", error);
    }
}

export default createCategory;