import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Product } from "@/http/repositories/interfaces/products";
import { formatUSD } from "@/lib/utils";

interface ProductCardProps extends Product {
  addCart(data: Product, redirectToCart: boolean): void;
}

export function ProductCard({
  name,
  price,
  stock,
  id,
  addCart,
}: ProductCardProps) {
  return (
    <Card className="w-[280px]" key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Stock: {stock}</CardDescription>
        <CardAction>
          <ShoppingCart
            data-testid="add-to-cart-button"
            onClick={() => addCart({ id, name, price, stock }, false)}
            className="w-5 h-5 text-gray-700"
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <Label>{formatUSD(price)}</Label>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="button"
          className="w-full"
          data-testid="buy-product-button"
          onClick={() => addCart({ id, name, price, stock }, true)}
        >
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
