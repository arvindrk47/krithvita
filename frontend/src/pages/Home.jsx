import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import api, { getImageUrl } from '../api';
import ProductCard from '../components/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaLeaf, FaBaby, FaStar } from 'react-icons/fa';

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
        fade: false,
        cssEase: 'ease-in-out',
        arrows: false // Cleaner look
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[600px] overflow-hidden rounded-3xl shadow-2xl mx-auto transform hover:scale-[1.01] transition duration-500">
                {banners.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {banners.map(banner => (
                            <div key={banner.id} className="relative h-[600px] outline-none">
                                <img
                                    src={getImageUrl(banner.image)}
                                    alt={banner.title}
                                    className="w-full h-full object-cover block" // Added block
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center">
                                    <div className="container mx-auto px-12 md:px-24">
                                        <div className="max-w-xl text-white space-y-6">
                                            <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg animate-fade-in-up">
                                                {banner.title}
                                            </h1>
                                            {banner.link && (
                                                <a href={banner.link} className="inline-block bg-primary text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:bg-secondary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                                    Shop Now
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                        <p className="text-gray-400">No banners available</p>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { icon: <FaLeaf className="text-5xl text-secondary" />, title: "100% Natural", desc: "No artificial nasties, just pure goodness." },
                        { icon: <FaBaby className="text-5xl text-primary" />, title: "Mom Approved", desc: "Tried, tested, and loved by mothers." },
                        { icon: <FaStar className="text-5xl text-accent" />, title: "Premium Quality", desc: "Finest ingredients for your little one." }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-primary">
                            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bestsellers Section */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Bestsellers</h2>
                        <div className="h-1.5 w-24 bg-primary rounded-full"></div>
                    </div>
                    <a href="/products" className="group flex items-center text-primary font-bold text-lg hover:text-secondary transition-colors">
                        View All <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-16 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-6">Join the Family</h2>
                        <p className="text-gray-300 text-lg mb-8">Get access to exclusive healthy recipes, parenting tips, and special offers delivered to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/50 text-lg"
                            />
                            <button className="bg-primary hover:bg-secondary text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg text-lg">
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
