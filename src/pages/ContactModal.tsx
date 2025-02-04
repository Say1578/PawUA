import React from "react";
import "./ContactModal.css";
import { Product } from "../types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null; 

  const { phone, additional_phone, email, telegram } = product;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h3>Номер телефону для зв’язку</h3>
        <p className="contact-item">{phone}</p>

        {additional_phone && (
          <>
            <h3>Додатковий номер</h3>
            <p className="contact-item">{additional_phone}</p>
          </>
        )}

        <h3>Пошта</h3>
        <p className="contact-item">{email}</p>

        {telegram && (
          <>
            <h3>Telegram</h3>
            <p className="contact-item">{telegram}</p>
          </>
        )}

        <div className="warning-text">НІКОЛИ НЕ ПОГОДЖУЙТЕСЯ НА ПЕРЕДОПЛАТУ!</div>
      </div>
    </div>
  );
};

export default ContactModal;
