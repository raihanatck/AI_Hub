const express = require('express');
const { createModel, editModel, GetModel, GetSingleModel } = require('../controllers/modelsController');
const { deleteModel } = require('mongoose');
const { upload } = require('../middlewares/uploadimage');
const auth = require('../middlewares/auth');
const modelRouter = express.Router();

modelRouter.post('/',auth,upload.single('image'),createModel);
modelRouter.put('/:modelid',auth,upload.single('image'),editModel);
modelRouter.delete('/:modelid',auth,deleteModel);
modelRouter.get('/',GetModel);
modelRouter.get('/:modelid',GetSingleModel);

module.exports = modelRouter;