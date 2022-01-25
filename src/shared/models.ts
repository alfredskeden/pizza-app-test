export type TResturantMenuItem = {
  id: number;
  category: string;
  name: string;
  topping?: Array<string>;
  price: number;
  rank: number;
};

export type TResturant = {
  id: number;
  name: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
};

export type TShoppingCart = {
  cart: Array<TResturantMenuItem>;
  resturant?: TResturant;
};

export type TOrderCart = {
  menuItemId: number;
  quantity: number;
};

export type TOrder = {
  orderId: number;
  totalPrice: number;
  orderedAt: Date;
  esitmatedDelivery: Date;
  status: string;
  cart: Array<TOrderCart>;
  restuarantId: number;
};
