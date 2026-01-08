import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (qty) => {
    if (qty >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: qty }));
    }
  };

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} width="50" />
      <div>
        <h4>{item.title}</h4>
        <p>${item.price}</p>
      </div>
      <div className="cart-controls">
        <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
        <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;