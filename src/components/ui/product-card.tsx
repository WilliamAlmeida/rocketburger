import { Product } from "@/types/menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import Image from "next/image";
import { Badge } from "./badge";
import { Button } from "./button";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover select-none"
        />
        {product.promotionalPrice && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            Promoção
          </Badge>
        )}
      </div>
      <CardHeader className="px-3">
        <CardTitle className="flex justify-between items-center gap-x-1">
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
        <CardDescription className="text-xs max-h-20 overflow-y-auto scroll-custom">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button 
          className="w-full select-none font-semibold italic bg-green-400 active:bg-green-700 transition-colors hover:text-white"
          onClick={() => router.push(product.url)}
        >
          Realizar pedido
        </Button>
      </CardContent>
    </Card>
  );
}
