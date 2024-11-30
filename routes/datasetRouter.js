const express = require('express');
const { createDataset, editDataset, DeleteDataset, GetDataset } = require('../controllers/datasetsController');
const { upload } = require('../middlewares/uploadimage');
const auth = require('../middlewares/auth');

const datasetRouter = express.Router();

datasetRouter.post('/',auth, upload.single('image'), createDataset);
datasetRouter.put('/:datasetid',auth, upload.single('image'), editDataset);
datasetRouter.put('/:datasetid',auth, DeleteDataset);
datasetRouter.get('/', GetDataset);

module.exports = datasetRouter;