import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Resturants from './pages/resturants';
import Checkout from './pages/checkout';
import OrderStatus from './pages/order-status';
import Error from './pages/error';
import ResturantMenu from './pages/resturant-menu';
import { Resturant } from './models';
import { getClosestResturant } from './shared';

function App() {
  const [resturants, setResturants] = useState<Array<Resturant>>([]);
  const [closestReturant, setClosestResturant] = useState<Resturant>();
  const [geoloactionActive, setGeolocationActive] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  const fetchResturants = async () => {
    const { data } = await axios.get(`https://private-anon-c842467727-pizzaapp.apiary-mock.com/restaurants/`);
    setResturants(data);
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
        <h1>Alfreds order pizza app</h1>
      </header>
      <Routes>
        <Route path="/" element={<Resturants geoloactionActive={geoloactionActive} closestReturant={closestReturant} resturants={resturants} />} />
        <Route path="/:resturantId" element={<ResturantMenu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <footer className="footer"></footer>
    </Router>
  );
}

export default App;
