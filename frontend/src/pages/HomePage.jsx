
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// const API_BASE_URL = 'http://localhost:5000'; 

// const HomePage = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/api/products`);
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-4xl font-bold mb-8 text-center">FIX BUDDY Products</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                     <Link to={`/products/${product.slug}`} key={product._id} 
//                           className="block border p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300">

//                         {/* Display the Image from the first variant */}
//                         <img 
//                             src={product.variants[0]?.image_url} 
//                             alt={product.name} 
//                             className="h-64 mx-auto object-contain mb-4" 
//                         />

//                         <h2 className="text-2xl font-semibold">{product.name}</h2>
//                         <p className="text-gray-500">{product.variants[0]?.storage}</p>
//                         <p className="text-3xl font-bold mt-2">₹{product.price.toLocaleString('en-IN')}</p>

//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomePage;


// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000'; 
const API_BASE_URL = 'https://mobile-shop-api-210d.onrender.com'; 

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError('Failed to load products. Check API status and CORS settings.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-xl">Loading Products...</div>;
    }
    
    if (error) {
        return <div className="p-8 text-center text-red-500 text-xl">{error}</div>;
    }


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">FIX BUDDY Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    
                    // Access the first variant defensively
                    const firstVariant = product.variants && product.variants.length > 0
                        ? product.variants[0]
                        : null;

                    // Skip rendering if essential data is missing 
                    if (!firstVariant) return null; 

                    return (
                        <Link to={`/products/${product.slug}`} key={product._id} 
                              className="block border p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300">

                            {/* Display the Image from the first variant */}
                            <img 
                                src={firstVariant.image_url} 
                                alt={product.name} 
                                className="h-64 mx-auto object-contain mb-4" 
                            />

                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className="text-gray-500">{firstVariant.storage}</p>
                            
                            {/*  Accesses price from firstVariant */}
                            <p className="text-3xl font-bold mt-2">
                                {/* Use optional chaining on price and fallback to ensure toLocaleString is never undefined */}
                                ₹{firstVariant.price?.toLocaleString('en-IN') || '0'}
                            </p>

                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;