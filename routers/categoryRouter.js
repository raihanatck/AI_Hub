const express = require('express')
const CreateCategory = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter('/',CreateCategory);

module.exports = categoryRouter;