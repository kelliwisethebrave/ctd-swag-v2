import { Link } from "react-router";
import CheckOutItem from "./CheckoutItem";

function Checkout({ cart }) {
  function getTotal() {
    return cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }
  return (
    <>
      <h2>Checkout Page</h2>
      <ul>
        {cart.map((item) => {
          return <CheckOutItem key={item.id} item={item} />;
        })}
      </ul>
      <h2>Total: {getTotal()}</h2>
      {cart.length < 1 ? <p>cart is empty</p> : null}
      <div className="buttonGroup">
        <Link className="linkButton" to="/">
          Go Back
        </Link>
        {/* permanently disabled since this is just a demo*/}
        <button disabled>Checkout</button>
      </div>
    </>
  );
}

export default Checkout;
