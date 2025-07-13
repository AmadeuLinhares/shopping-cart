import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  EditCartProduct,
  ProductsInCart,
} from "@/http/repositories/interfaces/cart";
import { formatUSD } from "@/lib/utils";

interface CartCardProps extends ProductsInCart {
  handleDeleteProduct(productId: string): void;
  handleEditProduct(data: EditCartProduct): void;
}

export function CartCard({
  name,
  price,
  id,
  amount,
  handleDeleteProduct,
  handleEditProduct,
}: CartCardProps) {
  return (
    <Card className="w-[280px] h-min" key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardAction>
          <Trash
            onClick={() => handleDeleteProduct(id)}
            className="w-5 h-5 text-gray-700"
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="text-2xl">{formatUSD(price)}</Label>
        </div>
      </CardContent>
      <CardFooter className="flex-row gap-2">
        <Button
          onClick={() =>
            handleEditProduct({
              action: "REMOVE",
              productId: id,
            })
          }
          type="button"
        >
          -
        </Button>
        <div>
          <Label>{amount}</Label>
        </div>
        <Button
          onClick={() =>
            handleEditProduct({
              action: "ADD",
              productId: id,
            })
          }
          type="button"
        >
          +
        </Button>
      </CardFooter>
    </Card>
  );
}
