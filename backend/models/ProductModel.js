
const mongoose = require('mongoose');

const EmiPlanSchema = new mongoose.Schema({
    // monthly_payment 
    tenure_months: { type: Number, required: true }, // Tenure 
    interest_rate: { type: Number, required: true }, // Interest rate (e.g., 0% or 10.5%) 
    cashback: { type: Number, required: true } // Cashback information 
}, { _id: false });

const VariantSchema = new mongoose.Schema({
    color: { type: String, required: true },
    storage: { type: String, required: true },
    image_url: { type: String, required: true },
    // Price and MRP are now variant-specific
    mrp: { type: Number, required: true }, // MRP
    price: { type: Number, required: true } // Price 
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Product name 
    slug: { type: String, required: true, unique: true }, // For the URL 
    // mrp and price
    variants: [VariantSchema], // Product variants
    emi_plans: [EmiPlanSchema] // EMI plans list 
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;