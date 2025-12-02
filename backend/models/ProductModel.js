// // backend/models/ProductModel.js
// const mongoose = require('mongoose');

// const EmiPlanSchema = new mongoose.Schema({
//     monthly_payment: { type: Number, required: true },
//     tenure_months: { type: Number, required: true },
//     interest_rate: { type: Number, required: true },
//     cashback: { type: Number, required: true }
// }, { _id: false });

// const VariantSchema = new mongoose.Schema({
//     color: { type: String, required: true },
//     storage: { type: String, required: true },
//     image_url: { type: String, required: true }
// }, { _id: false });

// const ProductSchema = new mongoose.Schema({
//     name: { type: String, required: true }, // e.g., iPhone 17 Pro [cite: 7]
//     slug: { type: String, required: true, unique: true }, // For the URL [cite: 39]
//     mrp: { type: Number, required: true }, // MRP [cite: 34]
//     price: { type: Number, required: true }, // Price [cite: 34]
//     variants: [VariantSchema], // Variants 
//     emi_plans: [EmiPlanSchema] // EMI plans [cite: 35]
// });

// const Product = mongoose.model('Product', ProductSchema);
// module.exports = Product;


// backend/models/ProductModel.js
const mongoose = require('mongoose');

const EmiPlanSchema = new mongoose.Schema({
    // monthly_payment removed (it will be calculated dynamically on the frontend)
    tenure_months: { type: Number, required: true }, // Tenure (in months) [cite: 35]
    interest_rate: { type: Number, required: true }, // Interest rate (e.g., 0% or 10.5%) [cite: 36]
    cashback: { type: Number, required: true } // Cashback information [cite: 36]
}, { _id: false });

const VariantSchema = new mongoose.Schema({
    color: { type: String, required: true },
    storage: { type: String, required: true },
    image_url: { type: String, required: true },
    // Price and MRP are now variant-specific
    mrp: { type: Number, required: true }, // MRP [cite: 34]
    price: { type: Number, required: true } // Price [cite: 34]
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Product name [cite: 34]
    slug: { type: String, required: true, unique: true }, // For the URL [cite: 39]
    // mrp and price removed from here
    variants: [VariantSchema], // Product variants [cite: 40]
    emi_plans: [EmiPlanSchema] // EMI plans list [cite: 35]
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;