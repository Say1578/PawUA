import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './utilit/Header';
import ProductList from './utilit/ProductList';
import Footer from './utilit/Footer';
import SearchSection from './utilit/SearchSection';
import SavedAdsPage from './pages/SavedAdsPage';
import PostAdPage from './pages/PostAdPage';
import { ProductDetailsPage } from "./pages/ProductDetailsPage"; // ✅ Импортируем страницу подробно
import SuccessPostPage from "./pages/SuccessPostPage"; // ✅ Импортируем страницу успеха
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminPanelModal from "./pages/AdminPanelModal";
import "./index.css"
import { AdPopup } from './utilit/AdPopup';

function App() {
  return (
    <>
      <div className='app'>
        <Header />
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={
            <>
              <SearchSection />
              <ProductList />
            </>
          } />

          {/* Страница сохраненных объявлений */}
          <Route path="/saved-ads" element={<SavedAdsPage />} />

          {/* Новая страница размещения объявления */}
          <Route path="/post-ad" element={<PostAdPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/success" element={<SuccessPostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin-panel-modul" element={<AdminPanelModal />} />
        </Routes>
      <AdPopup />
      </div>
      <Footer />
    </>
  );
}

export default App;