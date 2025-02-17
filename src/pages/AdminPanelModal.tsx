import React, { useState, useEffect, useCallback } from "react";
import "./AdminPanelModal.css";
import ProductCard from "../utilit/ProductCard";
import { Product } from "../types";

const AdminPanelModal: React.FC = () => {
  const [ads, setAds] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [, setIsAdmin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/user/role`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.is_admin) {
          setIsAdmin(true);
        } else {
    window.location.href = '/'
        }
      })
      .catch(error => console.error('Error checking user role:', error));
    } else {
      window.location.href = '/'
    }
  }, [])


  const fetchAds = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch ads");
  
      const jsonResponse = await response.json();
      console.log("Full API response:", jsonResponse);
  
      setAds(Array.isArray(jsonResponse.data) ? jsonResponse.data : []);
    } catch (err) {
      console.error("Error fetching ads:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [token]);  

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete ad");

      setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
    } catch (err) {
      console.error("Error deleting ad:", err);
      setError(err instanceof Error ? err.message : "Failed to delete ad");
    }
  };

  if (loading) return <p style={{ color: '#808080', textAlign: 'center', fontSize: '16px', fontStyle: 'italic', marginTop: '30px' }}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-panel-modal">
      <h2>Список всех объявлений</h2>
      <div className="ads-container">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div key={ad.id} className="product-card-wrapper">
              <ProductCard product={ad} />
              <div className="remove-icon-container" onClick={() => handleDelete(ad.id)}>
                <RemoveIcon />
              </div>
            </div>
          ))
        ) : (
          <p>Нет объявлений</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanelModal;

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
      <g id="SVGRepo_iconCarrier">
        <g id="XMLID_6_">
          <g id="XMLID_11_">
            <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z" />
          </g>
          <g id="XMLID_18_">
            <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />
          </g>
          <g id="XMLID_23_">
            <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />
          </g>
        </g>
      </g>
    </svg>
  );
};
