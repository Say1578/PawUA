import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { Product } from '../types';
import Pagination from './Pagination';

interface ApiResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  totalItems: number;
  data: Product[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, settotalItems] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParams = Array.from(params.entries()).map(([key, value]) => `${key}=${value}`).join('&');

    fetch(`${process.env.REACT_APP_API_BASE_URL}/pets?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        setProducts(data.data);
        setTotalPages(data.totalPages);
        settotalItems(data.totalItems)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: '#808080', textAlign: 'center', fontSize: '16px', fontStyle: 'italic' }}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="product-list">
      <h1 className='post-title'>Оголошення</h1>
      <p className='count-list'>Знайдено {totalItems} оголошень</p>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '1.5rem', margin: '32px' }}>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default ProductList;
