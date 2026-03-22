import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('auth/me/');
                    setUser(response.data);
                } catch {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (username, password) => {
        const response = await api.post('auth/login/', { username, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const register = async (userData) => {
        await api.post('auth/register/', userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        api.post('auth/logout/');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
