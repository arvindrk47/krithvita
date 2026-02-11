import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../api';
import AuthContext from './AuthContext';

const CartContext = createContext();

export default CartContext;

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState(null);

    const fetchCart = useCallback(async () => {
        try {
            const response = await api.get('cart/');
            setCart(response.data);
            const count = response.data.items.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(count);
        } catch (error) {
            console.error("Failed to fetch cart", error);
        }
    }, []);

    useEffect(() => {
        if (user) {
            // eslint-disable-next-line
            fetchCart();
        } else {
            setCart(null);
            setCartCount(0);
        }
    }, [user, fetchCart]);

    return (
        <CartContext.Provider value={{ cart, cartCount, fetchCart, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
