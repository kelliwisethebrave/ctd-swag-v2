import ctdLogo from "./assets/mono-blue-logo.svg";
import "./App.css";
import inventoryData from "./assets/inventory.json";
import { useState } from "react";

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);

  return (
    <main>
      <div className="coming-soon">
        <h1>CTD Swag</h1>
        <div style={{ height: 100, width: 100 }}>
          <img src={ctdLogo} alt="Code The Dream Logo" />
        </div>
        <h2>Coming Soon...</h2>
      </div>
      <ul>
        {inventory.map((item) => {
          return (
            <li key={item.id}>
              <div className="itemCard">
                <h2>{item.baseName}</h2>
                <p>{item.baseDescription}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
