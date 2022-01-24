import { useNavigate } from 'react-router-dom';
import '../App.scss';
import { TResturantMenuItem, TShoppingCart } from '../models';
import { getTotalPrice } from '../shared';

function ShoppingCart({ shoppingCart, removeResturantItemFromCart }: { shoppingCart: TShoppingCart; removeResturantItemFromCart: Function }) {
  const navigate = useNavigate();

  return shoppingCart.cart.length > 0 ? (
    <>
      <h2>I Varukorgen</h2>
      {shoppingCart.cart.map((resturantMenuItem: TResturantMenuItem, index: number) => {
        return (
          <div key={`shoppingCartItem${index}`}>
            <span>
              {resturantMenuItem.name} - {resturantMenuItem.price}
            </span>
            <button onClick={() => removeResturantItemFromCart(index)}>Remove from cart</button>
          </div>
        );
      })}
      <br />
      <span>Total: {getTotalPrice(shoppingCart.cart)} kr</span>
      <br />
      <button onClick={() => navigate(`/checkout`)}>Gå till kassan</button>
    </>
  ) : (
    <span>Inget i varukorgen</span>
  );
}

export default ShoppingCart;
