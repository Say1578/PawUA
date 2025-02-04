import React, { useState } from "react";
import "./ReportModal.css"; // Подключаем стили
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg"; // Иконка закрытия
import { ReactComponent as WarningIcon } from "../assets/warning.svg"; // Иконка предупреждения

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null; // Если модальное окно закрыто, не рендерим

  const handleSubmit = () => {
    setIsSubmitted(true); // Показываем подтверждение
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Кнопка закрытия */}
        <button className="close-button" onClick={onClose}>
          <CloseIcon className="close-icon" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="modal-title">Скарга</h2>

            {/* Варианты жалобы */}
            <div className="report-options">
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkbox"></span> Спам
              </label>
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkbox"></span> Не по темі сайту
              </label>
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkbox"></span> Червона книга
              </label>
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkbox"></span> Неактуальне оголошення
              </label>
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkbox"></span> Не власник
              </label>
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkbox"></span> Шахрайство
              </label>
            </div>

            {/* Текстовое поле */}
            <textarea className="report-textarea" placeholder="Введіть деталі скарги..."></textarea>

            {/* Блок предупреждения */}
            <div className="report-warning-container">
              <WarningIcon className="warning-icon" />
              <p className="report-warning-text">
                Побачили недійсне оголошення? Надішліть нам скаргу. Наші адміністратори розглянуть її протягом 3 робочих днів.
              </p>
            </div>

            {/* Кнопка отправки */}
            <button className="submit-report-button" onClick={handleSubmit}>
              ВІДПРАВИТИ
            </button>
          </>
        ) : (
          <div className="success-content">
            <h2 className="modal-title">Скарга</h2>
            <WarningIcon className="success-icon" />
            <p className="success-message">Скаргу подано успішно!</p>
            <p className="success-text">
              Наші адміністратори розглянуть вашу заявку протягом 3 робочих днів.
              Дякуємо за вашу уважність.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportModal;