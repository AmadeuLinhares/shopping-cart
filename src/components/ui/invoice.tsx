import { PurchaseSummary } from "./purchase-summary";

export const Invoice = () => {
  return (
    <div className="p-5 rounded-2xl w-full min-w-[280px] max-w-[380px] h-[400px] bg-gray-50">
      <PurchaseSummary />
    </div>
  );
};
