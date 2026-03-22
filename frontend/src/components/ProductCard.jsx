import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa';
import api, { getImageUrl } from '../api';
import { toast } from 'react-toastify';
import ProductQuickView from './ProductQuickView';
import CartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
    const [showQuickView, setShowQuickView] = useState(false);
    const { fetchCart } = useContext(CartContext);

    const addToCart = async (e) => {
        e.preventDefault();
        try {
            await api.post('cart/add/', { product_id: product.id, quantity: 1 });
            toast.success('Added to cart!');
            fetchCart();
        } catch {
            toast.error('Please login to add to cart.');
        }
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        setShowQuickView(true);
    };

    const isOutOfStock = product.stock === 0;

    return (
        <>
            <div className={`group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 relative flex flex-col ${isOutOfStock ? 'opacity-80' : ''}`}>
                <Link to={`/products/${product.slug}`} className="block relative overflow-hidden aspect-square bg-gray-50">
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                    />

                    {/* Stock Badge */}
                    {isOutOfStock && (
                        <div className="absolute top-3 left-3 bg-gray-800/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Out of Stock
                        </div>
                    )}

                    {/* Overlay Buttons */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                            onClick={addToCart}
                            disabled={isOutOfStock}
                            className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Add to Cart"
                        >
                            <FaShoppingCart size={16} />
                        </button>
                        <button
                            onClick={handleQuickView}
                            className="bg-white text-gray-700 p-3 rounded-full hover:bg-gray-800 hover:text-white transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg"
                            title="Quick View"
                        >
                            <FaEye size={16} />
                        </button>
                    </div>
                </Link>

                <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{product.category?.name || "Healthy Choice"}</p>
                    <Link to={`/products/${product.slug}`} className="flex-grow">
                        <h3 className="text-sm font-bold text-gray-800 hover:text-primary mb-2 line-clamp-2 transition-colors leading-snug">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                        <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
                        <button
                            onClick={addToCart}
                            disabled={isOutOfStock}
                            className="bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                        >
                            <FaShoppingCart size={10} />
                            {isOutOfStock ? 'Sold Out' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>

            {showQuickView && (
                <ProductQuickView product={product} onClose={() => setShowQuickView(false)} />
            )}
        </>
    );
};

export default ProductCard;
