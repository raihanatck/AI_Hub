const mongoose = require('mongoose');
const aischema = require('../models/ai');
const category = require('../models/category');

const CreateAI = async (req, res) => {
    const { name, description, tags, link, categoryID } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const existingAI = await aischema.findOne({ name: name });
        if (existingAI) {
            return res.status(400).json({ Message: "Ai aleardy exist." });
        }
        const newAI = await aischema({
            image,
            name,
            description,
            tags,
            link,
            categoryID
        });
        const saveAI = await newAI.save();
        return res.status(200).json({ CreatedAI: saveAI, Message: "Ai Created successfully." });
    } catch (error) {
        console.log("Create AI error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const EditAI = async (req, res) => {
    const id = req.params.aiid;
    const { name, description, tags, link, categoryID } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const existingAI = await aischema.findOne({ name, _id: { $ne: id } });
        if (existingAI) {
            return res.status(400).json({ Message: "This AI name aleardy exist." });
        }
        const editAI = await aischema({
            image,
            name,
            description,
            tags,
            link,
            categoryID
        });
        if (aiimage) {
            updateData.aiimage = image; // Only update image if provided
        }
        await aischema.findByIdAndUpdate(id, editAI, { new: true });
        return res.status(200).json({ UpdatedAI: editAI, Message: "Category updated successfully." });

    } catch (error) {
        console.log("Edit AI error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const DeleteAI = async (req, res) => {
    const id = req.params.aiid;
    try {
        const deleteAI = await aischema.findByIdAndDelete(id);
        if (!deleteAI) {
            return res.status(404).json({ Message: "AI not found." });
        }
        return res.status(200).json({ DeletedAI: deleteAI, Message: "Category deleted successfully." });
    } catch (error) {
        console.log("Delete AI error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const GetAI = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        
        // Find the AIs with pagination
        const AIs = await aischema.find().skip((pageNumber - 1) * limitNumber).limit(limitNumber);
        const totalCount = await aischema.countDocuments();
        res.status(200).json({
            AIs, totalCount, // Total count of all AI models
            totalPages: Math.ceil(totalCount / limitNumber),  // Calculate total pages
            currentPage: pageNumber,  // Current page
            perPage: limitNumber,     // Items per page
        });
    } catch (error) {
        console.log("Get AI error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
}

module.exports = { CreateAI, EditAI, DeleteAI, GetAI };