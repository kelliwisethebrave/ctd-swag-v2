import "./App.css";
import inventoryData from "./assets/inventory.json";
import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import ProductList from "./ProductList.jsx";
import ProductCard from "./ProductCard.jsx";

function App() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setInventory([...inventoryData.inventory]);
  }, []); //<--- don't forget the dependency array or you can end up
  // with an infinite loop!!

  function addItemToCart(item) {
    setCart([...cart, item]);
  }

  function handleAddItemToCart(id) {
    const target = inventory.find((item) => item.id === id);
    // if no inventory items are found,
    // we want to prevent the app from crashing
    // by exiting this function now

    if (!target) {
      console.error("cart error: item not found");
      return;
    }
    // create a new object, spread the contents of the item selected
    // and add a `cartItemId`

    const cartItem = { ...target, cartItemId: Date.now() };
    console.log(cartItem);
    setCart([...cart, cartItem]);
  }

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

  return (
    <main>
      <Header cart={cart} />
      <ProductList
        handleAddItemToCart={handleAddItemToCart}
        inventory={inventory}
      >
        {/*{promoteItem()}*/}
      </ProductList>
      {/*invoking promoted item between the tags inserts the ItemCard*/}
    </main>
  );
}

export default App;
