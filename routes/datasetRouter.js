const express = require('express');
const { createDataset, editDataset, DeleteDataset, GetDataset } = require('../controllers/datasetsController');
const { upload } = require('../middlewares/uploadimage');

const datasetRouter = express.Router();

datasetRouter.post('/', upload.single('image'), createDataset);
datasetRouter.put('/:datasetid', upload.single('image'), editDataset);
datasetRouter.put('/:datasetid', DeleteDataset);
datasetRouter.get('/', GetDataset);

module.exports = datasetRouter;