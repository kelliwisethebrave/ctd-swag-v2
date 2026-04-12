import "./App.css";
import inventoryData from "./assets/inventory.json";
import { useState } from "react";
import Header from "./Header";
import ProductList from "./ProductList";

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);

  return (
    <main>
      <Header />
      <ProductList inventory={inventory} />
    </main>
  );
}

export default App;
