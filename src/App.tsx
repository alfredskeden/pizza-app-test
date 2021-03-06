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
import { TResturant, TResturantMenuItem, TShoppingCart } from './shared/models';
import { getClosestResturant } from './shared/shared';
import ScrollToTop from './component/scroll-to-top';

function App(): JSX.Element {

  /** States */
  const [resturants, setResturants] = useState<Array<TResturant>>([]);
  const [closestReturant, setClosestResturant] = useState<TResturant>();
  const [shoppingCart, setShoppingCart] = useState<TShoppingCart>({ cart: [] });
  const [geoloactionActive, setGeolocationActive] = useState<boolean>(false);
  const [geolocationText, setGeolocationText] = useState<string | undefined>(`Försöker att hitta närmaste pizzerian...`);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  /** Fetches the resturants and adds them to the resturant state array. */
  const fetchResturants = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/`);
    setResturants(data);
  };

  /** Adds a shopping cart item and a resturant to the shopping cart. */
  const addShoppingCartItem = (resturantMenuItem: TResturantMenuItem, resturant: TResturant): void => {
    setShoppingCart({ cart: [...shoppingCart.cart, resturantMenuItem], resturant: resturant });
  };

  /** Cleares the shopping cart. */
  const clearShoppingCart = (): void => {
    setShoppingCart({ cart: [] });
  };

  /** removes menu item form the shopping cart */
  const removeResturantItemFromCart = (resturantItemIndex: number): void => {
    setShoppingCart({ cart: [...shoppingCart.cart.filter((x, index: number) => resturantItemIndex !== index)], resturant: shoppingCart.resturant });
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchResturants();
  }, []);

  /** When state long gets set we set the closest resturant from getClosesetResturant */
  useEffect(() => {
    setClosestResturant(getClosestResturant(resturants, lat, long));
  }, [resturants, lat, long]);

  /** Code to ask and get gelocation information from the browser and user to get the closest resturant */
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setGeolocationActive(true);
      setGeolocationText(undefined);
    },
    (error) => {
      console.log(error);
      setGeolocationActive(true);
      setGeolocationText(`${error.message}`)
    }
  );

  return (
    <Router>
      <ScrollToTop />
      <header className="header">
        <Link to={`/`}>
          <h1>Alfreds pizza <br /> order app</h1>
        </Link>
      </header>
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ShoppingCart shoppingCart={shoppingCart} removeResturantItemFromCart={removeResturantItemFromCart} />
                <Resturants geoloactionActive={geoloactionActive} closestReturant={closestReturant} resturants={resturants} geolocationText={geolocationText} />
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
