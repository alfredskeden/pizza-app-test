import '../App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TOrder, TOrderCart, TResturantMenuItem, TResturant } from '../models';

function OrderStatus() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<TOrder>();
  const [resturant, setResturant] = useState<TResturant>();
  const [menu, setMenu] = useState<Array<TResturantMenuItem>>([]);

  const getCartInfo = async (resturantId: number, orderCart: Array<TOrderCart>) => {
    const menu = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}/menu`);
    const resturant = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}`);
    setMenu(menu.data);
    setResturant(resturant.data);
  };

  const getOrder = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/orders/${orderId}`);
    setOrder(data);
    getCartInfo(data.restuarantId, data.cart);
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (!order || !resturant || menu.length < 0) {
    return <div>Laddar orderstatus...</div>;
  }

  return (
    <div className="order-status">
      <h2>Order Slutförd</h2>
      <p>Orderid: {order.orderId}</p>
      <p>Status: {order.status}</p>
      <p>Beställd: {new Date(order.orderedAt).toLocaleString()}</p>
      <p>Beräknad ankomst: {new Date(order.esitmatedDelivery).toLocaleString()}</p>
      <p>Pris: {order.totalPrice} kr</p>
      <p>Resturang: {resturant?.name}</p>
      <p>Adress: {resturant?.address1}</p>
      <p>{resturant?.address2}</p>
      {order.cart.map((value, index: number) => {
        const menuItem: TResturantMenuItem | undefined = menu.find((resturantMenuItem: TResturantMenuItem) => resturantMenuItem.id === value.menuItemId);
        return (
          <div key={`cart${index}`}>
            <p>
              {menuItem?.category}: {menuItem?.name}
            </p>
            <p>Antal: {value.quantity}</p>
            <p>Pris: {menuItem?.price} kr</p>
          </div>
        );
      })}
    </div>
  );
}

export default OrderStatus;
