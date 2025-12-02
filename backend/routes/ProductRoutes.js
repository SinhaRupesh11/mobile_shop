
const express = require('express');
const { getProductBySlug, getAllProducts } = require('../controllers/ProductController');

const router = express.Router();
router.get('/', getAllProducts);

// Unique URL for each product
router.get('/:slug', getProductBySlug); 

module.exports = router;