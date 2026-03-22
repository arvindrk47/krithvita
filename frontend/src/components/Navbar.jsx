import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaHeart } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [navigate]);

    const handleSearch = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setSearchOpen(false);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white/80 backdrop-blur-sm py-3'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
                        Eshwar<span className="text-secondary">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                        <Link to="/" className="text-gray-700 hover:text-primary font-bold transition duration-200 text-sm">Home</Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary font-bold transition duration-200 text-sm">Shop</Link>
                        <Link to="/about" className="text-gray-700 hover:text-primary font-bold transition duration-200 text-sm">Our Story</Link>
                    </div>

                    {/* Desktop Right Icons */}
                    <div className="hidden md:flex items-center space-x-5">
                        {/* Search */}
                        <div className="relative">
                            <button
                                className="text-gray-600 hover:text-primary transition p-1"
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Search"
                            >
                                <FaSearch className="text-lg" />
                            </button>
                            {searchOpen && (
                                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 animate-fade-in">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full px-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearch}
                                        autoFocus
                                    />
                                    <p className="text-xs text-gray-400 mt-2 pl-1">Press Enter to search</p>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="text-gray-700 hover:text-primary relative transition duration-200" aria-label="Cart">
                            <FaShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User */}
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-gray-700 hover:text-primary font-bold transition duration-200 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <FaUser size={10} />
                                    </div>
                                    <span className="text-sm max-w-[80px] truncate">{user.username}</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible z-10 overflow-hidden transition-all duration-200 transform origin-top-right">
                                    <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">Signed in as</p>
                                        <p className="font-bold text-gray-800 truncate text-sm">{user.email || user.username}</p>
                                    </div>
                                    <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-200">
                                        <FaShoppingCart size={12} className="text-gray-400" /> My Orders
                                    </Link>
                                    <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-200">
                                        <FaHeart size={12} className="text-gray-400" /> Wishlist
                                    </Link>
                                    <div className="border-t border-gray-100">
                                        <button onClick={logout} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition duration-200 font-bold">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-primary text-white px-5 py-2 rounded-full hover:bg-secondary transition-all duration-300 shadow-md shadow-primary/20 font-bold text-sm transform hover:-translate-y-0.5"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Right Side */}
                    <div className="md:hidden flex items-center gap-3">
                        <Link to="/cart" className="text-gray-700 hover:text-primary relative transition" aria-label="Cart">
                            <FaShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-primary focus:outline-none p-1"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-2xl top-full overflow-y-auto max-h-[85vh]">
                    {/* Mobile Search */}
                    <div className="px-6 pt-5 pb-3">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col px-6 pb-8 space-y-1">
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/products', label: 'Shop' },
                            { to: '/about', label: 'Our Story' },
                            { to: '/cart', label: `Cart ${cartCount > 0 ? `(${cartCount})` : ''}` },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-lg font-bold text-gray-800 hover:text-primary py-3 border-b border-gray-50 transition"
                            >
                                {label}
                            </Link>
                        ))}

                        {user ? (
                            <>
                                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-gray-800 hover:text-primary py-3 border-b border-gray-50 transition">My Orders</Link>
                                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-gray-800 hover:text-primary py-3 border-b border-gray-50 transition">Wishlist</Link>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="text-lg font-bold text-red-500 hover:text-red-600 py-3 text-left transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-4 bg-primary text-white text-center text-lg font-bold px-8 py-4 rounded-full shadow-lg"
                            >
                                Login / Register
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
