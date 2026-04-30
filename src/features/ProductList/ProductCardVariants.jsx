function ProductCardVariants({ variants, closeVariants, handleAddItemToCart }) {
  return (
    <div className="productVariantsWrapper">
      <ul>
        {variants.map((variant) => {
          return (
            <li key={variant.id} className="productVariant">
              <div className="variantPreview">
                <img
                  src={`/product-images/${variant.image}`}
                  alt={variant.variantDescription}
                />
                <p>${variant.price}</p>
              </div>
              <div className="variantDetails">
                <h3>{variant.variantName}</h3>
                <p>{variant.variantDescription}</p>
                <button
                  onClick={() => {
                    handleAddItemToCart(variant.id);
                    closeVariants();
                  }}
                >
                  Add to cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button
        className="variantsCloseButton"
        type="button"
        onClick={closeVariants}
      >
        Close
      </button>
    </div>
  );
}

export default ProductCardVariants;
