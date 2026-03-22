import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getImageUrl } from '../api';
import { toast } from 'react-toastify';
import { FaTrash, FaShoppingBag, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import CartContext from '../context/CartContext';

const Cart = () => {
    const { fetchCart: refreshNavCart } = useContext(CartContext);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await api.get('cart/');
            setCart(response.data);
        } catch {
            // not logged in or error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) {
            await removeItem(itemId);
            return;
        }
        try {
            await api.put(`cart/item/${itemId}/`, { quantity: newQuantity });
            fetchCart();
            refreshNavCart();
        } catch {
            toast.error('Failed to update quantity');
        }
    };

    const removeItem = async (itemId) => {
        try {
            await api.delete(`cart/item/${itemId}/`);
            fetchCart();
            refreshNavCart();
            toast.success('Item removed from cart');
        } catch {
            toast.error('Failed to remove item');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-primary"></div>
        </div>
    );

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-10 px-4">
                <div className="text-center max-w-sm">
                    <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaShoppingBag className="text-5xl text-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything yet. Let's change that!</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/30"
                    >
                        <FaShoppingBag /> Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-primary transition">
                        <FaArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
                        <p className="text-gray-500 text-sm">{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-4">
                        {cart.items.map(item => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                {/* Image */}
                                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                    <img
                                        src={getImageUrl(item.product.image)}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/96?text=No+Image'; }}
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-grow min-w-0">
                                    <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{item.product.name}</h3>
                                    <p className="text-primary font-bold text-lg">₹{item.product.price}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50 shadow-sm">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition"
                                        >
                                            <FaMinus size={10} />
                                        </button>
                                        <span className="w-8 text-center font-bold text-gray-800 text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition"
                                        >
                                            <FaPlus size={10} />
                                        </button>
                                    </div>
                                    <p className="font-extrabold text-gray-900 w-20 text-right">₹{item.total_price}</p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                {cart.items.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                                        <span className="truncate mr-2">{item.product.name} <span className="text-gray-400">×{item.quantity}</span></span>
                                        <span className="font-medium flex-shrink-0">₹{item.total_price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-bold text-gray-800">₹{cart.total_price}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600 font-bold text-sm">FREE</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 mb-6">
                                <span className="font-extrabold text-gray-900 text-lg">Total</span>
                                <span className="font-extrabold text-primary text-2xl">₹{cart.total_price}</span>
                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full bg-primary text-white text-center font-bold py-4 rounded-full hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/30 transform hover:-translate-y-0.5"
                            >
                                Proceed to Checkout →
                            </Link>

                            <Link
                                to="/products"
                                className="block w-full text-center text-gray-500 text-sm mt-4 hover:text-primary transition font-medium"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
