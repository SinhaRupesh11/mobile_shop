// backend/controllers/ProductController.js
const Product = require('../models/ProductModel');

// Get product details by slug
const getProductBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        // Find one product and include all embedded EMI plans and variants
        const product = await Product.findOne({ slug });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Returns product name, price, variants, and emi_plans dynamically 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Fetch a minimal set of data for the product list/card
        const products = await Product.find().select('name slug variants.storage variants.price variants.mrp variants.image_url');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProductBySlug ,getAllProducts };