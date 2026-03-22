import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Checkout = () => {
    const { cart, fetchCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !address) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        const res = await loadRazorpayScript();

        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order on Backend
            const result = await api.post('razorpay/create/');

            if (!result) {
                toast.error("Server error. Are you online?");
                setLoading(false);
                return;
            }

            const { amount, currency, key } = result.data;
            const fullName = `${firstName} ${lastName}`;
            const fullAddress = `${fullName}\n${address}`;

            const options = {
                key: key,
                amount: amount.toString(),
                currency: currency,
                name: "Eshwar",
                description: "Test Transaction",
                order_id: result.data.order_id,
                handler: async function (response) {
                    try {
                        const verifyRes = await api.post('razorpay/verify/', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            shipping_address: fullAddress
                        });

                        if (verifyRes.status === 201) {
                            toast.success('Payment Successful! Order Placed.');
                            fetchCart(); // Clear cart in context
                            navigate('/orders');
                        }
                    } catch (err) {
                        console.error(err);
                        toast.error('Payment verification failed');
                    }
                },
                prefill: {
                    name: fullName,
                    email: user?.email || 'user@example.com',
                    contact: "9999999999"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#e53935"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            toast.error('Error creating order');
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return <div className="text-center py-20 mt-20">Cart is empty</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10 mt-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-8">

                {/* Order Summary Section */}
                <div className="md:w-1/2 order-2 md:order-1">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        {cart.items.map(item => (
                            <div key={item.id} className="flex justify-between mb-3 text-sm border-b pb-2 last:border-0 last:pb-0">
                                <span>{item.product.name} <span className="text-gray-500">x {item.quantity}</span></span>
                                <span className="font-semibold">₹{item.total_price}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                            <span>Total:</span>
                            <span className="text-primary">₹{cart.total_price}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form Section */}
                <div className="md:w-1/2 order-1 md:order-2">
                    <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                    <form onSubmit={handlePayment}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2 text-sm">First Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2 text-sm">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2 text-sm">Shipping Address</label>
                            <textarea
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition"
                                rows="4"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder="Enter your full address"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition duration-300 shadow-lg disabled:opacity-50 transform hover:-translate-y-1"
                        >
                            {loading ? 'Processing...' : `Pay ₹${cart.total_price}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
