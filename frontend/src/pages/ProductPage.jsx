// // frontend/src/pages/ProductPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// // IMPORTANT: Ensure this matches your running backend port
// const API_BASE_URL = 'http://localhost:5000'; 

// const ProductPage = () => {
//     const { slug } = useParams(); 
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     // State to manage which variant (color/storage) is selected
//     const [selectedVariant, setSelectedVariant] = useState(null);
    
//     // State to manage which EMI plan is selected
//     const [selectedEmiPlan, setSelectedEmiPlan] = useState(null); 

//     // Helper function for formatting currency
//     const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;


//     useEffect(() => {
//         const fetchProduct = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/api/products/${slug}`);
//                 const data = response.data;
//                 setProduct(data);
                
//                 // --- Initial State Setup ---
//                 // Set the initial variant to the first one available
//                 if (data.variants && data.variants.length > 0) {
//                     setSelectedVariant(data.variants[0]);
//                 }
                
//                 setError(null);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to load product data. Check backend connection and slug.');
//                 setProduct(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (slug) {
//             fetchProduct();
//         }
//     }, [slug]);

//     if (loading) {
//         return <div className="p-8 text-center text-xl">Loading Product Details...</div>;
//     }
    
//     if (error) {
//         return <div className="p-8 text-center text-red-500 text-xl">{error}</div>;
//     }

//     if (!product || !selectedVariant) {
//         return <div className="p-8 text-center text-xl">Product data not complete.</div>;
//     }

//     // --- Success State: RENDER THE PRODUCT PAGE ---
//     return (
//         <div className="container mx-auto p-4">
//             <div className="md:flex md:space-x-8">
                
//                 {/* 1. PRODUCT IMAGE (LEFT COLUMN) */}
//                 <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-50 rounded-lg">
//                     <img 
//                         src={selectedVariant.image_url} 
//                         alt={`${product.name} - ${selectedVariant.color}`} 
//                         className="max-h-96 w-auto object-contain"
//                     />
//                 </div>

//                 {/* 2. PRODUCT DETAILS & EMI PLANS (RIGHT COLUMN) */}
//                 <div className="md:w-1/2 mt-6 md:mt-0">
//                     <h1 className="text-4xl font-extrabold">{product.name}</h1>
//                     <p className="text-xl text-gray-700 mt-1 mb-4">
//                         {selectedVariant.storage} | {selectedVariant.color}
//                     </p>
                    
//                     {/* Price and MRP */}
//                     <div className="flex items-baseline mb-6">
//                         <span className="text-4xl font-extrabold mr-3">
//                             {formatCurrency(product.price)}
//                         </span>
//                         <span className="text-lg text-gray-400 line-through">
//                             {formatCurrency(product.mrp)}
//                         </span>
//                     </div>

//                     <p className="text-lg font-semibold mb-3">Available in {product.variants.length} finishes</p>

//                     {/* 🚀 VARIANT SELECTOR IMPLEMENTATION */}
//                     <div className="flex space-x-3 mb-8">
//                         {product.variants.map((variant, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setSelectedVariant(variant)} // Updates the selected variant state
//                                 className={`
//                                     p-2 border-2 rounded-lg text-sm transition duration-150 ease-in-out
//                                     ${selectedVariant.color === variant.color 
//                                         ? 'border-blue-600 bg-blue-50 font-semibold shadow-md' // Active
//                                         : 'border-gray-300 hover:border-gray-500' // Inactive
//                                     }
//                                 `}
//                             >
//                                 {variant.color} / {variant.storage}
//                             </button>
//                         ))}
//                     </div>

//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//                         EMI plans backed by mutual funds
//                     </h2>

//                     {/* 🚀 EMI PLAN LIST IMPLEMENTATION */}
//                     <div className="space-y-3">
//                         {product.emi_plans.map((plan, index) => (
//                             <div
//                                 key={index}
//                                 onClick={() => setSelectedEmiPlan(plan)} // Updates the selected plan state
//                                 className={`
//                                     p-4 rounded-xl cursor-pointer transition duration-150 ease-in-out
//                                     ${selectedEmiPlan && selectedEmiPlan.tenure_months === plan.tenure_months
//                                         ? 'border-2 border-green-600 bg-green-50 shadow-lg' // Active
//                                         : 'border border-gray-200 hover:border-gray-400 bg-white' // Inactive
//                                     }
//                                 `}
//                             >
//                                 <div className="flex justify-between items-center">
//                                     {/* Monthly Payment and Tenure */}
//                                     <p className="text-xl font-bold">
//                                         {formatCurrency(plan.monthly_payment)} x {plan.tenure_months} months
//                                     </p>
                                    
//                                     {/* Interest Rate */}
//                                     <p className={`font-semibold ${plan.interest_rate === 0.0 ? 'text-red-500' : 'text-gray-600'}`}>
//                                         {plan.interest_rate === 0.0 ? '0% interest' : `${plan.interest_rate}% interest`}
//                                     </p>
//                                 </div>
                                
//                                 {/* Cashback Information */}
//                                 <p className="text-sm text-gray-500 mt-1">
//                                     Additional cashback of {formatCurrency(plan.cashback)}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* 🚀 ACTION BUTTON IMPLEMENTATION */}
//                     <button 
//                         className="w-full mt-8 p-4 text-white bg-green-600 rounded-lg text-lg font-bold disabled:bg-gray-400"
//                         disabled={!selectedEmiPlan} // Disabled if selectedEmiPlan is null
//                     >
//                         Proceed with Selected Plan ({selectedEmiPlan ? selectedEmiPlan.tenure_months : 0} months)
//                     </button>
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductPage;




// frontend/src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


// const API_BASE_URL = 'http://localhost:5000'; 
const API_BASE_URL = 'https://mobile-shop-api-210d.onrender.com';  

const ProductPage = () => {
    const { slug } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedEmiPlan, setSelectedEmiPlan] = useState(null); 

    // Helper function for formatting currency
    const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

    // 🔥 DYNAMIC EMI CALCULATION FUNCTION
    const calculateMonthlyPayment = (price, interestRate, tenureMonths) => {
        price = parseFloat(price);
        interestRate = parseFloat(interestRate);
        tenureMonths = parseInt(tenureMonths);

        if (interestRate === 0.0) {
            return Math.round(price / tenureMonths);
        }
        
        const monthlyRate = interestRate / 100 / 12;
        if (monthlyRate > 0) {
            const factor = Math.pow(1 + monthlyRate, tenureMonths);
            const monthlyPayment = price * monthlyRate * factor / (factor - 1);
            return Math.round(monthlyPayment);
        }
        return Math.round(price / tenureMonths); // Fallback
    };


    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products/${slug}`);
                const data = response.data;
                setProduct(data);
                
                if (data.variants && data.variants.length > 0) {
                    setSelectedVariant(data.variants[0]);
                }
                
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to load product data. Check backend connection and slug.');
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    // Error and Loading checks... (no changes here)

    if (loading) {
        return <div className="p-8 text-center text-xl">Loading Product Details...</div>;
    }
    
    if (error) {
        return <div className="p-8 text-center text-red-500 text-xl">{error}</div>;
    }

    if (!product || !selectedVariant) {
        return <div className="p-8 text-center text-xl">Product data not complete.</div>;
    }


    return (
        <div className="container mx-auto p-4">
            <div className="md:flex md:space-x-8">
                
                {/* 1. PRODUCT IMAGE (LEFT COLUMN) */}
                <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-50 rounded-lg">
                    <img 
                        src={selectedVariant.image_url} 
                        alt={`${product.name} - ${selectedVariant.color}`} 
                        className="max-h-96 w-auto object-contain"
                    />
                </div>

                {/* 2. PRODUCT DETAILS & EMI PLANS (RIGHT COLUMN) */}
                <div className="md:w-1/2 mt-6 md:mt-0">
                    <h1 className="text-4xl font-extrabold">{product.name}</h1>
                    <p className="text-xl text-gray-700 mt-1 mb-4">
                        {selectedVariant.storage} | {selectedVariant.color}
                    </p>
                    
                    {/* Price and MRP (Source changed to selectedVariant) */}
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold mr-3">
                            {formatCurrency(selectedVariant.price)} {/* 🔥 Source changed */}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                            {formatCurrency(selectedVariant.mrp)} {/* 🔥 Source changed */}
                        </span>
                    </div>

                    <p className="text-lg font-semibold mb-3">Available in {product.variants.length} finishes</p>

                    {/* VARIANT SELECTOR IMPLEMENTATION (Code from previous step) */}
                    <div className="flex space-x-3 mb-8">
                        {product.variants.map((variant, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedVariant(variant)}
                                className={`
                                    p-2 border-2 rounded-lg text-sm transition duration-150 ease-in-out
                                    ${selectedVariant.color === variant.color 
                                        ? 'border-blue-600 bg-blue-50 font-semibold shadow-md'
                                        : 'border-gray-300 hover:border-gray-500'
                                    }
                                `}
                            >
                                {variant.color} / {variant.storage}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        EMI plans backed by mutual funds
                    </h2>

                    {/* EMI PLAN LIST IMPLEMENTATION (Now Dynamic) */}
                    <div className="space-y-3">
                        {product.emi_plans.map((plan, index) => {
                            // 🔥 Calculate payment using the currently selected variant price
                            const calculatedPayment = calculateMonthlyPayment(
                                selectedVariant.price,
                                plan.interest_rate,
                                plan.tenure_months
                            );
                            
                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedEmiPlan(plan)}
                                    className={`
                                        p-4 rounded-xl cursor-pointer transition duration-150 ease-in-out
                                        ${selectedEmiPlan && selectedEmiPlan.tenure_months === plan.tenure_months
                                            ? 'border-2 border-green-600 bg-green-50 shadow-lg'
                                            : 'border border-gray-200 hover:border-gray-400 bg-white'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-center">
                                        {/* Monthly Payment is now CALCULATED */}
                                        <p className="text-xl font-bold">
                                            {formatCurrency(calculatedPayment)} x {plan.tenure_months} months
                                        </p>
                                        
                                        {/* Interest Rate */}
                                        <p className={`font-semibold ${plan.interest_rate === 0.0 ? 'text-red-500' : 'text-gray-600'}`}>
                                            {plan.interest_rate === 0.0 ? '0% interest' : `${plan.interest_rate}% interest`}
                                        </p>
                                    </div>
                                    
                                    {/* Cashback Information */}
                                    <p className="text-sm text-gray-500 mt-1">
                                        Additional cashback of {formatCurrency(plan.cashback)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* ACTION BUTTON IMPLEMENTATION */}
                    <button 
                        className="w-full mt-8 p-4 text-white bg-green-600 rounded-lg text-lg font-bold disabled:bg-gray-400"
                        disabled={!selectedEmiPlan}
                    >
                        Proceed with Selected Plan ({selectedEmiPlan ? selectedEmiPlan.tenure_months : 0} months)
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductPage;