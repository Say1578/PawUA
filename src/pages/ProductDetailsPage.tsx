import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailsPage.css";
import { ReactComponent as ArrowIcon } from "../assets/arrow-left.svg";
import ContactModal from "../pages/ContactModal"; // Модалка контактов
import ReportModal from "../pages/ReportModal"; // ✅ Добавляем модальное окно жалобы 
import { ReactComponent as ReportIcon } from "../assets/report.svg";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { cart, addProduct, removeProduct, isInCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/pets/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ color: '#808080', textAlign: 'center', fontSize: '16px', fontStyle: 'italic' }}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p style={{ color: '#808080', textAlign: 'center', fontSize: '16px', fontStyle: 'italic' }}> Оголошення не знайдено </p>;

  ;

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',  
    month: '2-digit',
    year: '2-digit', 
  };
  const date = new Date(product.created_at);
  const formattedTime = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kiev',
    ...options
  }).format(date)


  const handleCartButtonClick = () => {
    if (isInCart(product.id)) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  }
  

  return (
    <div className="product-details-container">
      {/* Кнопка возврата */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowIcon className="back-icon" />
        </button>
      </div>

      {/* Основной контент */}
      <div className="product-details">
        <div className="product-left">
          <img src={product.images[0]} alt={product.name} className="product-image-large" />
        </div>

        <div className="product-right">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">{product.price} грн</p>

          {/* Информация о пользователе */}
          <div className="user-info">
            {/* <div className="user-avatar"></div> */} {/** as we dont have one */}
            <div>
              <p className="username">{product.user_name}</p>
              <p className="status">Був на сайті</p>
            </div>
          </div>

          {/* Кнопки */}
          <button className="contact-button" onClick={() => setIsContactModalOpen(true)}>ЗВ'ЯЗАТИСЯ</button>
          <button className="save-button" onClick={handleCartButtonClick}>
            {isInCart(product.id) ? 'ВИДАЛИТИ' : 'ДОДАТИ В ОБРАНЕ'}
          </button>
        </div>
      </div>

      {/* Описание объявления */}
      <div className="product-description-section">
        <h3 className="description-title">Опис</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-info">
          <span className="product-id">№000001, розміщено {formattedTime}</span>
          <button className="report-button" onClick={() => setIsReportModalOpen(true)}>
            <ReportIcon className="report-icon" /> Скарга
          </button>
        </div>
      </div>

      {/* Модальные окна */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} product={product} />
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} /> 
    </div>
  );
};

export default ProductDetailsPage;
