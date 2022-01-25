import '../App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TOrder, TResturantMenuItem, TResturant } from '../shared/models';

function OrderStatus() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<TOrder>();
  const [resturant, setResturant] = useState<TResturant>();
  const [menu, setMenu] = useState<Array<TResturantMenuItem>>([]);

  const getCartInfo = async (resturantId: number) => {
    const menu = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}/menu`);
    const resturant = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}`);
    setMenu(menu.data);
    setResturant(resturant.data);
  };

  const getOrder = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/orders/${orderId}`);
    setOrder(data);
    getCartInfo(data.restuarantId);
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);

  if (!order || !resturant || menu.length < 0) {
    return <div>Laddar orderstatus...</div>;
  }

  return (
    <div className="order-status">
      <h2>Tack för ditt köp</h2>
      <span>Orderid: {order.orderId}</span>
      <span>Status: {order.status}</span>
      <span>Beställd: {new Date(order.orderedAt).toLocaleString()}</span>
      <span>Beräknad ankomst: {new Date(order.esitmatedDelivery).toLocaleString()}</span>
      <span>Resturang: {resturant?.name}</span>
      <span>Adress: {resturant?.address1}</span>
      <span>{resturant?.address2}</span>
      <div className="order-status border">
      {order.cart.map((value, index: number) => {
        const menuItem: TResturantMenuItem | undefined = menu.find((resturantMenuItem: TResturantMenuItem) => resturantMenuItem.id === value.menuItemId);
        
        return (
          <div className="flex column" key={`cart${index}`}>
            <span>
              {menuItem?.category}: {menuItem?.name}
            </span>
            <span>Antal: {value.quantity}</span>
            <span>Pris: {menuItem?.price} kr</span>
            <br />
          </div>
        );
      })}
      <br />
      <span>Totalt pris: {order.totalPrice} kr</span>
      </div>
    </div>
  );
}

export default OrderStatus;
