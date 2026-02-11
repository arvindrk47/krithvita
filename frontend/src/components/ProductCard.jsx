import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import api, { getImageUrl } from '../api';
import { toast } from 'react-toastify';
import ProductQuickView from './ProductQuickView';

const ProductCard = ({ product }) => {
    const [showQuickView, setShowQuickView] = useState(false);

    const addToCart = async (e) => {
        e.preventDefault(); // Prevent navigation
        try {
            await api.post('cart/add/', { product_id: product.id, quantity: 1 });
            toast.success('Added to cart!');
        } catch {
            toast.error('Please login to add to cart.');
        }
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        setShowQuickView(true);
    };

    return (
        <>
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 relative">
                <Link to={`/products/${product.slug}`} className="block relative overflow-hidden">
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay with Quick Action Buttons */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <button
                            onClick={addToCart}
                            className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                            title="Add to Cart"
                        >
                            <FaShoppingCart size={18} />
                        </button>
                        <button
                            onClick={handleQuickView}
                            className="bg-white text-gray-700 p-3 rounded-full hover:bg-gray-800 hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg"
                            title="Quick View"
                        >
                            <FaEye size={18} />
                        </button>
                    </div>
                </Link>

                <div className="p-5">
                    <Link to={`/products/${product.slug}`}>
                        <h3 className="text-lg font-bold text-gray-800 hover:text-primary mb-1 truncate transition-colors font-sans">{product.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-3">{product.category?.name || "Healthy Choice"}</p>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
                        <span className="text-2xl font-extrabold text-gray-900">₹{product.price}</span>
                        {product.stock > 0 ? (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                        ) : (
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            {showQuickView && (
                <ProductQuickView product={product} onClose={() => setShowQuickView(false)} />
            )}
        </>
    );
};

export default ProductCard;
