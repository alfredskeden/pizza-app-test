import { useNavigate } from 'react-router-dom';
import '../App.scss';
import { TResturantMenuItem, TShoppingCart } from '../shared/models';
import { getTotalPrice } from '../shared/shared';

function ShoppingCart({ shoppingCart, removeResturantItemFromCart }: { shoppingCart: TShoppingCart; removeResturantItemFromCart: Function }) {
  const navigate = useNavigate();

  return (
    <div className="shopping-cart" tabIndex={0}>
      {shoppingCart.cart.length > 0 ? (
      <>
      <h3>Varukorg ({shoppingCart.cart.length} st)</h3>
      <div className="cart-items">
        {shoppingCart.cart.sort((a, b) => a.id - b.id).map((resturantMenuItem: TResturantMenuItem, index: number) => {
          return (
            <div className="flex row" key={`shoppingCartItem${index}`}>
              <span className="mr-1">{resturantMenuItem.id}. {resturantMenuItem.name} - {resturantMenuItem.price} kr</span>
              <button className="btn removeFromCart" onClick={() => removeResturantItemFromCart(index)}>X</button>
            </div>
          );
        })}
        <br />
        <span>Total: {getTotalPrice(shoppingCart.cart)} kr</span>
        <br />
        <button className="btn" onClick={() => navigate(`/checkout`)}>Gå till kassan</button>
        </div>
      </>
      ) : (<h3>Inget i varukorgen</h3>)}
    </div>
  )
}

export default ShoppingCart;
