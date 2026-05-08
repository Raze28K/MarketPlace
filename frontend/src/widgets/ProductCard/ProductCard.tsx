import type { Item } from "../../entities/product/model/types";
import { useState } from "react";

export default function Card({ product }: { product: Item }) {
  const [value, setValue] = useState("");

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        overflow-hidden
        hover:shadow-xl
        transition
        duration-300
        border
      "
    >
      {/* Image */}
      <div className="h-60 overflow-hidden bg-gray-100">
        <img
          src={product.images}
          alt={product.title}
          className="
            w-full
            h-full
            object-cover
            hover:scale-105
            transition
            duration-300
          "
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Select */}
        <div className="mt-4">
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-3
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="">Выберите категорию</option>

            <option value={product.rubric_name}>
              {product.rubric_name}
            </option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-2xl font-bold text-blue-600">
            ${product.price}
          </p>

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-xl
              transition
            "
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}