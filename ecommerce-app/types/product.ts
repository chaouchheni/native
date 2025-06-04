export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'vêtements' | 'chaussures' | 'sacs';
  image: string;
}

