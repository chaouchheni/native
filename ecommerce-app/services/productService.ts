import api from './api'; 
import { Product } from '../types/product'; 


export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

// Récupérer un produit par son ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// Créer un nouveau produit
export const createProduct = async (product: Omit<Product, 'id'>): Promise<number> => {
  const response = await api.post<{ message: string; id: number }>('/products', product);
  return response.data.id;
};

// Mettre à jour un produit
export const updateProduct = async (id: number, product: Omit<Product, 'id'>): Promise<string> => {
  const response = await api.put<{ message: string }>(`/products/${id}`, product);
  return response.data.message;
};

// Supprimer un produit
export const deleteProduct = async (id: number): Promise<string> => {
  const response = await api.delete<{ message: string }>(`/products/${id}`);
  return response.data.message;
};
