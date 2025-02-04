import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Импортируем хук для возврата
import "./PrivacyPolicy.css";
import { ReactComponent as ArrowIcon } from "../assets/arrow-left.svg"; // ✅ Импорт стрелки

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate(); // ✅ Навигация для возврата

  return (
    <div className="privacy-container">
      {/* ✅ Кнопка возврата */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowIcon className="back-icon" />
        </button>
      </div>

      <h1 className="title-private">Політика конфіденційності</h1>
      <p>Ми поважаємо вашу конфіденційність і дбаємо про захист ваших персональних даних.</p>
      <p>Ця сторінка пояснює, які дані ми збираємо і як їх використовуємо.</p>
    </div>
  );
};

export default PrivacyPolicy;