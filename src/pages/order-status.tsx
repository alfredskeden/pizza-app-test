import '../App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TOrder, TResturantMenuItem, TResturant } from '../shared/models';
import Loading from '../component/loading';

function OrderStatus(): JSX.Element {
  const { orderId } = useParams();

  /** States */
  const [order, setOrder] = useState<TOrder>();
  const [resturant, setResturant] = useState<TResturant>();
  const [menu, setMenu] = useState<Array<TResturantMenuItem>>([]);

  /** Fetches the menu and resturant on the order status page to write infornation in dom */
  const getCartInfo = async (resturantId: number) => {
    const menu = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}/menu`);
    const resturant = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}`);
    setMenu(menu.data);
    setResturant(resturant.data);
  };

  /** Fetches the order details from the useParams in url */
  const getOrder = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/orders/${orderId}`);
    setOrder(data);
    getCartInfo(data.restuarantId);
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);

  /** Dont show anything untill everything has been fetched. */
  if (!order || !resturant || menu.length < 0) {
    return <Loading>Laddar orderstatus...</Loading>;
  }

  return (
    <div className="order-status">
      <h2>Tack för ditt köp</h2>
      <span>Orderid: {order.orderId}</span>
      <span>Status: {order.status}</span>
      <span>Beställd: {new Date(order.orderedAt).toLocaleString()}</span>
      <span>Beräknad ankomst: {new Date(order.esitmatedDelivery).toLocaleString()}</span>
      <span>Resturang: {resturant.name}</span>
      <span>Adress: {resturant.address1}</span>
      <span>{resturant.address2}</span>
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
      <Link className="mt-3" to={`/`}>Till förstasidan</Link>
    </div>
  );
}

export default OrderStatus;
