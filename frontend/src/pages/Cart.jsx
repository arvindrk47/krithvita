import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import CartContext from '../context/CartContext';
const Cart = () => {
    const { fetchCart: refreshNavCart } = useContext(CartContext);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchCart = async () => {
        try {
            const response = await api.get('cart/');
            setCart(response.data);
        } catch {
            // console.error("Failed to fetch cart", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (itemId, newQuantity) => {
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
            toast.success('Item removed');
        } catch {
            toast.error('Failed to remove item');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/products" className="text-primary hover:underline">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/4">
                    {cart.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center">
                                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded mr-4" />
                                <div>
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600">₹{item.product.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded">
                                    <button
                                        className="px-3 py-1 hover:bg-gray-100"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >-</button>
                                    <span className="px-3 py-1">{item.quantity}</span>
                                    <button
                                        className="px-3 py-1 hover:bg-gray-100"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >+</button>
                                </div>
                                <p className="font-bold">₹{item.total_price}</p>
                                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="md:w-1/4">
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>₹{cart.total_price}</span>
                        </div>
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>₹{cart.total_price}</span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="block w-full bg-primary text-white text-center py-3 rounded mt-6 hover:bg-red-600 transition-colors"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
