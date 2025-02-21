import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './Header.css';
import { ReactComponent as PawIcon } from '../assets/paw.svg';
import adminPanelIcon from '../assets/admin-panel.svg';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const API_URL_BASE = process.env.REACT_APP_API_BASE_URL;

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSavedAdsPage = location.pathname === '/saved-ads';

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isUserIconActive, setUserIconActive] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setHasToken(true);
      // Запрашиваем информацию о пользователе с бекенда
      fetch(`${API_URL_BASE}/auth/user/role`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.is_admin) {
          setIsAdmin(true); // Если админ, то обновляем состояние
        }
      })
      .catch(error => console.error('Error checking user role:', error));
    }
  }, [])

  const handleExit = () => {
    localStorage.removeItem('token');
    setHasToken(false);
    setIsAdmin(false); // Сбрасываем состояние админства
    window.location.href = '/';
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setHasToken(true);
        setIsAdmin(data.is_admin); // Сохраняем роль пользователя
        closeModals();
      } else { 
        alert("Помилка не вірні дані");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Помилка паролі не співпадают");
      return;
    }

    try {
      const response = await fetch(`${API_URL_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // localStorage.setItem('token', data.token);
        closeModals();
      } else {
        alert("Ошибка регистрации");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
    setUserIconActive(true);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setUserIconActive(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
    setUserIconActive(true);
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  const handleHeartClick = () => {
    if (isSavedAdsPage) {
      navigate('/'); 
    } else {
      navigate('/saved-ads');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="brand" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <span className="zoo">ZOO</span>
            <span className="feel">SHOP</span>
          </div>
          <div className="paw-center">
            <PawIcon className="paw-icon" />
          </div>
          {hasToken && (
            <button className="post-ad-button" onClick={() => navigate('/post-ad')}>
              РОЗМІСТИТИ ОГОЛОШЕННЯ
            </button>
          )}
        </div>
        <div className="header-right">
          <svg className={`icon ${isSavedAdsPage ? 'icon-active' : ''}`} onClick={handleHeartClick}>
            <use xlinkHref="/symbol-defs.svg#icon-heart" />
          </svg>
          {!hasToken && (
            <svg className={`icon-user ${isUserIconActive ? 'icon-active' : ''}`} onClick={openLoginModal}>
              <use xlinkHref="/symbol-defs.svg#icon-user" />
            </svg>
          )}
          {hasToken && (
            <button onClick={handleExit}  style={{
              padding: '10px 20px',
              borderRadius: '20px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}>Exit</button>
          )}

          {/* Условное отображение кнопки админ-панели */}
          {isAdmin && (
            <button className="admin-panel-button" onClick={() => navigate('/admin-panel-modul')}>
              <img src={adminPanelIcon} alt="Admin Panel"/>
            </button>
          )}
        </div>
      </header>

      {/* Modals */}
      {isLoginModalOpen && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModals}>&times;</button>
            <h2 className="title-login">Ласкаво просимо</h2>
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label>
                <p className="email-texting">Введіть свій e-mail*</p>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p className="password-texting">Введіть свій пароль*</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="login-button">УВІЙТИ</button>
            </form>
            <p className="register-link" onClick={openRegisterModal}>У мене немає профілю</p>
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModals}>&times;</button>
            <h2 className="title-login">Ласкаво просимо</h2>
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <label>
                <p className="email-texting">Введіть своє ім'я*</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше ім'я"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p className="email-texting">Введіть свій e-mail*</p>
                <input
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p className="password-texting">Введіть свій пароль*</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p className="password-texting">Повторіть пароль*</p>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Пароль"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="register-button">ЗАРЕЄСТРУВАТИСЯ</button>
            </form>
            <p className="login-link" onClick={openLoginModal}>Я вже зареєстрований</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
