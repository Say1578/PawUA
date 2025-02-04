import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface CartContextProps {
  cart: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product: Product) => {
    if (!isInCart(product.id)) {
      setCart(prevCart => [...prevCart, product]);
    }
  };

  const removeProduct = (id: number) => {
    setCart(prevCart => prevCart.filter(product => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: number) => {
    return cart.some(product => product.id === id);
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
