import { useEffect, useState } from "react";
import type { Item } from "../../entities/product/model/types";
import Card from "../../widgets/ProductCard/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Item[]>([]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        title: "Товар 1",
        description: "Описание 1",
        price: 1000,
        images: JSON.stringify(["https://via.placeholder.com/150"]),
        rubric_name: "Категория",
      },
      {
        id: 2,
        title: "Товар 2",
        description: "Описание 2",
        price: 2000,
        images: JSON.stringify(["https://via.placeholder.com/150"]),
        rubric_name: "Категория",
      },
    ]);
  }, []);

  return (
    <div>
      {products.map((item) => (
        <Card key={item.id} product={item} />
      ))}
    </div>
  );
}