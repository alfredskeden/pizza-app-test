import '../App.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TResturant, TResturantMenuItem } from '../shared/models';
import Loading from '../component/loading';

function ResturantMenu({ addToShoppingCart }: { addToShoppingCart: Function }) {
  const { resturantId } = useParams();

  /** States */
  const [resturantMenu, setResturantMenu] = useState<Array<TResturantMenuItem>>();
  const [resturant, setResturant] = useState<TResturant>();

  /** Fetches the resturant and adds it to the state useParams() in url */
  const fetchResturant = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}`);
    setResturant(data);
  };

  /** Fetches the resturants menu based on useParams() in url and add its to the resturantMenu */
  const fetchResturantMenu = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/${resturantId}/menu?orderBy=rank`);
    setResturantMenu(data);
  };

  /** Calls the param Function to add a resturant item to the shopping cart */
  const addItemToShoppingCart = (menuItem: TResturantMenuItem) => {
    addToShoppingCart(menuItem);
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchResturantMenu();
    fetchResturant();
    // eslint-disable-next-line
  }, []);

  /** wait until everything has been loading untill we show anything */
  if (!resturantMenu || !resturant) {
    return <Loading>Laddar...</Loading>;
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
