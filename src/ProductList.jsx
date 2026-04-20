import ProductCard from "./ProductCard";

function ProductList({ inventory, children, handleAddItemToCart }) {
  return (
    <ul>
      {children}{" "}
      {/*this location guarantees that this list item will be first*/}
      {inventory.map((item) => {
        return (
          <ProductCard
            key={item.id}
            id={item.id}
            baseName={item.baseName}
            baseDescription={item.baseDescription}
            handleAddItemToCart={handleAddItemToCart}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
