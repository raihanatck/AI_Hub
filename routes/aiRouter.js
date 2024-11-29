const express = require('express');
const { CreateAI, EditAI, DeleteAI, GetAI } = require('../controllers/aiController');
const { upload } = require('../middlewares/uploadimage');
const aiRouter = express.Router();

aiRouter.post('/',upload.single('aiimage'),CreateAI);
aiRouter.put('/:aiid',upload.single('aiiamge'),EditAI);
aiRouter.delete('/:aiid',DeleteAI);
aiRouter.get('/',GetAI);

module.exports = aiRouter;