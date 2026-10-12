
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Convert a product's price into a number, even if it includes a currency symbol.
  const getPrice = (item) =>
    Number(String(item.cost).replace(/[^0-9.-]/g, '')) || 0;

  // Calculate the total for all products, including their quantities.
  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + getPrice(item) * item.quantity,
      0
    ).toFixed(2);
  };

  // Return to shopping.
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // Increase quantity by one.
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease quantity, keeping it at a minimum of one.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  // Remove the selected product from the cart.
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate the total cost of one product.
  const calculateTotalCost = (item) => {
    return (getPrice(item) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">
                Unit price: ${getPrice(item).toFixed(2)}
              </div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      >
        Total: ${calculateTotalAmount()}
      </div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
