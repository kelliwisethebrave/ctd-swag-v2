import ctdLogo from "../assets/mono-blue-logo.svg";
import shoppingCart from "../assets/icons/shoppingCart.svg";
import { useEffect } from "react";
import { Link } from "react-router";

function Header({
  cart,
  handleOpenCart,
  handleOpenAuthForm,
  user,
  handleLogOut,
}) {
  function getItemCount() {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
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
    <div className="siteBranding">
      <h1>CTD Swag</h1>
      <div style={{ height: 100, width: 100 }}>
        <img src={ctdLogo} alt="Code The Dream Logo" />
      </div>
      <div className="userActions">
        {user.id ? (
          <>
            <Link to="/account" className="linkButton">
              <span>Hi, {user.firstName}</span>
            </Link>
            <button className="authButton signOut" onClick={handleLogOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthForm("login")}
            >
              Log in
            </button>{" "}
            or{" "}
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthForm("register")}
            >
              Register
            </button>
          </>
        )}
      </div>
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
