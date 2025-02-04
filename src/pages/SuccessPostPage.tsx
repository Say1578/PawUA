import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Импорт useNavigate
import "./SuccessPostPage.css";
import { ReactComponent as CatIcon } from "../assets/cat-icon.svg"; // ✅ Подключаем иконку котика

const SuccessPostPage: React.FC = () => {
  const navigate = useNavigate(); // ✅ Хук для навигации
  
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      window.location.href = '/';
    } else {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="success-container">
      <CatIcon className="success-icon" />
      <h2 className="success-message">Ваше оголошення розміщено успішно!</h2>
      
      {/* ✅ Изменил ссылку на кнопку с обработчиком */}
      <button className="success-link" onClick={() => navigate("/")}>
        Перейти на сторінку оголошення
      </button>
    </div>
  );
};

export default SuccessPostPage;