const express = require('express')
const { CreateCategory, EditCategory, DeleteCategory, GetCategory } = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.post('/', CreateCategory);
categoryRouter.put('/:categoryid', EditCategory)
categoryRouter.delete('/:categoryid', DeleteCategory);
categoryRouter.get('/',GetCategory);

module.exports = categoryRouter;