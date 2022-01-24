import { Link } from 'react-router-dom';
import '../App.scss';
import { Resturant } from '../models';

function Resturants({ geoloactionActive, closestReturant, resturants }: { geoloactionActive: boolean; closestReturant: Resturant | undefined; resturants: Array<Resturant> | undefined }) {
  if (!resturants || !closestReturant) {
    return <div>Laddar...</div>;
  }

  return (
    <>
      {geoloactionActive && (
        <div>
          <h2>{closestReturant?.name} är din närmastet pizzeria</h2>
          <span>{closestReturant?.address1}</span>
          <br />
          <span>{closestReturant?.address2}</span>
          <br />
          <Link to={`/${closestReturant?.id}`}>Visa meny</Link>
        </div>
      )}

      <p>Menyer finns för: </p>
      {resturants.map((resturant: Resturant) => {
        return (
          <div>
            <Link to={`/${resturant.id}`}>{resturant.name}</Link>
            <br />
            <span>{resturant.address1}</span>
            <br />
            <span>{resturant.address2}</span>
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Resturants;
