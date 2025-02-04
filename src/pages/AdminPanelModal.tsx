import React, { useState, useEffect } from "react";
import "./AdminPanelModal.css";
// import { useCart } from '../context/CartContext';
// import { Product } from '../types';

const AdminPanelModal: React.FC = () => {
  
    // const [_, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          window.location.href = '/';
        } 
        // else {
        //   setToken(storedToken);
        // }
    }, []);
  
    return (
        <div className="">
          <h2 className="">Список всех объявлений</h2>
          {/* Content for admin panel module */}

          <h2 className="">Опасная зона</h2>
          <button className="">
            Удалить все объявления
          </button>
        </div>
    );
  };

export default AdminPanelModal;