import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';

const Footer = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('products/categories/');
                // Assuming pagination or direct list
                setCategories(response.data.results || response.data);
            } catch {
                console.error("Failed to fetch categories");
            }
        };
        fetchCategories();
    }, []);

    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold text-primary tracking-tight">
                            Eshwar<span className="text-secondary">.</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            We make honest, healthy, and yummy food for your little ones.
                            Made with love by two mothers.
                        </p>
                        <div className="flex flex-col space-y-2">
                            <Link to="/testimonials" className="text-secondary hover:text-white transition-colors font-bold">Read what parents say ➜</Link>
                        </div>
                        <div className="flex space-x-4 pt-2">
                            {[FaFacebook, FaInstagram, FaTwitter, FaPinterest].map((Icon, idx) => (
                                <a key={idx} href="#" className="bg-gray-800 p-3 rounded-full hover:bg-primary transition-colors duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-primary inline-block pb-2">Shop</h4>
                        <ul className="space-y-4 text-gray-400">
                            {categories.slice(0, 5).map(category => (
                                <li key={category.id}>
                                    <Link to={`/products?category=${category.slug}`} className="hover:text-primary transition-colors capitalize">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            <li><Link to="/products" className="text-primary hover:text-white transition-colors font-bold">View All</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-secondary inline-block pb-2">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQs</Link></li>
                            <li><Link to="/shipping-policy" className="hover:text-secondary transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-secondary transition-colors">Returns & Refunds</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-accent inline-block pb-2">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>Email: <a href="mailto:support@eshwar.com" className="hover:text-accent">support@eshwar.com</a></li>
                            <li>Phone: +91 98765 43210</li>
                            <li>Address: Bangalore, India</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Eshwar Website. All rights reserved. Made with ❤️ for You.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
