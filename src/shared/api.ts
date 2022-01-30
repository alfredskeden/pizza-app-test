import axios, { AxiosInstance } from 'axios';
import { TOrder, TResturant, TResturantMenuItem, TShoppingCart } from './models';

const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PIZZA_APIERY_URL
})

/** Fetches the menu and resturant on the order status page to write infornation in dom */
export const getMenuFromResturantId = async (resturantId: number | undefined) => {
  return await client.get<Array<TResturantMenuItem>>(`/restaurants/${resturantId}/menu`);
};

export const getResturantFromResturantId = async (resturantId: number | undefined) => {
  return await client.get<TResturant>(`/restaurants/${resturantId}`);
}

/** Fetches the order details from the useParams in url */
export const getOrderFromId = async (orderId: string | undefined) => {
  return await client.get<TOrder>(`/orders/${orderId}`);
};

export const postOrder = async (shoppingCart: TShoppingCart) => {
  return await client.post<TOrder>(`/orders/`, { cart: shoppingCart.cart, resturantId: shoppingCart.resturant?.id });
}