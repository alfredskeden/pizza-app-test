import '../App.scss';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TResturantMenuItem, TShoppingCart } from '../models';
import { getTotalPrice } from '../shared';

function Checkout({ shoppingCart, clearShoppingCart }: { shoppingCart: TShoppingCart; clearShoppingCart: Function }) {
  const navigate = useNavigate();
  const [sendOrderClicked, SetSendOrderClicked] = useState<boolean>(false);

  const sendOrderConfirmation = async () => {
    const orderDetails = await axios.post(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/orders/`, { cart: shoppingCart, resturantId: 2 });
    if (orderDetails) {
      clearShoppingCart();
      navigate(`/order-status/${orderDetails.data.orderId}`);
    }
  };

  return shoppingCart.cart.length > 0 ? (
    <>
      <h2>I Varukorgen</h2>
      {shoppingCart.cart.map((resturantMenuItem: TResturantMenuItem, index: number) => {
        return (
          <div key={`shoppingCartItemCheckout${index}`}>
            <span>
              {resturantMenuItem.name} - {resturantMenuItem.price}
            </span>
          </div>
        );
      })}
      <br />
      <span>Total: {getTotalPrice(shoppingCart.cart)} kr</span>
      <br />
      <button
        onClick={() => {
          if (!sendOrderClicked) {
            SetSendOrderClicked(true);
            sendOrderConfirmation();
          }
        }}
      >
        Slutför köpet
      </button>
    </>
  ) : (
    <span>{sendOrderClicked ? `Order skickas...` : `Inget i varukorgen`}</span>
  );
}

export default Checkout;
