import ctdLogo from "../assets/mono-blue-logo.svg";
import shoppingCart from "../assets/icons/shoppingCart.svg";
import { useEffect } from "react";

function Header({ cart, handleOpenCart }) {
  function getItemCount() {
    return cart.reduce((acc, item) => acc + item.itemCount, 0);
  }
  {
    /*useEffect(() => {
    cart.forEach((item) => {
      console.log(item.baseName, item.cartItemId);
    });
    if (cart.length > 0) {
      console.log("--end of cart---");
    }
  });*/
  }

  return (
    <div className="coming-soon">
      <h1>CTD Swag</h1>
      <div style={{ height: 100, width: 100 }}>
        <img src={ctdLogo} alt="Code The Dream Logo" />
      </div>
      <h2>Coming Soon...</h2>
      <div className="shoppingCart">
        <button
          aria-label="Shopping cart"
          type="button"
          onClick={handleOpenCart}
        >
          <img src={shoppingCart} alt="shopping cart" />
          <p className="cartCount">{getItemCount()}</p>
        </button>
      </div>
    </div>
  );
}

export default Header;
