import '../App.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Resturant, ResturantMenuItem } from '../models';

function ResturantMenu() {
  const { resturantId } = useParams();
  const [resturantMenu, setResturantMenu] = useState<Array<ResturantMenuItem>>();
  const [resturant, setResturant] = useState<Resturant>();

  const fetchResturant = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}`);
    setResturant(data);
  };

  const fetchResturantMenu = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}/menu?orderBy=rank`);
    setResturantMenu(data);
  };

  const addItemToShoppingCart = (id: number) => {
    console.log(`added to cart`);
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchResturantMenu();
    fetchResturant();
    // eslint-disable-next-line
  }, []);

  if (!resturantMenu || !resturant) {
    return <div>Laddar...</div>;
  }

  return (
    <div>
      <h2>Meny för {resturant?.name}</h2>
      {resturantMenu?.map((menuItem: ResturantMenuItem, index: number) => {
        return (
          <div key={`menuItem${index}`}>
            <h3>{menuItem.name}</h3>
            <span>
              {menuItem.topping?.map((value: string, index2: number) => (
                <span key={index2}>
                  {value} {index2 === (menuItem.topping?.length as number) - 1 ? <br /> : ``}
                </span>
              ))}
            </span>
            <span>{menuItem.price} kr</span>
            <br />
            <button onClick={() => addItemToShoppingCart(menuItem.id)}>Köp</button>
          </div>
        );
      })}
    </div>
  );
}

export default ResturantMenu;
