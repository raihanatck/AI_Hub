const express = require('express')
const { CreateCategory, EditCategory, DeleteCategory } = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.post('/', CreateCategory);
categoryRouter.put('/:categoryid', EditCategory)
categoryRouter.delete('/:categoryid', DeleteCategory);

module.exports = categoryRouter;