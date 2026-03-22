import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEnvelope, FaLeaf } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
        setLoading(true);
        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            toast.success('Account created! Please sign in.');
            navigate('/login');
        } catch {
            toast.error('Registration failed. Username may already be taken.');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition text-gray-800 bg-gray-50";
    const labelClass = "block text-sm font-bold text-gray-700 mb-1.5";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary/5 pt-20 pb-10 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center mb-8">
                    <span className="text-4xl font-extrabold text-primary tracking-tight">
                        Eshwar<span className="text-secondary">.</span>
                    </span>
                </Link>

                <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 p-8 md:p-10 border border-gray-100">
                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaLeaf className="text-3xl text-primary" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Create Account</h1>
                        <p className="text-gray-500 mt-1 text-sm">Join our healthy food community</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className={labelClass}>Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaUser size={14} /></div>
                                <input type="text" name="username" value={formData.username} onChange={handleChange} className={inputClass} placeholder="Choose a username" required />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaEnvelope size={14} /></div>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaLock size={14} /></div>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass} placeholder="Min. 8 characters" required />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><FaLock size={14} /></div>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={inputClass} placeholder="Repeat your password" required />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/30 disabled:opacity-60 transform hover:-translate-y-0.5 mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:text-secondary transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
