const mongoose = require('mongoose');
const models = require('../models/models');


const createModel = async (req, res) => {
    const { name, description, tags, link, categoryID } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const existingModel = await models.findOne({ name: name });
        if (existingModel) {
            return res.status(400).json({ Message: "Ai aleardy exist." });
        }
        const newModel = await models({
            image,
            name,
            description,
            tags,
            link,
            categoryID
        });
        const saveModel = await newModel.save();
        return res.status(200).json({ CreatedModel: saveModel, Message: "Model Created successfully." });
    } catch (error) {
        console.log("Create model error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const editModel = async (req, res) => {
    const id = req.params.modelid;
    const { name, description, tags, link, categoryID } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const existingModel = await models.findOne({ name, _id: { $ne: id } });
        if (existingModel) {
            return res.status(400).json({ Message: "This model name aleardy exist." });
        }
        const editmodel = {
            image,
            name,
            description,
            tags,
            link,
            categoryID
        };
        if (image) {
            editmodel.image = image; // Only update image if provided
        }
        await models.findByIdAndUpdate(id, editmodel, { new: true });
        return res.status(200).json({ UpdatedModel: editmodel, Message: "Model updated successfully." });

    } catch (error) {
        console.log("Edit model error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const DeleteModel = async (req, res) => {
    const id = req.params.modelid;
    try {
        const deleteModel = await models.findByIdAndDelete(id);
        if (!deleteModel) {
            return res.status(404).json({ Message: "Model not found." });
        }
        return res.status(200).json({ DeletedModel: deleteModel, Message: "Model deleted successfully." });
    } catch (error) {
        console.log("Delete model error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const GetModel = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Find the AIs with pagination
        const model = await models.find().skip((pageNumber - 1) * limitNumber).limit(limitNumber);
        const totalCount = await models.countDocuments();
        const meta = {
            totalCount, // Total count of all AI datasets
            totalPages: Math.ceil(totalCount / limitNumber),  // Calculate total pages
            currentPage: pageNumber,  // Current page
            perPage: limitNumber,     // Items per page
        }
        res.status(200).json({
            model,
            meta
        });
    } catch (error) {
        console.log("Get model error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const GetSingleModel = async (req, res) => {
    const id = req.params.modelid;
    try {
        const model = await models.findById({ _id: id }).populate({ path: 'categoryID', select: 'name' });
        return res.status(200).json({ model });
    } catch (error) {
        console.log("Single get models error: ", error);
        return res.status(500).json({ Message: "Internal server error." })
    }
}
module.exports = { createModel, editModel, DeleteModel, GetModel, GetSingleModel };