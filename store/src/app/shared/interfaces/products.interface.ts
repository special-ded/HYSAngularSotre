export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: '';
}

export interface CreateProduct {
  name: string;
  author: string;
  price: number;
  description: string;
  extraInfo: {
    ololo: number;
    image: string;
  };
}

export interface UpdateProduct {
  price: number;
  extraInfo: {
    Bluetooth: string;
    image: string;
  };
}
