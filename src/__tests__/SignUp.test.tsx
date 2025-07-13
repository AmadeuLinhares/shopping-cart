import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SignUp from "@/app/sign-up/page";
const push = vi.fn();
const refresh = vi.fn();
const mutate = vi.fn((_data, { onSuccess }) => {
  onSuccess();
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    refresh,
  }),
}));

vi.mock("@/mutations/useSignUp/useSignUp", () => ({
  useSignUp: () => ({
    mutate,
    isPending: false,
  }),
}));

describe("SignUp page", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders all form fields", () => {
    render(<SignUp />);
    expect(screen.getByTestId("signup-password-input")).toBeDefined();
    expect(screen.getByTestId("signup-email-input")).toBeDefined();
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByTestId("signup-submit-button")).toBeDefined();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<SignUp />);
    fireEvent.click(screen.getByTestId("signup-submit-button"));

    await waitFor(() => {
      expect(screen.getAllByText(/field required/i)).toHaveLength(3);
      expect(mutate).not.toHaveBeenCalled();
    });
  });

  it("submits form successfully", async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByTestId("signup-email-input"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByTestId("signup-password-input"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("combobox"));
    const form = screen.getByTestId("signup-form");
    const vipOption = screen.getByTestId("role-vip");
    expect(vipOption).toBeDefined();
    fireEvent.click(vipOption);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith(
        {
          email: "user@example.com",
          password: "123456",
          role: ["VIP"],
        },
        expect.any(Object),
      );
      expect(push).toHaveBeenCalledWith("/login");
      expect(refresh).toHaveBeenCalled();
    });
  });
});
