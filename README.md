# 📱 Dynamic EMI Product Page  
A full-stack web application built as part of an **SDE Internship Assignment**.  
The app displays smartphone product details, variants, prices, and dynamic EMI plans — all fetched from a database with **no hardcoded values**.

---

## 🚀 Features
- Dynamic product details and variants  
- Variant-specific pricing updates  
- EMI plans with dynamic interest & cashback calculations  
- Fully database-driven (no hardcoded data)  
- REST APIs using Express.js  
- Clean UI using React + Tailwind CSS  

---

## 🧰 Tech Stack

| Layer       | Technology           | Why Used? |
|-------------|-----------------------|-----------|
| **Frontend** | React, Tailwind CSS   | Component reusability + fast styling |
| **Backend**  | Node.js, Express.js   | Easy API development |
| **Database** | MongoDB (Mongoose)    | Flexible, schema-friendly for nested product data |

---

## ⚙️ Project Setup

### **1️⃣ Backend Setup**
```bash
cd backend
npm install
Create a .env file:

ini
Copy code
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
Seed initial data:

bash
Copy code
node seed.js
Start server:

bash
Copy code
npm run dev
API runs at: http://localhost:5000

2️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Frontend typically runs at:
👉 http://localhost:5173/ (may vary)

🛠️ API Endpoints
GET /api/products
Returns all products.

GET /api/products/:slug
Returns a single product with variants and EMI plans.

Example Response:
json
Copy code
{
  "_id": "65b93d...",
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "variants": [
    {
      "color": "Orange",
      "storage": "256GB",
      "image_url": "/img/iphone_orange.png",
      "mrp": 134900,
      "price": 127400
    },
    {
      "color": "Blue",
      "storage": "512GB",
      "image_url": "/img/iphone_blue.png",
      "mrp": 144900,
      "price": 137400
    }
  ],
  "emi_plans": [
    {
      "tenure_months": 3,
      "interest_rate": 0,
      "cashback": 7500
    },
    {
      "tenure_months": 36,
      "interest_rate": 10.5,
      "cashback": 7500
    }
  ]
}
🗄️ Database Schema (Mongoose)
Product Schema
js
Copy code
const ProductSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  variants: [VariantSchema],
  emi_plans: [EmiPlanSchema]
});
Variant Schema
js
Copy code
const VariantSchema = new mongoose.Schema({
  color: String,
  storage: String,
  image_url: String,
  mrp: Number,
  price: Number
});
EMI Plan Schema
js
Copy code
const EmiPlanSchema = new mongoose.Schema({
  tenure_months: Number,
  interest_rate: Number,
  cashback: Number
});
🔗 Live Demo
👉 [Insert your Vercel / Render link here]

📌 Notes
EMI monthly payment is calculated on the frontend.

All product + variant + EMI info is fetched dynamically via APIs.

No hardcoded UI data.

🧑‍💻 Author
Rupesh Kumar Sinha
Full-Stack Developer | MERN Stack | React | Express | MongoDB