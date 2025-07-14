import { useGetInvoice } from "@/queries/useGetInvoice/useGetInvoice";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { formatUSD } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { toast } from "sonner";

export const PurchaseSummary = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetInvoice();

  if (isLoading) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-4 w-[100%] bg-primary" />
        <Skeleton className="h-4 w-[100%] bg-primary" />
        <Skeleton className="h-4 w-[100%] bg-primary" />
        <div className="flex justify-center items-center">
          <Skeleton className="h-4 w-[50%] bg-primary" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid gap-4 justify-center items-center h-full">
        <p className="text-gray-800 font-semibold">
          Please log in to see the value of your purchase and complete it.
        </p>
        <Button onClick={() => router.push("/login")}>Login</Button>
      </div>
    );
  }

  return (
    <div className="h-full grid gap-4 auto-rows-min ">
      <div className="flex justify-center items-center">
        <h3 className="text-2xl">Resume</h3>
      </div>

      <div>
        <div className="grid gap-4">
          <p>
            Total:{" "}
            <span className="text-gray-700 font-bold">
              {formatUSD(data?.invoice?.total)}
            </span>
          </p>
        </div>
        <div>
          <p>
            Discount:{" "}
            <span className="text-gray-700 font-bold">
              {formatUSD(data?.invoice?.discount)}
            </span>
          </p>
        </div>
        <div>
          <p>
            Total to pay:{" "}
            <span className="text-gray-700 font-bold">
              {formatUSD(data?.invoice?.totalToPay)}
            </span>
          </p>
        </div>

        <div className="mt-8 w-full px-4">
          <Button
            onClick={() =>
              toast.success(
                "congratulations, purchase completed successfully :D ",
              )
            }
            className="w-full"
          >
            Complete purchase
          </Button>
        </div>
      </div>
    </div>
  );
};
