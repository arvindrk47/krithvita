import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import api, { getImageUrl } from '../api';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaHeart, FaStar, FaMinus, FaPlus, FaTruck, FaShieldAlt } from 'react-icons/fa';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [userRating, setUserRating] = useState(5);
    const [userComment, setUserComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const [averageRating, setAverageRating] = useState(0);

    const { fetchCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`products/${slug}/`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    useEffect(() => {
        if (product) {
            const fetchReviews = async () => {
                try {
                    const res = await api.get(`reviews/product/${product.id}/`);
                    setReviews(res.data);
                    if (res.data.length > 0) {
                        const total = res.data.reduce((acc, curr) => acc + curr.rating, 0);
                        setAverageRating(total / res.data.length);
                    } else {
                        setAverageRating(0);
                    }
                } catch {
                    console.error("Failed to fetch reviews");
                }
            };
            fetchReviews();
        }
    }, [product]);

    const addToCart = async () => {
        if (quantity > product.stock) {
            toast.error(`Only ${product.stock} items available in stock`);
            return;
        }
        try {
            await api.post('cart/add/', { product_id: product.id, quantity });
            toast.success('Added to cart!');
            fetchCart();
        } catch {
            toast.error('Please login to use wishlist.');
        }
    };

    const addToWishlist = async () => {
        try {
            await api.post(`wishlist/manage/${product.id}/`);
            toast.success('Added to wishlist!');
        } catch (error) {
            console.error("Wishlist error:", error);
            if (error.response && error.response.status === 401) {
                toast.error('Please login to use wishlist.');
            } else {
                toast.error('Failed to add to wishlist.');
            }
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        setReviewLoading(true);
        try {
            await api.post('reviews/add/', {
                product: product.id,
                rating: userRating,
                comment: userComment
            });
            toast.success('Review submitted!');
            setUserComment('');
            const res = await api.get(`reviews/product/${product.id}/`);
            setReviews(res.data);
            if (res.data.length > 0) {
                const total = res.data.reduce((acc, curr) => acc + curr.rating, 0);
                setAverageRating(total / res.data.length);
            }
        } catch {
            toast.error('Failed to submit review. Login required.');
        } finally {
            setReviewLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!product) return <div className="text-center py-20 text-gray-500">Product not found</div>;

    const discount = 0;

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-8">
                <Link to="/" className="hover:text-primary">Home</Link> /
                <Link to="/products" className="hover:text-primary mx-2">Shop</Link> /
                <span className="text-gray-800 font-semibold mx-2">{product.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Product Image */}
                <div className="lg:w-1/2">
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 relative group">
                        <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {discount > 0 && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                -{discount}%
                            </span>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2 space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>

                    <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400 text-lg">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">({reviews.length} Reviews)</span>
                    </div>

                    <div className="flex items-end space-x-4">
                        <span className="text-4xl font-extrabold text-primary">₹{product.price}</span>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    <div className="border-t border-b border-gray-100 py-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="font-bold text-gray-800">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
                                <button
                                    className="text-gray-500 hover:text-primary focus:outline-none"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <FaMinus size={12} />
                                </button>
                                <span className="mx-4 font-bold w-4 text-center">{quantity}</span>
                                <button
                                    className="text-gray-500 hover:text-primary focus:outline-none disabled:opacity-50"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                >
                                    <FaPlus size={12} />
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">{product.stock} items in stock</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={addToCart}
                                className="flex-1 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-all shadow-lg shadow-primary/30 flex items-center justify-center transform hover:-translate-y-1"
                            >
                                <FaShoppingCart className="mr-2" /> Add to Cart
                            </button>
                            <button
                                onClick={addToWishlist}
                                className="bg-white border-2 border-gray-200 text-gray-600 px-6 py-4 rounded-full hover:border-primary hover:text-primary transition-all font-bold flex items-center justify-center transform hover:-translate-y-1"
                            >
                                <FaHeart size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center space-x-3 text-gray-600">
                                <FaTruck className="text-2xl text-secondary" />
                                <span className="text-sm font-medium">Free Shipping on orders over ₹500</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600">
                                <FaShieldAlt className="text-2xl text-secondary" />
                                <span className="text-sm font-medium">100% Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-20">
                <div className="flex justify-center space-x-8 md:space-x-12 border-b border-gray-200 pb-4 mb-8">
                    {['description', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            className={`text-xl font-bold capitalize pb-4 relative ${activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t"></span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto">
                    {activeTab === 'description' && (
                        <div className="prose max-w-none text-gray-600 leading-relaxed">
                            <p>{product.description}</p>
                            <p className="mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="py-10">
                            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h3>
                                <form onSubmit={submitReview}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">Rating</label>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setUserRating(star)}
                                                    className={`text-2xl ${userRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    <FaStar />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">Review</label>
                                        <textarea
                                            value={userComment}
                                            onChange={(e) => setUserComment(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={reviewLoading}
                                        className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50"
                                    >
                                        {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            </div>

                            <div className="space-y-6">
                                {reviews.length === 0 ? (
                                    <p className="text-gray-500 text-center">No reviews yet. Be the first to review this product!</p>
                                ) : (
                                    reviews.map(review => (
                                        <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex text-yellow-400 text-sm">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                                        ))}
                                                    </div>
                                                    <span className="font-bold text-gray-800">{review.user}</span>
                                                </div>
                                                <span className="text-gray-400 text-sm">{new Date(review.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
