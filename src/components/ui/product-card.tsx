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

export function ProductCard({ name, price, stock, id }: Product) {
  return (
    <Card className="w-[280px]" key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Stock: {stock}</CardDescription>
        <CardAction>
          <ShoppingCart className="w-5 h-5 text-gray-700" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <Label>{price}</Label>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full">
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
