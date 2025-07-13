import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";
import { useAuthenticateUser } from "@/mutations/useAuthenticateUser/useAuthenticateUser";
import Login from "@/app/login/page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/mutations/useAuthenticateUser/useAuthenticateUser", () => ({
  useAuthenticateUser: vi.fn(),
}));

describe("Login page", () => {
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

    (
      useAuthenticateUser as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      mutate,
    });

    vi.clearAllMocks();
  });

  it("renders the form", () => {
    render(<Login />);
    expect(screen.getByTestId("login-email-input")).toBeDefined();
    expect(screen.getByTestId("password-email-input")).toBeDefined();
    expect(screen.getByTestId("submit-login-button")).toBeDefined();
  });

  it("Should not be able to call function when form is empty", async () => {
    render(<Login />);

    const login = screen.getByTestId("login-email-input");
    const password = screen.getByTestId("password-email-input");
    const form = screen.getByTestId("login-form");

    fireEvent.change(login, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(password, {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mutate).not.toHaveBeenCalled();
    });
  });

  it("Should be able to login user", async () => {
    render(<Login />);

    const login = screen.getByTestId("login-email-input");
    const password = screen.getByTestId("password-email-input");
    const form = screen.getByTestId("login-form");

    fireEvent.change(login, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(password, {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mutate).toHaveBeenCalled();
    });
  });

  it("Should redirect user to sign up page correctly", async () => {
    render(<Login />);
    const signUp = screen.getByRole("link", { name: /sign up/i });
    expect(signUp).toBeDefined();
  });
});
