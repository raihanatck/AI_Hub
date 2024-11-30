const express = require('express');
const { createModel, editModel, GetModel } = require('../controllers/modelsController');
const { deleteModel } = require('mongoose');
const { upload } = require('../middlewares/uploadimage');
const modelRouter = express.Router();

modelRouter.post('/',upload.single('modelimage'),createModel);
modelRouter.put('/:modelid',upload.single('modelimage'),editModel);
modelRouter.delete('/:modelid',deleteModel);
modelRouter.get('/',GetModel);

module.exports = modelRouter;