import { Resturant } from './models';

// gets closest resturant from users location
export const getClosestResturant = (resturants: Array<Resturant>, lat: number, lng: number): Resturant => {
  const resturant: Resturant = resturants.reduce((prev, curr) => {
    const prevDist: number = Math.sqrt(Math.pow(prev.latitude - lat, 2) + Math.pow(prev.longitude - lng, 2));
    const currDist: number = Math.sqrt(Math.pow(curr.latitude - lat, 2) + Math.pow(curr.longitude - lng, 2));
    return prevDist < currDist ? prev : curr;
  }, resturants[0]);
  return resturant;
};
