import { Link, useParams } from "react-router";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ products, handleAddItemToCart }) => {
  const { id } = useParams();

  const [product] = products.filter((product) => {
    return product.id === id;
  });

  return (
    <div>
      {product ? (
        <>
          <h2>{product.baseName}</h2>
          <p>{product.baseDescription}</p>

          <>
            {product.variants.length > 1 && <h3>Variations...</h3>}
            <div className={styles.variants}>
              {product.variants.map((v) => {
                return (
                  <ProductDetailsCard
                    key={v.id}
                    product={v}
                    handleAddItemToCart={handleAddItemToCart}
                  />
                );
              })}
            </div>
          </>
        </>
      ) : (
        <h2>Nothing Found</h2>
      )}
      <div className="buttonGroup">
        <Link className="linkButton" to="/">
          Back to Store
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
