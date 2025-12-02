// backend/server.js
require('dotenv').config({ path: './.env' });
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/ProductRoutes');

connectDB();

const app = express();
app.use(cors()); // Allow frontend to access the API
app.use(express.json());

// API endpoint for products [cite: 42]
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Fix Buddy API is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));