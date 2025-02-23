import axios from 'axios';
import FAKE_PRODUCTS from '../mocks/iboxDelivery/products.json';
import FAKE_CATEGORIES from '../mocks/iboxDelivery/categories.json';

interface IBoxProduct {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  preco_promocao: number;
  imagem: string;
  categoria_id: number;
  status: boolean;
  url: string;
}

interface iBoxCategory {
  id: number;
  nome: string;
  imagem: string;
  ordem: number;
}

export class IBoxDeliveryService {
  private storeSlug = 'rocketburger';
  private baseUrl = 'https://ibox.delivery';
  private token: string;
  private isLocal: boolean;

  constructor(token: string) {
    this.token = token;
    this.isLocal = true; //process.env.APP_ENV == 'local';
  }

  async getProdutos(empresaId: number): Promise<IBoxProduct[]> {
    try {
      // This is a mock implementation to avoid making requests to the real API
      if (this.isLocal) {

        const products = FAKE_PRODUCTS.data.map((product: any) => ({
          id: product.id,
          nome: product.descricao,
          descricao: product.detalhes,
          preco: parseFloat(product.preco_varejo),
          preco_promocao: parseFloat(product.preco_promocao),
          imagem: product.imagens.length > 0 ? `${this.baseUrl}${product.imagens[0].url}` : '',
          categoria_id: 2,
          status: true,
          url: `${this.baseUrl}/v2/${this.storeSlug}/${product.descricao.toLowerCase().replace(/\s+/g, '-')}`
        }));

        return Promise.resolve(products);
      }

      // This is the real implementation that fetches products from the API
      const response = await axios.get(`${this.baseUrl}/empresa/produtos`, {
        params: {
          empresa_id: empresaId
        },
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });

      return response.data.data;
    } catch (error: any) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getCategories(empresaId: number): Promise<iBoxCategory[]> {
    try {
      // This is a mock implementation to avoid making requests to the real API
      if (this.isLocal) {

        const categories = FAKE_CATEGORIES.data.map((category: any) => ({
          id: category.id,
          nome: category.titulo,
          imagem: category.imagem ? `${this.baseUrl}${category.imagem.url}` : '',
          ordem: category.ordem
        }));

        return Promise.resolve(categories);
      }

      // This is the real implementation that fetches categories from the API
      const response = await axios.get(`${this.baseUrl}/empresa/categorias`, {
        params: {
          empresa_id: empresaId
        },
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });

      return response.data.data;
    } catch (error: any) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }
}