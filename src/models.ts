export type ResturantMenuItem = {
  id: number;
  category: string;
  name: string;
  topping?: Array<string>;
  price: number;
  rank: number;
};

export type Resturant = {
  id: number;
  name: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
};
