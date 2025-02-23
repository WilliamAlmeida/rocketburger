"use client";

import { getCategories, getProducts } from "@/data/menu";
import { ProductCard } from "@/components/ui/product-card";
import { useState, useEffect } from "react";
import { Product, Category } from "@/types/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hourglass, Instagram, MapPin, Phone } from "lucide-react";
import { BusinessHours } from "@/components/ui/business-hours";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadCategories() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
    loadCategories();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-50 text-center">ROCKET BURGER</h1>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row gap-3 justify-around lg:items-center pt-3">
            <Link href="https://wa.me/5512982184879?text=**Site**\nOi, gostaria de realizar um pedido." target="_blank" className="text-xs hover:underline flex gap-x-2 items-center">
              <Phone className="inline-block w-5 h-5" />(12) 98218-4879
            </Link>
            <Link href="https://maps.google.com/?q=Rocket+Burger+Rua Rubens Rangel, 195, Marataizes - Es" target="_blank" className="text-xs hover:underline flex gap-x-2 items-center">
              <MapPin className="inline-block w-5 h-5" />Rua Rubens Rangel, 195, Marataizes - Es
            </Link>
            <button onClick={() => setIsDialogOpen(true)} className="text-xs hover:underline flex gap-x-2 items-center">
              <Hourglass className="inline-block w-5 h-5" />Horários
            </button>
            <Link href="https://www.instagram.com/rocketburger.es" target="_blank" className="text-xs hover:underline flex gap-x-2 items-center">
              <Instagram className="inline-block w-5 h-5" />@rocketburger.es
            </Link>
          </div>
        </div>
      </header>

      <BusinessHours isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className="select-none"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.slug ? "default" : "outline"}
              className="select-none"
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {isLoading ? (
            <p>Carregando produtos...</p>
          ) : filteredProducts.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                // onSelect={setSelectedProduct}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
