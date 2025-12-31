import React from 'react';
import useProductList from '../hooks/useProductList';
import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const { products, loading, error } = useProductList();
  const searchQuery = useSelector((state) => state.products.searchQuery);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;