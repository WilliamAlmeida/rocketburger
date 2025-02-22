import { Category, Product } from "@/types/menu";

export const categories: Category[] = [
  { id: "1", name: "Burgers", slug: "burgers" },
  { id: "2", name: "Bebidas", slug: "bebidas" },
  { id: "3", name: "Acompanhamentos", slug: "acompanhamentos" },
  { id: "4", name: "Sobremesas", slug: "sobremesas" },
];

const NEW_IMAGE_URL = "https://ibox.delivery/build/assets/skeleton-DR25ZlA_.avif";

export const products: Product[] = [
  {
    id: "1",
    name: "Rocket Classic Burger",
    description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate e molho especial",
    image: "https://ibox.delivery/uploads/adm/empresas/111/produtos/7104_3572-600x600.jpg",
    price: 32.90,
    promotionalPrice: 29.90,
    category: "burgers",
    available: true,
    addOnGroups: [
      {
        id: "1",
        name: "Ponto da carne",
        required: true,
        multiple: false,
        addOns: [
          { id: "1", name: "Mal passado", price: 0, available: true },
          { id: "2", name: "Ao ponto", price: 0, available: true },
          { id: "3", name: "Bem passado", price: 0, available: true },
        ],
      },
      {
        id: "2",
        name: "Adicionais",
        required: false,
        multiple: true,
        maxChoices: 3,
        addOns: [
          { id: "4", name: "Bacon extra", price: 4.90, available: true },
          { id: "5", name: "Queijo extra", price: 3.90, available: true },
          { id: "6", name: "Cebola caramelizada", price: 2.90, available: true },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Refrigerante Coca-Cola 350ml",
    description: "Lata 350ml",
    image: NEW_IMAGE_URL,
    price: 4.90,
    promotionalPrice: 0,
    category: "bebidas",
    available: true,
    addOnGroups: [],
  },
];
