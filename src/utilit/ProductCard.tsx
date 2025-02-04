import React from 'react';
import './ProductCard.css';
import { useNavigate } from "react-router-dom";
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, id, price, description, images, region, created_at } = product;
  const navigate = useNavigate();

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',  
    month: '2-digit',
    year: '2-digit', 
  };
  const date = new Date(created_at);
  
  const formattedTime = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kiev',
    ...options
  }).format(date);

  const handleClick = () => {
    navigate(`/product/${id}`); 
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={images[0]} alt={name} className="product-image" />
      <div className="product-content">
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <h1 className="product-price">{price} UAH</h1>
            <p className="product-location">{region}</p>
            <p className="product-info">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
