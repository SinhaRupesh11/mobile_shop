// backend/routes/ProductRoutes.js
const express = require('express');
const { getProductBySlug, getAllProducts } = require('../controllers/ProductController');

const router = express.Router();
router.get('/', getAllProducts);

// Unique URL for each product [cite: 39]
router.get('/:slug', getProductBySlug); 

module.exports = router;