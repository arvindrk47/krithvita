import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false); // Close mobile menu if open
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl font-extrabold text-primary tracking-tight">
                        Eshwar<span className="text-secondary">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 bg-white/50 px-6 py-2 rounded-full backdrop-blur-sm">
                        <Link to="/" className="text-gray-700 hover:text-primary font-bold transition duration-300">Home</Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary font-bold transition duration-300">Shop</Link>
                        <Link to="/about" className="text-gray-700 hover:text-primary font-bold transition duration-300">Our Story</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <div className="relative group">
                            <button className="text-gray-600 hover:text-primary transition" onClick={handleSearch}>
                                <FaSearch className="text-xl" />
                            </button>
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-2 hidden group-hover:block px-4 py-2 transform origin-top-right transition-all">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                            </div>
                        </div>

                        <Link to="/cart" className="text-gray-700 hover:text-primary relative transition duration-300">
                            <FaShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center text-gray-700 hover:text-primary font-bold transition duration-300">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary">
                                        <FaUser />
                                    </div>
                                    {user.username}
                                </button>
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl hidden group-hover:block z-10 overflow-hidden transform origin-top-right">
                                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                                        <p className="text-sm text-gray-500">Signed in as</p>
                                        <p className="font-bold text-gray-800 truncate">{user.email || user.username}</p>
                                    </div>
                                    <Link to="/orders" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-200">My Orders</Link>
                                    <Link to="/wishlist" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-200">Wishlist</Link>
                                    <button onClick={logout} className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition duration-200 font-bold">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/30 font-bold transform hover:-translate-y-0.5">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-primary focus:outline-none p-2">
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t absolute w-full left-0 shadow-2xl h-screen top-full">
                    <div className="flex flex-col p-8 space-y-6 text-center">
                        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="text-2xl font-bold text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <Link to="/cart" className="text-2xl font-bold text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Cart</Link>
                        {user ? (
                            <>
                                <Link to="/orders" className="text-2xl font-bold text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-2xl font-bold text-red-500 hover:text-red-600">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="bg-primary text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg" onClick={() => setIsMenuOpen(false)}>Login/Register</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
