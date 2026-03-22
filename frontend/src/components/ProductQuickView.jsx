
import { FaTimes, FaShoppingCart, FaStar } from 'react-icons/fa';
import { getImageUrl } from '../api';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { toast } from 'react-toastify';
import api from '../api';

const ProductQuickView = ({ product, onClose }) => {
    if (!product) return null;

    const { fetchCart } = useContext(CartContext);

    const addToCart = async () => {
        try {
            await api.post('cart/add/', { product_id: product.id, quantity: 1 });
            toast.success('Added to cart!');
            fetchCart();
        } catch {
            toast.error('Please login to add to cart.');
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-scale-up">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-gray-900 shadow-sm flex items-center gap-1">
                        <FaStar className="text-gray-900" />
                        <span>4.8</span>
                    </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-secondary font-bold tracking-wider text-sm mb-2 uppercase">
                        {product.category?.name || "Healthy Choice"}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 font-serif leading-tight">
                        {product.name}
                    </h2>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                        {product.stock > 0 ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">In Stock</span>
                        ) : (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Out of Stock</span>
                        )}
                    </div>

                    <p className="text-gray-600 mb-8 text-lg leading-relaxed border-b border-gray-100 pb-8">
                        {product.description}
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={addToCart}
                            className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-secondary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                        >
                            <FaShoppingCart />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;
