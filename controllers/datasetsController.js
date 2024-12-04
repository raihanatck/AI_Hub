const mongoose = require('mongoose');
const datasets = require('../models/datasets');


const createDataset = async (req, res) => {
    const { name, description, tags, link, categoryID } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const existingDataset = await datasets.findOne({ name: name });
        if (existingDataset) {
            return res.status(400).json({ Message: "Dataset aleardy exist." });
        }
        const newDataset = await datasets({
            image,
            name,
            description,
            tags,
            link,
            categoryID
        });
        const savedatasets = await newDataset.save();
        return res.status(200).json({ Created_datasets: savedatasets, Message: "Dataset Created successfully." });
    } catch (error) {
        console.log("Create dataset error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const editDataset = async (req, res) => {
    const id = req.params.datasetid;
    const { name, description, tags, link, categoryID } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const existingDataset = await datasets.findOne({ name, _id: { $ne: id } });
        if (existingDataset) {
            return res.status(400).json({ Message: "This Dataset name aleardy exist." });
        }
        const editdatasets = await datasets({
            image,
            name,
            description,
            tags,
            link,
            categoryID
        });
        if (image) {
            updateData.datasetimage = image; // Only update image if provided
        }
        await datasets.findByIdAndUpdate(id, editdatasets, { new: true });
        return res.status(200).json({ Updated_datasets: editdatasets, Message: "Dataset updated successfully." });

    } catch (error) {
        console.log("Edit dataset error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const DeleteDataset = async (req, res) => {
    const id = req.params.aiid;
    try {
        const deletedatasets = await datasets.findByIdAndDelete(id);
        if (!deletedatasets) {
            return res.status(404).json({ Message: "Dataset not found." });
        }
        return res.status(200).json({ Deleted_datasets: deletedatasets, Message: "Dataset deleted successfully." });
    } catch (error) {
        console.log("Delete dataset error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const GetDataset = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Find the AIs with pagination
        const dataset = await datasets.find().skip((pageNumber - 1) * limitNumber).limit(limitNumber);
        const totalCount = await datasets.countDocuments();
        res.status(200).json({
            dataset, totalCount, // Total count of all AI datasets
            totalPages: Math.ceil(totalCount / limitNumber),  // Calculate total pages
            currentPage: pageNumber,  // Current page
            perPage: limitNumber,     // Items per page
        });
    } catch (error) {
        console.log("Get dataset error: ", error);
        return res.status(500).json({ Message: "Internal server error." });
    }
};

const GetSingleDataset = async (req, res) => {
    const id = req.params.aiid;
    try {
        const dataset = await datasets.findById({ _id: id });
        return res.status(200).json({ dataset });
    } catch (error) {
        console.log("Single get AI error: ", error);
        return res.status(500).json({ Message: "Internal server error." })
    }
}

module.exports = { createDataset, editDataset, DeleteDataset, GetDataset, GetSingleDataset };