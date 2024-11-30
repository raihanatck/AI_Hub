const express = require('express')
const { CreateCategory, EditCategory, DeleteCategory, GetCategory } = require("../controllers/categoryController");
const auth = require('../middlewares/auth');

const categoryRouter = express.Router();

categoryRouter.post('/',auth, CreateCategory);
categoryRouter.put('/:categoryid',auth, EditCategory)
categoryRouter.delete('/:categoryid',auth, DeleteCategory);
categoryRouter.get('/',GetCategory);

module.exports = categoryRouter;