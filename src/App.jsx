import "./App.css";
import inventoryData from "./assets/inventory.json";
import { useState, useEffect, useRef } from "react";
import Header from "./layout/Header.jsx";
import ProductList from "./features/ProductList/ProductList.jsx";
import ProductCard from "./features/ProductList/ProductCard.jsx";
import Cart from "./features/Cart/Cart.jsx";
import Footer from "./layout/Footer.jsx";

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setInventory([...inventoryData.inventory]);
  }, []); //<--- don't forget the dependency array or you can end up
  // with an infinite loop!!

  function addItemToCart(item) {
    setCart([...cart, item]);
  }

  function handleAddItemToCart(id) {
    const inventoryItem = inventory.find((item) => item.id === id);
    // if no inventory items are found,
    // we want to prevent the app from crashing
    // by exiting this function now

    if (!inventoryItem) {
      console.error("cart error: item not found");
      return;
    }

    const itemToUpdate = cart.find((item) => item.id === id);
    let updatedCartItem;
    if (itemToUpdate) {
      updatedCartItem = {
        ...itemToUpdate,
        itemCount: itemToUpdate.itemCount + 1,
      };
    } else {
      updatedCartItem = { ...inventoryItem, itemCount: 1 };
    }
    setCart([...cart.filter((item) => item.id !== id), updatedCartItem]);
  }
  // create a new object, spread the contents of the item selected
  // and add a `cartItemId`

  function removeItemFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart([...updatedCart]);
  }

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

  function handleCloseCart() {
    //prevents re-render if unchanged
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  }

  function handleOpenCart() {
    //prevents re-render if unchanged
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  }

  return (
    <>
      <main>
        <Header cart={cart} handleOpenCart={handleOpenCart} />
        <ProductList
          handleAddItemToCart={handleAddItemToCart}
          inventory={inventory}
        >
          {/*{promoteItem()}*/}
          {/*invoking promoted item between the tags inserts the ItemCard*/}
        </ProductList>
        {/* isCartOpen has to be true for the cart to be rendered*/}
        {isCartOpen && (
          <Cart
            cart={cart}
            setCart={setCart}
            handleCloseCart={handleCloseCart}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
