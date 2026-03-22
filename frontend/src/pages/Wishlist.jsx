import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { getImageUrl } from '../api';
import { toast } from 'react-toastify';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const response = await api.get('wishlist/');
            setWishlist(response.data);
        } catch {
            // console.error("Error fetching wishlist", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        try {
            await api.delete(`wishlist/manage/${productId}/`);
            toast.success('Removed from wishlist');
            fetchWishlist();
        } catch {
            toast.error('Failed to remove from wishlist');
        }
    };

    const addToCart = async (productId) => {
        try {
            await api.post('cart/add/', { product_id: productId, quantity: 1 });
            toast.success('Added to cart!');
        } catch {
            toast.error('Failed to add to cart');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Your wishlist is empty</h2>
                <p className="text-gray-600 mb-8">Save items you love to view them later.</p>
                <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">My Wishlist</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlist.products.map(product => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 relative">
                        <Link to={`/products/${product.slug}`}>
                            <img
                                src={getImageUrl(product.image)}
                                alt={product.name}
                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </Link>
                        <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md"
                            title="Remove from Wishlist"
                        >
                            <FaTrash />
                        </button>

                        <div className="p-6">
                            <Link to={`/products/${product.slug}`}>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-primary transition-colors">{product.name}</h3>
                            </Link>
                            <p className="text-2xl font-bold text-primary mb-4">₹{product.price}</p>

                            <button
                                onClick={() => addToCart(product.id)}
                                className="w-full bg-secondary text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <FaShoppingCart /> Move to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
