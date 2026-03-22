import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { getImageUrl } from '../api';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('orders/');
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-primary"></div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8">
                    <Link to="/" className="text-sm text-gray-500 hover:text-primary transition font-medium">← Back to Home</Link>
                    <h1 className="text-3xl font-extrabold mt-2 text-gray-900">My Orders</h1>
                    <p className="text-gray-500 text-sm mt-1">{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
                </div>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-xl text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <a href="/products" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition">Start Shopping</a>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                            {/* Order Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order Placed</p>
                                        <p className="font-medium text-gray-800">{new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Amount</p>
                                        <p className="font-bold text-primary">₹{order.total_amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order ID</p>
                                        <p className="font-medium text-gray-800">#{order.id}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <div className="space-y-6">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={getImageUrl(item.product.image)}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>

                                            <div className="flex-grow text-center sm:text-left">
                                                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.product.name}</h3>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p>Quantity: <span className="font-medium">{item.quantity}</span></p>
                                                    <p>Price: <span className="font-medium">₹{item.price}</span></p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <a href={`/products/${item.product.slug}`} className="text-primary hover:text-secondary text-sm font-semibold hover:underline">View Product</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer/Actions */}
                                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-bold text-gray-800">Shipping to:</span>
                                        <p className="mt-1 whitespace-pre-line bg-gray-50 p-3 rounded">{order.shipping_address}</p>
                                    </div>
                                    {/* Placeholder for future actions like 'Track Package' or 'Invoice' */}
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition">
                                            Need Help?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default OrderHistory;
