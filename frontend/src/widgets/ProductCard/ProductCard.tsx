import type { Item } from "../../entities/product/model/types";
import { useState } from "react";

export default function Card({ product }: { product: Item }) {
  const [value, setValue] = useState("");

  const images = JSON.parse(product.images);

  return (
    <div>
      <img src={images[0]} alt="" />

      <h1>{product.title}</h1>
      <p>{product.description}</p>

      <select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">Выбери</option>
        <option value={product.rubric_name}>
          {product.rubric_name}
        </option>
      </select>

      <p>{product.price}</p>
    </div>
  );
}