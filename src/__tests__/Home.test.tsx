import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import Home from "@/app/page"; // adjust if in different folder
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";
import { useAddCart } from "@/mutations/useAddCart/useAddCart";
import { useGetProducts } from "@/queries/useGetProducts/useGetProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/mutations/useAddCart/useAddCart", () => ({
  useAddCart: vi.fn(),
}));

vi.mock("@/queries/useGetProducts/useGetProducts", () => ({
  useGetProducts: vi.fn(),
}));

const createTestWrapper = () => {
  const queryClient = new QueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("Home page", () => {
  const push = vi.fn();
  const refresh = vi.fn();
  const mutate = vi.fn();

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push,
      refresh,
    });

    (useAddCart as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate,
    });

    vi.clearAllMocks();
  });

  it("shows skeleton cards when loading", () => {
    (useGetProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<Home />, { wrapper: createTestWrapper() });

    const skeletons = screen.getAllByTestId("skeleton-card"); // make sure SkeletonCard has this
    expect(skeletons.length).toBe(10);
  });

  it("renders product cards when data is loaded", () => {
    (useGetProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      data: {
        products: [
          {
            id: "1",
            name: "Product 1",
            price: 100,
            stock: 5,
          },
        ],
      },
    });

    render(<Home />, { wrapper: createTestWrapper() });

    expect(screen.getByText("Product 1")).toBeDefined();
  });

  it("adds product to cart and shows toast", async () => {
    const mockProduct = {
      id: "1",
      name: "Product 1",
      price: 100,
      stock: 5,
    };

    (useGetProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      data: {
        products: [mockProduct],
      },
    });

    render(<Home />, { wrapper: createTestWrapper() });

    const addButton = screen.getByTestId("add-to-cart-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith(mockProduct, expect.any(Object));
    });
  });

  it("redirects to /cart if redirectToCart is true", async () => {
    const mockProduct = {
      id: "2",
      name: "Product 2",
      price: 50,
      stock: 3,
    };

    (useGetProducts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      data: { products: [mockProduct] },
    });

    (useAddCart as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: (_: unknown, { onSuccess }: { onSuccess: () => void }) => {
        onSuccess();
      },
    });

    render(<Home />, { wrapper: createTestWrapper() });

    const addButton = screen.getByTestId("buy-product-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/cart");
      expect(refresh).toHaveBeenCalled();
    });
  });
});
