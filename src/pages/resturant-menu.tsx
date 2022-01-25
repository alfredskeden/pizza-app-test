import '../App.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TResturant, TResturantMenuItem } from '../shared/models';

function ResturantMenu({ addToShoppingCart }: { addToShoppingCart: Function }) {
  const { resturantId } = useParams();
  const [resturantMenu, setResturantMenu] = useState<Array<TResturantMenuItem>>();
  const [resturant, setResturant] = useState<TResturant>();

  const fetchResturant = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}`);
    setResturant(data);
  };

  const fetchResturantMenu = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}/menu?orderBy=rank`);
    setResturantMenu(data);
  };

  const addItemToShoppingCart = (menuItem: TResturantMenuItem) => {
    addToShoppingCart(menuItem);
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchResturantMenu();
    fetchResturant();
    // eslint-disable-next-line
  }, []);

  if (!resturantMenu || !resturant) {
    return <div className="mt-3"><h2>Laddar...</h2></div>;
  }

  return (
    <div className="mt-3">
      <h2>Meny för {resturant?.name}</h2>
      {resturantMenu?.map((menuItem: TResturantMenuItem, index: number) => {
        return (
          <div className="container" key={`menuItem${index}`}>
            <h3>{menuItem.id}. {menuItem.name}</h3>
            <span>
              {menuItem.topping?.map((value: string, index2: number) => (
                <span key={index2}>
                {index2 === 0 ? <span>(</span> : ', '}{value}{index2 + 1 === menuItem.topping?.length ? <><span>)</span><br /></> : ''}
                </span>
              ))}
            </span>
            <span>{menuItem.price} kr</span>
            <button className="btn" onClick={() => addItemToShoppingCart(menuItem)}>
              Lägg till i varukorg
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ResturantMenu;
