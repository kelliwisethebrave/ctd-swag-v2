import "./App.css";
//import inventoryData from "./assets/inventory.json";
import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router";
import Header from "./layout/Header.jsx";
import ProductList from "./features/ProductList/ProductList.jsx";
import ProductCard from "./features/ProductList/ProductCard.jsx";
import Cart from "./features/Cart/Cart.jsx";
import Dialog from "./shared/Dialog.jsx";
import Footer from "./layout/Footer.jsx";
import AuthForm from "./features/Auth/AuthForm.jsx";
import Account from "./pages/Account/Account.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import NotFound from "./pages/404/404.jsx";
import ProductDetails from "./pages/Product/ProductDetails.jsx";
import { useReducer } from "react";
import {
  //aliasing with `as` keeps the reducer and state easily identifiable
  initialState as cartInitialState,
  cartActions,
  reducer as cartReducer,
} from "./reducers/cart.reducer.js";

function App() {
  const [inventory, setInventory] = useState([]);
  //const [cart, setCart] = useState([]);
  //const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  //const [isCartSyncing, setIsCartSyncing] = useState(false);
  const [cartError, setCartError] = useState("");
  const [cartItemError, setCartItemError] = useState(false);
  const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    //old way setInventory([...inventoryData.inventory]);
    //goes with import inventoryData above
    (async () => {
      try {
        const resp = await fetch(`${baseUrl}/products`);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const products = await resp.json();
        console.log(products);
        setInventory([...products]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []); //<--- don't forget the dependency array or you can end up
  // with an infinite loop!!

  //function addItemToCart(item) {
  //  setCart([...cart, item]);
  //}

  async function handleAddItemToCart(id) {
    //setCart([...cart.filter((item) => item.productId !== id), updatedCartItem])    ;
    dispatch({ type: cartActions.addItem, id, inventory });
    //handleSyncCart(cartState.cart);
    if (!user.id) {
      //exit out of function to prevent anon fetches
      return;
    }

    if (user.id) {
      await handleSyncCart(cartState.cart);
    }
    //    try {
    //      await handleSyncCart(cartState.cart);
    //    } catch (error) {
    //      console.error(error);
    //    }
  }

  // create a new object, spread the contents of the item selected
  // and add a `cartItemId`

  //function removeItemFromCart(id) {
  //const updatedCart = cart.filter((item) => item.id !== id);
  //setCart([...updatedCart]);
  //}

  {
    /*function promoteItem() {
    return (
      <ProductCard
        id={999}
        baseName="Limited Edition Tee!"
        baseDescription="Special limited edition neon green shirt with a metallic Code the Dream Logo shinier than the latest front-end framework! Signed by the legendary Frank!"
        handleAddItemToCart={handleAddItemToCart}
      />
    );
  }*/
  }

  //useEffect(() => {
  //  handleSyncCart(cartState.cart);
  //}, [cartState.cart]);

  function handleCloseCart() {
    //prevents re-render if unchanged
    //if (isCartOpen) {
    //  setIsCartOpen(false);
    //}
    dispatch({ type: "close" });
    setAuthError("");
  }

  //function handleOpenCart() {
  //prevents re-render if unchanged
  //if (!isCartOpen) {
  //  setIsCartOpen(true);
  //  dispatch({ type: "open" });
  //}

  function handleCloseAuthForm() {
    setIsAuthFormOpen(false);
  }

  async function handleAuthenticate(credentials) {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/login`, options);
      if (!resp.ok) {
        //status will be 401 if authentication fails
        //we want to handle it differently than other errors
        if (resp.status === 401) {
          console.dir(resp.statusText);
          setAuthError("email or password is incorrect");
        }
        throw new Error(resp.status);
      }
      const userData = await resp.json();
      //assigning a new object that's more convenient to work with
      //this is a LOT of state update functions in a row!!
      //we fix this in lesson 11
      setUser({ ...userData.user, token: userData.token });
      //setCart([...userData.cartItems]);
      dispatch({ type: "update", cart: userData.cartItems });
      setAuthError("");
      setIsAuthenticating(false);
      setIsAuthFormOpen(false);
      console.dir(userData);
      console.log(userData);
      console.log(userData.cartItems);
    } catch (error) {
      setIsAuthenticating(false);
      console.log(error.message);
    }
  }

  async function handleRegister(user) {
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/register`, options);
      if (!resp.ok) {
        //status will be 401 if authentication fails
        //we want to handle it differently than other errors
        if (resp.status === 401) {
          //console.dir(resp);
          setAuthError("failed to create a new account");
        }
        throw new Error(resp.status);
      }
      //console.dir(resp);
      const userData = await resp.json();
      //assigning a new object that's more convenient to work with
      //this is a LOT of state update functions in arow!!
      //we fix this in week 11
      setUser({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        token: userData.token,
      });
      //console.log(userData);
      //console.log(setUser);
      setAuthError("");
    } catch (error) {
      //console.dir(error);

      console.log(error.message);
    } finally {
      setIsAuthenticating(false);
      setIsAuthFormOpen(false);
    }
  }

  function handleOpenAuthForm(option) {
    switch (option) {
      case "register":
        setIsRegistering(true);
        break;
      default:
        setIsRegistering(false);
        break;
    }
    setIsAuthFormOpen(true);
  }

  function handleLogOut() {
    setUser({});
    //setCart([]);
    dispatch({ type: "update", cart: [] });
  }

  const handleSyncCart = useCallback(
    async (workingCart) => {
      console.log("SYNC CALLED");
      console.log(workingCart);
      if (!user.id) {
        //setCart(workingCart);
        //dispatch replaces setCart here
        dispatch({ type: "update", cart: workingCart });
        return;
      }
      //setIsCartSyncing(true);
      dispatch({ type: "sync" });

      const payload = {
        cartItems: workingCart.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
      };
      const options = {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      try {
        const resp = await fetch(`${baseUrl}/cart`, options);
        if (!resp.ok) {
          console.log("resp not ok");
          if (resp.status === 401) {
            throw new Error("Not authorized. Please log in.");
          }
          const cartData = await resp.json();
          //cartData.error on all other errors from this endpoint
          if (cartData.error) {
            throw new Error(cartData.error);
          }
          //catch-all
          throw new Error("Error occurred while syncing.");
        }
        const cartData = await resp.json();
        //dispatch replaces setCart here
        //setCart([...cartData]);
        dispatch({ type: "update", cart: cartData });
        //clean up state variables
        //setIsCartSyncing(false);

        setCartError("");
      } catch (error) {
        console.error(error);
        //setCartError(error.message);
        dispatch({ type: "error", error: error.message });
        //setIsCartSyncing(false);
      } finally {
        dispatch({ type: "notSyncing" });
      }
    },
    [user.id, user.token, dispatch],
  );

  function handleCloseDialog() {
    setIsDialogOpen(false);
    //dispatchCartAction({ type: cartActions.dismissError });
  }

  return (
    <>
      {isDialogOpen && (
        <Dialog message={cartItemError} handleCloseDialog={handleCloseDialog} />
      )}

      <Header
        cart={cartState.cart}
        handleOpenCart={() => dispatch({ type: "open" })}
        //handleOpenAuthForm={() => setIsAuthFormOpen(true)}
        handleOpenAuthForm={handleOpenAuthForm}
        //new props
        handleLogOut={handleLogOut} //wipes out the user and cart values
        user={user} //used to tell if user logged in
      />
      {isAuthFormOpen && (
        <AuthForm
          handleCloseAuthForm={handleCloseAuthForm}
          handleAuthenticate={handleAuthenticate}
          isAuthenticating={isAuthenticating}
          authError={authError}
          isRegistering={isRegistering}
          handleRegister={handleRegister}
        />
      )}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                handleAddItemToCart={handleAddItemToCart}
                inventory={inventory}
              />
            }
          />
          {user.id && (
            <Route
              path="/account"
              element={<Account user={user} handleLogOut={handleLogOut} />}
            />
          )}
          <Route
            path="/checkout"
            element={<Checkout cart={cartState.cart} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/*{promoteItem()}*/}
          {/*invoking promoted item between the tags inserts the ItemCard
            </ProductList>*/}

          {/* isCartOpen has to be true for the cart to be rendered*/}
        </Routes>
      </main>
      {cartState.isCartOpen && (
        <Cart
          cart={cartState.cart}
          handleCloseCart={handleCloseCart}
          isCartSyncing={cartState.isCartSyncing}
          handleSyncCart={handleSyncCart}
          cartError={cartState.error}
        />
      )}

      <Footer />
    </>
  );
}

export default App;
