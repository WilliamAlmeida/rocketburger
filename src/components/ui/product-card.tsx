import { Product } from "@/types/menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import Image from "next/image";
import { Badge } from "./badge";
import { Button } from "./button";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.promotionalPrice && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            Promoção
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{product.name}</span>
          <div className="text-right">
            {product.promotionalPrice ? (
              <>
                <span className="text-sm line-through text-muted-foreground">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-lg font-bold text-red-500 ml-2">
                  {formatCurrency(product.promotionalPrice)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full"
          onClick={() => onSelect(product)}
        >
          Adicionar ao Pedido
        </Button>
      </CardContent>
    </Card>
  );
}
