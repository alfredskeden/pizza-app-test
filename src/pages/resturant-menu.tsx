import '../App.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TResturant, TResturantMenuItem } from '../shared/models';
import Loading from '../component/loading';
import { getMenuFromResturantId, getResturantFromResturantId } from '../shared/api';

function ResturantMenu({ addToShoppingCart }: { addToShoppingCart: Function }) {
  const { resturantId } = useParams();

  /** States */
  const [resturantMenu, setResturantMenu] = useState<Array<TResturantMenuItem>>();
  const [resturant, setResturant] = useState<TResturant>();

  /** Calls the param Function to add a resturant item to the shopping cart */
  const addItemToShoppingCart = (menuItem: TResturantMenuItem) => {
    addToShoppingCart(menuItem);
  };

  // eslint-disable-next-line
  useEffect(() => {
    getMenuFromResturantId(Number(resturantId)).then((res) => {
      setResturantMenu(res.data);
    });
    getResturantFromResturantId(Number(resturantId)).then((res) => {
      setResturant(res.data);
    });
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
