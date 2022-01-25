import '../App.scss';
import { Link } from 'react-router-dom';
import { TResturant } from '../shared/models';
import Loading from '../component/loading';

function Resturants({ geoloactionActive, closestReturant, resturants, geolocationText }:
                    { geoloactionActive: boolean; closestReturant: TResturant | undefined; resturants: Array<TResturant> | undefined; geolocationText: string | undefined }): JSX.Element {
  
  /** If no resturants show loading component */
  if (!resturants) {
    return <Loading>Laddar...</Loading>;
  }

  return (
    <div className="mt-3">
      {geoloactionActive && !geolocationText ? (
        <>
          <h2>{closestReturant?.name} är närmast</h2>
          <span>{closestReturant?.name}</span>
          <br />
          <span>{closestReturant?.address1}</span>
          <br />
          <span>{closestReturant?.address2}</span>
          <br />
          <Link to={`/${closestReturant?.id}`}>Visa meny</Link>
        </>
      ) : (<h2>{geolocationText}</h2>)}

      <h2>Alla pizzerior:</h2>
      {resturants.map((resturant: TResturant, index: number) => {
        return (
          <div key={`resturants${index}`}>
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
    </div>
  );
}

export default Resturants;
