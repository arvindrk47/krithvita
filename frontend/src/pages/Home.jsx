import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import api, { getImageUrl } from '../api';
import ProductCard from '../components/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaLeaf, FaBaby, FaStar, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bannersRes, productsRes] = await Promise.all([
                    api.get('banners/'),
                    api.get('products/')
                ]);
                setBanners(bannersRes.data);
                setProducts(productsRes.data.results || productsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'ease-in-out',
        arrows: false,
        dotsClass: 'slick-dots !bottom-6',
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Loading...</p>
            </div>
        </div>
    );

    return (
        <div className="pb-20">
            {/* Hero Section - Full Height Banner */}
            <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
                {banners.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {banners.map(banner => (
                            <div key={banner.id} className="relative h-[70vh] md:h-[85vh] outline-none">
                                <img
                                    src={getImageUrl(banner.image)}
                                    alt={banner.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center">
                                    <div className="container mx-auto px-6 md:px-16">
                                        <div className="max-w-2xl text-white">
                                            <span className="inline-block bg-primary/90 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">New Collection</span>
                                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                                                {banner.title}
                                            </h1>
                                            <p className="text-white/80 text-base md:text-xl mb-8 max-w-lg leading-relaxed">
                                                Wholesome, delicious food crafted with love for your family's wellbeing.
                                            </p>
                                            {banner.link && (
                                                <a
                                                    href={banner.link}
                                                    className="inline-flex items-center gap-2 bg-white text-primary text-sm md:text-lg font-bold px-8 py-3.5 rounded-full shadow-2xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    Shop Now <FaArrowRight className="text-sm" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <div className="text-center">
                            <FaLeaf className="text-6xl text-primary mx-auto mb-4" />
                            <p className="text-gray-500 text-xl font-medium">Welcome to Eshwar</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Trust Badges */}
            <div className="bg-white border-y border-gray-100 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center md:justify-around gap-4 text-sm text-gray-600 font-medium">
                        {[
                            { icon: <FaTruck className="text-primary" />, text: "Free Shipping on all orders" },
                            { icon: <FaShieldAlt className="text-secondary" />, text: "100% Natural Ingredients" },
                            { icon: <FaStar className="text-yellow-400" />, text: "Trusted by 10,000+ families" },
                            { icon: <FaLeaf className="text-green-500" />, text: "No Artificial Preservatives" },
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center gap-2">
                                {badge.icon}
                                <span>{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Why Choose Eshwar?</h2>
                    <div className="h-1 w-16 bg-primary rounded-full mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {[
                        { icon: <FaLeaf className="text-5xl text-secondary" />, title: "100% Natural", desc: "No artificial nasties, just pure goodness in every bite." },
                        { icon: <FaBaby className="text-5xl text-primary" />, title: "Mom Approved", desc: "Tried, tested and loved by thousands of mothers across India." },
                        { icon: <FaStar className="text-5xl text-yellow-400" />, title: "Premium Quality", desc: "We source the finest ingredients to keep your family healthy." }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                            <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-extrabold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bestsellers Section */}
            <div className="container mx-auto px-4 pb-16 md:pb-24">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <div>
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Customer Favorites</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Our Bestsellers</h2>
                        <div className="h-1 w-16 bg-primary rounded-full mt-3"></div>
                    </div>
                    <Link to="/products" className="group flex items-center text-primary font-bold text-sm md:text-lg hover:text-secondary transition-colors">
                        View All <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform text-sm" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="container mx-auto px-4 pb-8">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/30 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="inline-block bg-primary/20 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">Stay Updated</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Join the Family</h2>
                        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                            Get exclusive healthy recipes, parenting tips, and special offers delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow px-5 py-3.5 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/50 text-sm shadow-lg"
                            />
                            <button className="bg-primary hover:bg-secondary text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg text-sm flex-shrink-0 transform hover:-translate-y-0.5">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
