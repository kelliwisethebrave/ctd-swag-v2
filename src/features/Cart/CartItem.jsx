import placeholder from "../../assets/placeholder.png";

function CartItem({ item, handleUpdateField }) {
  return (
    <li className="cartListItem">
      <img src={placeholder} alt="" />
      <h2>{item.baseName}</h2>
      {item.variantName !== "Default" ? <p>{item.variantName}</p> : null}
      <div className="cartListItemSubtotal">
        <label>
          <p>
            Count:{" "}
            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={(event) =>
                handleUpdateField({ event, id: item.productId })
              }
            />
          </p>
        </label>
        <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </li>
  );
}

export default CartItem;
