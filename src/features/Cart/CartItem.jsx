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
              value={item.itemCount}
              onChange={(event) => handleUpdateField({ event, id: item.id })}
            />
          </p>
        </label>
        <p>Subtotal: ${(item.price * item.itemCount).toFixed(2)}</p>
      </div>
    </li>
  );
}

export default CartItem;
