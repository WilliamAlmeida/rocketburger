export interface AddOn {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface AddOnGroup {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  maxChoices?: number;
  addOns: AddOn[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  promotionalPrice?: number;
  category: string;
  available: boolean;
  url: string;
  addOnGroups: AddOnGroup[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  order?: number;
}
