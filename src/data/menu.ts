import { Category, Product } from "@/types/menu";
import dotenv from "dotenv";
import { IBoxDeliveryService } from "@/services/iboxdelivery.service";

dotenv.config();
const iboxServiceApiKey = process.env.IBOX_SERVICE_API_KEY;

export async function getCategories(): Promise<Category[]> {
  try {
    const iboxService = new IBoxDeliveryService(iboxServiceApiKey || '');
    const iboxCategories = await iboxService.getCategories(23);
    
    return iboxCategories.map(category => ({
      id: category.id.toString(),
      name: category.nome,
      slug: category.nome.toLowerCase().replace(/\s+/g, '-'),
      image: category.imagem,
      order: category.ordem,
    })).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const iboxService = new IBoxDeliveryService(iboxServiceApiKey || '');
    const iboxProducts = await iboxService.getProdutos(23);

    console.log(iboxProducts.map(product => ({
      id: product.id.toString(),
      name: product.nome,
      description: product.descricao,
      image: product.imagem || 'https://ibox.delivery/build/assets/skeleton-DR25ZlA_.avif',
      price: product.preco,
      promotionalPrice: product.preco_promocao,
      category: mapCategoryId(product.categoria_id),
      available: product.status,
      url: product.url,
      addOnGroups: [], // You might want to map additional product data here
    })));
    
    return iboxProducts.map(product => ({
      id: product.id.toString(),
      name: product.nome,
      description: product.descricao,
      image: product.imagem || 'https://ibox.delivery/build/assets/skeleton-DR25ZlA_.avif',
      price: product.preco,
      promotionalPrice: product.preco_promocao,
      category: mapCategoryId(product.categoria_id),
      available: product.status,
      url: product.url,
      addOnGroups: [], // You might want to map additional product data here
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

function mapCategoryId(categoryId: number): string {
  const categoryMap: Record<number, string> = {
    1: 'burgers',
    2: 'bebidas',
    3: 'acompanhamentos',
    4: 'sobremesas',
  };
  return categoryMap[categoryId] || 'outros';
}