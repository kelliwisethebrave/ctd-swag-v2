import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

function ProductList({ inventory, children, handleAddItemToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const workingProducts = [];
    inventory.forEach((item) => {
      if (!item.inStock) {
        return;
      }
      if (
        !workingProducts.find(
          (productItem) => productItem.baseName === item.baseName,
        )
      ) {
        workingProducts.push({
          baseName: item.baseName,
          price: item.price,
          baseDescription: item.baseDescription,
          variants: [{ ...item }],
        });
      } else {
        const index = workingProducts.findIndex(
          (productItem) => productItem.baseName === item.baseName,
        );
        workingProducts[index].variants.push({ ...item });
      }
    });
    setProducts([...workingProducts]);
  }, [inventory]);

  return (
    <ul className="productList">
      {children}{" "}
      {/*this location guarantees that this list item will be first*/}
      {products.map((product) => {
        return (
          <ProductCard
            key={product.baseName}
            //id={item.id}
            product={product}
            handleAddItemToCart={handleAddItemToCart}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
