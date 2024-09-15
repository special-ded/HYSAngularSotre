export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface CreateProduct {
  name: string;
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
