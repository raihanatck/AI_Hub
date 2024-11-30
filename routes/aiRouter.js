const express = require('express');
const { CreateAI, EditAI, DeleteAI, GetAI } = require('../controllers/aiController');
const { upload } = require('../middlewares/uploadimage');
const aiRouter = express.Router();

aiRouter.post('/',upload.single('image'),CreateAI);
aiRouter.put('/:aiid',upload.single('image'),EditAI);
aiRouter.delete('/:aiid',DeleteAI);
aiRouter.get('/',GetAI);

module.exports = aiRouter;