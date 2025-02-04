import React, { useState } from 'react';
import './SearchSection.css';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as CategoryIcon } from '../assets/category.svg';
import { ReactComponent as LocationIcon } from '../assets/location.svg';
import { categories, regions } from '../types';

const SearchSection: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchRegion, setSearchRegion] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    if (searchName) queryParams.set('name', searchName);
    if (searchCategory) queryParams.set('category_id', searchCategory);
    if (searchRegion) queryParams.set('region', searchRegion);

    const queryString = queryParams.toString();
    window.location.href = `/?${queryString}`;
  };

  return (
    <div className="search-section">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          {/* Поле поиска */}
          <div className="input-group">
            <SearchIcon className="input-icon-search position-search" />
            <input
              type="text"
              placeholder="Пошук"
              className="search-input"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          {/* Категории */}
          <div className="input-group">
            <CategoryIcon className="input-icon-category position-category" />
            <select
              className="select-input"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="">Оберіть категорію</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Регионы */}
          <div className="input-group">
            <LocationIcon className="input-icon-location position-location" />
            <select
              className="select-input"
              value={searchRegion}
              onChange={(e) => setSearchRegion(e.target.value)}
            >
              <option value="">Оберіть область</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Кнопка */}
          <button type="submit" className="search-button">
            ЗНАЙТИ
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
