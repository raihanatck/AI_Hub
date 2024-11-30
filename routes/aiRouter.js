const express = require('express');
const { CreateAI, EditAI, DeleteAI, GetAI } = require('../controllers/aiController');
const { upload } = require('../middlewares/uploadimage');
const auth = require('../middlewares/auth');
const aiRouter = express.Router();

aiRouter.post('/',auth,upload.single('image'),CreateAI);
aiRouter.put('/:aiid',auth,upload.single('image'),EditAI);
aiRouter.delete('/:aiid',auth,DeleteAI);
aiRouter.get('/',GetAI);

module.exports = aiRouter;