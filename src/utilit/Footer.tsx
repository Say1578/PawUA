/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Footer.css';
import handleDownload from "./ZooFeelDownload";

import { ReactComponent as AndroidIcon } from '../assets/android.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Контактная информация */}
        <div className="footer-contact">
          <h3 className='footer-title'>КОНТАКТНА ІНФОРМАЦІЯ</h3>
          <div className='adress'>
          <p className='footer-item'>м.Запоріжжя вул Кияшка 16-б</p>
          <a className='footer-link' href="mailto:info@zoofeel.com">info@zoofeel.com</a>
          <a className='footer-link' href="tel:+380962281488">+38 096 228 14 88</a>
          </div>
        </div>

        {/* Логотип и ссылки */}
        <div className="footer-logosect">
          <h1 className="footer-logo">
            <p className='logo-class'><span className='logo-span'>ZOO</span> SHOP</p> 
          </h1>
          <div className='group-about'>
          <p><a className='about' href="#/about">Про нас</a></p>
          <p><a className='about' href="#/privacy-policy">Політика конфіденційності</a></p>
          </div>
          <p className='dreamteam'>DreamTeam © 2025 All rights reserved</p>
        </div>

        {/* Кнопка загрузки приложения */}
        <div className="footer-downloadsect">
          <h3 className='footer-download'>ЗАВАНТАЖТЕ ДОДАТОК</h3>
          <button className="download-button" onClick={handleDownload}>
            <div>
            <p>ЗАВАНТАЖИТИ </p>
            <p className='text-andr'>для Android</p>
            </div>
            <AndroidIcon className="android-icon" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
