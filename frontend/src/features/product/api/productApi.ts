import { baseApi } from "../../../shared/api/baseApi"

export interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  image: string;
}

export const getProducts = async () => {
  const response = await baseApi.get("/items");
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await baseApi.delete(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id: number, data: CreateProductDto) => {
  const response = await baseApi.put(`/products/${id}`, data);
  return response.data;
};