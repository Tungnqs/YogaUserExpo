import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem } from '../type';

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (classId: string) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((item: CartItem) => {
        setItems(current => {
            if (current.some(i => i.classId === item.classId)) {
                return current;
            }
            return [...current, item];
        });
    }, []);

    const removeFromCart = useCallback((classId: string) => {
        setItems(current => current.filter(item => item.classId !== classId));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};