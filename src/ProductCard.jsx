function ProductCard({ baseName, baseDescription, id, handleAddItemToCart }) {
  return (
    <li>
      <div className="itemCard">
        <h2>{baseName}</h2>
        <p>{baseDescription}</p>
        <button
          onClick={() => {
            handleAddItemToCart(id);
          }}
        >
          Add To Cart
        </button>
      </div>
    </li>
  );
}

export default ProductCard;
