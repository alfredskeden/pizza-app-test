import '../App.scss';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TResturantMenuItem, TShoppingCart } from '../shared/models';
import { getTotalPrice } from '../shared/shared';
import Loading from '../component/loading';

/** Checkout route. Where we do checkout and sends order information to api */
function Checkout({ shoppingCart, clearShoppingCart }: { shoppingCart: TShoppingCart; clearShoppingCart: Function }) {
  const navigate = useNavigate();

  /** Sets order sent state */
  const [sendOrderClicked, SetSendOrderClicked] = useState<boolean>(false);

  /** Sends order information and creates the order in the api */
  const sendOrderConfirmation = async () => {
    const orderDetails = await axios.post(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/orders/`, { cart: shoppingCart.cart, resturantId: shoppingCart.resturant?.id });
    if (orderDetails) {
      clearShoppingCart();
      navigate(`/order-status/${orderDetails.data.orderId}`);
    }
  };

  return (shoppingCart.cart.length > 0 ? (
    <>
      <h2>Varukorg</h2>
      {shoppingCart.cart.map((resturantMenuItem: TResturantMenuItem, index: number) => {
        return (
          <div key={`shoppingCartItemCheckout${index}`}>
              {resturantMenuItem.id}. {resturantMenuItem.name} - {resturantMenuItem.price} kr
          </div>
        );
      })}
      <br />
      <div className="container">
        <span>Total: {getTotalPrice(shoppingCart.cart)} kr</span>
        <button className="btn complete"
          onClick={() => {
            if (!sendOrderClicked) {
              SetSendOrderClicked(true);
              sendOrderConfirmation();
            }
          }}
        >
          Slutför köpet
        </button>
      </div>
    </>
  ) : (
    <span>{sendOrderClicked ? `Order skickas...` : <Loading>Inget i varukorgen</Loading>}</span>
  ));
}

export default Checkout;
