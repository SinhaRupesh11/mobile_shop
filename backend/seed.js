
require('dotenv').config({ path: './.env' }); // Load .env file
const mongoose = require('mongoose');
const Product = require('./models/ProductModel'); 

// --- 1. Connect to MongoDB ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// --- 2. Product Data ---
const productsData = [
    {
        name: 'iPhone 17 Pro',
        slug: 'iphone-17-pro',
        // 🔥 mrp and price 
        variants: [
            { color: 'Orange', storage: '256GB', image_url: '/img/iphone_orange.png', mrp: 134900, price: 127400 }, // Price for 256GB
            { color: 'Blue', storage: '512GB', image_url: '/img/iphone_blue.png', mrp: 144900, price: 137400 }, // Higher Price for 512GB
            { color: 'Black', storage: '256GB', image_url: '/img/iphone_black.png', mrp: 134900, price: 127400 },
        ],
        emi_plans: [
            //  monthly_payment 
            { tenure_months: 3, interest_rate: 0.0, cashback: 7500 },
            { tenure_months: 6, interest_rate: 0.0, cashback: 7500 },
            { tenure_months: 12, interest_rate: 0.0, cashback: 7500 },
            { tenure_months: 24, interest_rate: 0.0, cashback: 7500 },
            { tenure_months: 36, interest_rate: 10.5, cashback: 7500 },
            { tenure_months: 48, interest_rate: 10.5, cashback: 7500 },
            { tenure_months: 60, interest_rate: 10.5, cashback: 7500 },
        ],
    },
    {
        name: 'Samsung Galaxy S25 Ultra',
        slug: 'samsung-s25-ultra',
        // mrp and price 
        variants: [
            { color: 'Phantom Black', storage: '512GB', image_url: '/img/samsung_black.png', mrp: 119999, price: 114999 },
            { color: 'Cream White', storage: '256GB', image_url: '/img/samsung_white.png', mrp: 109999, price: 104999 }, // Lower Price for 256GB
        ],
        emi_plans: [
            { tenure_months: 6, interest_rate: 0.0, cashback: 8000 },
            { tenure_months: 12, interest_rate: 0.0, cashback: 8000 },
            { tenure_months: 24, interest_rate: 8.5, cashback: 4000 },
            { tenure_months: 36, interest_rate: 9.0, cashback: 4000 },
            { tenure_months: 48, interest_rate: 9.0, cashback: 4000 },
        ],
    },
    {
        name: 'Google Pixel 9',
        slug: 'google-pixel-9',
        //  mrp and price 
        variants: [
            { color: 'Obsidian', storage: '128GB', image_url: '/img/pixel_obsidian.png', mrp: 74999, price: 69999 },
            { color: 'Mint Green', storage: '256GB', image_url: '/img/pixel_mint.png', mrp: 84999, price: 79999 }, // Higher Price for 256GB
        ],
        emi_plans: [
            { tenure_months: 3, interest_rate: 0.0, cashback: 5000 },
            { tenure_months: 6, interest_rate: 0.0, cashback: 5000 },
            { tenure_months: 12, interest_rate: 9.5, cashback: 2500 },
            { tenure_months: 24, interest_rate: 10.0, cashback: 2500 },
            { tenure_months: 36, interest_rate: 10.0, cashback: 2500 },],
    },
];

// --- 3. Import Logic 
const importData = async () => {
    try {
        await connectDB();
        console.log('Clearing existing data...');
        await Product.deleteMany();
        console.log('Inserting new seed data...');
        await Product.insertMany(productsData);
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error during data import: ${error}`);
        process.exit(1);
    }
};

importData();