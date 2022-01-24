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

  useEffect(() => {
    fetchResturantMenu();
    fetchResturant();
  }, []);

  if (!resturantMenu || !resturant) {
    return <div>Laddar...</div>;
  }

  return (
    <div>
      <span>Meny för {resturant?.name}</span>
      {resturantMenu?.map((menuItem: ResturantMenuItem) => {
        return <div>{menuItem.name}</div>;
      })}
    </div>
  );
}

export default ResturantMenu;
