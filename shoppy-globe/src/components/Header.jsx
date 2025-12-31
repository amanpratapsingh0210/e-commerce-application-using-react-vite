import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/productSlice';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="logo"><Link to="/">ShoppyGlobe</Link></div>
      <input 
        type="text" 
        placeholder="Search products..." 
        onChange={(e) => dispatch(setSearchQuery(e.target.value))} 
        className="search-bar"
      />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </nav>
    </header>
  );
};

export default Header;