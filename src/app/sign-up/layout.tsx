import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("user-id");

  // If cookie exists, redirect user
  if (session) {
    redirect("/products"); // or wherever your logged-in page is
  }

  // Otherwise, render signup layout + children
  return <>{children}</>;
}
