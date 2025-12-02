// // backend/seed.js

// require('dotenv').config({ path: './.env' }); // Load .env file
// const mongoose = require('mongoose');
// const Product = require('./models/ProductModel'); // Ensure this path is correct

// // --- 1. Connect to MongoDB ---
// const connectDB = async () => {
//   try {
//     // You should have MONGO_URI defined in your .env file
//     const conn = await mongoose.connect(process.env.MONGO_URI); 
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1);
//   }
// };

// // --- 2. Product Data ---
// const productsData = [
//     {
//         name: 'iPhone 17 Pro',
//         slug: 'iphone-17-pro',
//         mrp: 134900,
//         price: 127400,
//         variants: [
//             { color: 'Orange', storage: '256GB', image_url: '/img/iphone_orange.png' },
//             { color: 'Blue', storage: '512GB', image_url: '/img/iphone_blue.png' },
//             { color: 'Black', storage: '256GB', image_url: '/img/iphone_black.png' },
//         ],
//         emi_plans: [
//             // 0% interest plans
//             { monthly_payment: 44967, tenure_months: 3, interest_rate: 0.0, cashback: 7500 },
//             { monthly_payment: 22483, tenure_months: 6, interest_rate: 0.0, cashback: 7500 },
//             { monthly_payment: 11242, tenure_months: 12, interest_rate: 0.0, cashback: 7500 },
//             { monthly_payment: 5621, tenure_months: 24, interest_rate: 0.0, cashback: 7500 },
//             // 10.5% interest plans
//             { monthly_payment: 4297, tenure_months: 36, interest_rate: 10.5, cashback: 7500 },
//             { monthly_payment: 3385, tenure_months: 48, interest_rate: 10.5, cashback: 7500 },
//             { monthly_payment: 2842, tenure_months: 60, interest_rate: 10.5, cashback: 7500 },
//         ],
//     },
//     {
//         name: 'Samsung Galaxy S25 Ultra',
//         slug: 'samsung-s25-ultra',
//         mrp: 119999,
//         price: 114999,
//         variants: [
//             { color: 'Phantom Black', storage: '512GB', image_url: '/img/samsung_black.png' },
//             { color: 'Cream White', storage: '512GB', image_url: '/img/samsung_white.png' },
//         ],
//         emi_plans: [
//             // 0% interest plans
//             { monthly_payment: 19167, tenure_months: 6, interest_rate: 0.0, cashback: 8000 },
//             { monthly_payment: 9583, tenure_months: 12, interest_rate: 0.0, cashback: 8000 },
//             // Paid interest plans
//             { monthly_payment: 5105, tenure_months: 24, interest_rate: 8.5, cashback: 4000 },
//             { monthly_payment: 3450, tenure_months: 36, interest_rate: 9.0, cashback: 4000 },
//             { monthly_payment: 2950, tenure_months: 48, interest_rate: 9.0, cashback: 4000 },
//         ],
//     },
//     {
//         name: 'Google Pixel 9',
//         slug: 'google-pixel-9',
//         mrp: 74999,
//         price: 69999,
//         variants: [
//             { color: 'Obsidian', storage: '128GB', image_url: '/img/pixel_obsidian.png' },
//             { color: 'Mint Green', storage: '256GB', image_url: '/img/pixel_mint.png' },
//         ],
//         emi_plans: [
//             // 0% interest plans
//             { monthly_payment: 23333, tenure_months: 3, interest_rate: 0.0, cashback: 5000 },
//             { monthly_payment: 11667, tenure_months: 6, interest_rate: 0.0, cashback: 5000 },
//             // Paid interest plans
//             { monthly_payment: 6220, tenure_months: 12, interest_rate: 9.5, cashback: 2500 },
//             { monthly_payment: 3450, tenure_months: 24, interest_rate: 10.0, cashback: 2500 },
//             { monthly_payment: 2450, tenure_months: 36, interest_rate: 10.0, cashback: 2500 },
//         ],
//     },
// ];

// // --- 3. Import Logic ---
// const importData = async () => {
//     try {
//         await connectDB();

//         console.log('Clearing existing data...');
//         await Product.deleteMany();

//         console.log('Inserting new seed data...');
//         await Product.insertMany(productsData);

//         console.log('Data Imported Successfully!');
//         process.exit();
//     } catch (error) {
//         console.error(`Error during data import: ${error}`);
//         process.exit(1);
//     }
// };

// importData();



// backend/seed.js

require('dotenv').config({ path: './.env' }); // Load .env file
const mongoose = require('mongoose');
const Product = require('./models/ProductModel'); // Ensure this path is correct

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
        // 🔥 mrp and price REMOVED from top level
        variants: [
            { color: 'Orange', storage: '256GB', image_url: '/img/iphone_orange.png', mrp: 134900, price: 127400 }, // Price for 256GB
            { color: 'Blue', storage: '512GB', image_url: '/img/iphone_blue.png', mrp: 144900, price: 137400 }, // Higher Price for 512GB
            { color: 'Black', storage: '256GB', image_url: '/img/iphone_black.png', mrp: 134900, price: 127400 }, 
        ],
        emi_plans: [
            // 🔥 monthly_payment REMOVED from all plans
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
        // 🔥 mrp and price REMOVED from top level
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
        // 🔥 mrp and price REMOVED from top level
        variants: [
            { color: 'Obsidian', storage: '128GB', image_url: '/img/pixel_obsidian.png', mrp: 74999, price: 69999 },
            { color: 'Mint Green', storage: '256GB', image_url: '/img/pixel_mint.png', mrp: 84999, price: 79999 }, // Higher Price for 256GB
        ],
        emi_plans: [
            { tenure_months: 3, interest_rate: 0.0, cashback: 5000 },
            { tenure_months: 6, interest_rate: 0.0, cashback: 5000 },
            { tenure_months: 12, interest_rate: 9.5, cashback: 2500 },
            { tenure_months: 24, interest_rate: 10.0, cashback: 2500 },
{ tenure_months: 36, interest_rate: 10.0, cashback: 2500 },
        ],
    },
];

// --- 3. Import Logic (No changes here) ---
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