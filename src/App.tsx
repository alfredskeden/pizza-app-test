import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Resturants from './pages/resturants';
import Checkout from './pages/checkout';
import OrderStatus from './pages/order-status';
import Error from './pages/error';
import ResturantMenu from './pages/resturant-menu';
import ShoppingCart from './component/shopping-cart';
import { TResturant, TResturantMenuItem, TShoppingCart } from './models';
import { getClosestResturant } from './shared';

function App() {
  const [resturants, setResturants] = useState<Array<TResturant>>([]);
  const [closestReturant, setClosestResturant] = useState<TResturant>();
  const [shoppingCart, setShoppingCart] = useState<TShoppingCart>({ cart: [] });
  const [geoloactionActive, setGeolocationActive] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  const fetchResturants = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/`);
    setResturants(data);
  };

  const addShoppingCartItem = (resturantMenuItem: TResturantMenuItem, resturant: TResturant) => {
    setShoppingCart({ cart: [...shoppingCart.cart, resturantMenuItem], resturant: resturant });
  };

  const clearShoppingCart = () => {
    setShoppingCart({ cart: [] });
  };

  const removeResturantItemFromCart = (resturantItemIndex: number) => {
    setShoppingCart({ cart: [...shoppingCart.cart.filter((resturantItem: TResturantMenuItem, index: number) => resturantItemIndex !== index)], resturant: shoppingCart.resturant });
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchResturants();
  }, []);

  useEffect(() => {
    setClosestResturant(getClosestResturant(resturants, lat, long));
  }, [resturants, lat, long]);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setGeolocationActive(true);
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <Router>
      <header className="header">
        <Link to={`/`}>
          <h1>Alfreds order pizza app</h1>
        </Link>
      </header>
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ShoppingCart shoppingCart={shoppingCart} removeResturantItemFromCart={removeResturantItemFromCart} />
                <Resturants geoloactionActive={geoloactionActive} closestReturant={closestReturant} resturants={resturants} />
              </div>
            }
          />
          <Route
            path="/:resturantId"
            element={
              <div>
                <ShoppingCart shoppingCart={shoppingCart} removeResturantItemFromCart={removeResturantItemFromCart} />
                <ResturantMenu addToShoppingCart={addShoppingCartItem} />
              </div>
            }
          />
          <Route path="/checkout" element={<Checkout shoppingCart={shoppingCart} clearShoppingCart={clearShoppingCart} />} />
          <Route path="/order-status" element={<Error />} />
          <Route path="/order-status/:orderId" element={<OrderStatus />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <footer className="footer"></footer>
    </Router>
  );
}

export default App;
