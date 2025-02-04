import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Импортируем хук для возврата
import "./About.css";
import { ReactComponent as ArrowIcon } from "../assets/arrow-left.svg"; // ✅ Импорт стрелки

const About: React.FC = () => {
  const navigate = useNavigate(); // ✅ Навигация для возврата

  return (
    <div className="about-container">
      {/* ✅ Кнопка возврата */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowIcon className="back-icon" />
        </button>
      </div>

      <h1 className="title-about">Про нас</h1>
      <p>Ми - команда ентузіастів, які створили платформу ZOOFEEL для допомоги тваринам у пошуку нового дому.</p>
      <p className="importent">Наша місія - зробити процес адопції легким та безпечним.</p>
    </div>
  );
};

export default About;