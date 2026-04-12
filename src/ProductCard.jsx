function ProductCard({ baseName, baseDescription }) {
  return (
    <li>
      <div className="itemCard">
        <h2>{baseName}</h2>
        <p>{baseDescription}</p>
      </div>
    </li>
  );
}

export default ProductCard;
