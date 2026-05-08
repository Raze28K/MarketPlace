import { useEffect, useState } from "react";
import type { Item } from "../../entities/product/model/types";
import Card from "../../widgets/ProductCard/ProductCard";
import { getProducts } from "../../features/product/api/productApi";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState<Item[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data.items);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-800">
            Каталог товаров
          </h1>

          <p className="text-gray-500 mt-1">
            Найдите нужный товар
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* Category */}
          <select
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option>Все категории</option>
            <option>Электроника</option>
            <option>Одежда</option>
            <option>Дом</option>
          </select>

          {/* Sort */}
          <select
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option>Сортировка</option>
            <option>Сначала дешёвые</option>
            <option>Сначала дорогие</option>
          </select>

          {/* Button */}
          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              transition
            "
          >
            Найти
          </button>
          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              transition
            "
          >
            Создать карту товара
          </button>
          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              transition
            "
          >
            Мои товары
          </button>
          <Link
            to="/profile"
            className="bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              transition"
          >
            Мой аккаунт
          </Link>
          <Link
            to="/products"
            className="bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              transition"
          >
            Стандартный каталог
          </Link>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Товары не найдены
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {products.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}