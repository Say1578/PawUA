import React, { useState, useEffect } from 'react';
import ProductCard from '../utilit/ProductCard';
import './SavedAdsPage.css';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const SavedAdsPage: React.FC = () => {
  const { cart, removeProduct, clearCart } = useCart();
  const [myAds, setMyAds] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/pets`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch my ads');
        }
        const data = await response.json();
        setMyAds(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // setError(err.message);
        } else {
          // setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, []);

  const deletePet = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/pets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }
      setMyAds((prevAds) => prevAds.filter((pet) => pet.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        // setError(err.message);
      } else {
        // setError('An unknown error occurred');

      }
    };
  }
  if (loading) return <p style={{ color: '#808080', textAlign: 'center', fontSize: '16px', fontStyle: 'italic', marginTop: '30px' }}>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="saved-ads-page">
      <h2 className='mine-post'>Мої оголошення</h2>
      {!localStorage.getItem('token') && (
        <p>Empty</p>
      )}
      <div className="ads-container">
        {myAds.map((product, index) => (
          <div key={index} className="product-card-wrapper">
            <ProductCard product={product} />
            <div className="remove-icon-container" onClick={() => deletePet(product.id)}>
              <RemoveIcon />
            </div>
          </div>
        ))}
      </div>
  
      {/* Заголовок для "Збережені оголошення" вынесен за пределы ads-container */}
      <h2 className='save-post'>Збережені оголошення</h2>
  
      {cart.length > 0 && (
        <button className="remove-all-button" onClick={clearCart}>
          Видалити всі
        </button>
      )}
  
      <div className="ads-container">
        {cart.map((product, index) => (
          <div key={index} className="product-card-wrapper">
            <ProductCard product={product} />
            <div className="remove-icon-container" onClick={() => removeProduct(product.id)}>
              <RemoveIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  

export default SavedAdsPage;

const RemoveIcon = () => {
  return (
    <svg
      fill="#000000"
      height="200px"
      width="200px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      className='remove-icon'
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="XMLID_6_">
          {" "}
          <g id="XMLID_11_">
            {" "}
            <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z" />{" "}
          </g>{" "}
          <g id="XMLID_18_">
            {" "}
            <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />{" "}
          </g>{" "}
          <g id="XMLID_23_">
            {" "}
            <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>

  )
}