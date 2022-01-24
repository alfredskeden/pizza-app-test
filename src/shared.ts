import { TResturant, TResturantMenuItem } from './models';

// gets closest resturant from users location
export const getClosestResturant = (resturants: Array<TResturant>, lat: number, lng: number): TResturant => {
  const resturant: TResturant = resturants.reduce((prev, curr) => {
    const prevDist: number = Math.sqrt(Math.pow(prev.latitude - lat, 2) + Math.pow(prev.longitude - lng, 2));
    const currDist: number = Math.sqrt(Math.pow(curr.latitude - lat, 2) + Math.pow(curr.longitude - lng, 2));
    return prevDist < currDist ? prev : curr;
  }, resturants[0]);
  return resturant;
};

// sum total price of all pizzas
export const getTotalPrice = (resturantMenuItems: Array<TResturantMenuItem>): number => {
  return resturantMenuItems.reduce((prev, curr) => prev + curr.price, 0);
};
