import { cookies } from "next/headers";
import { Avatar, AvatarImage } from "./avatar";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

export const Header = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("user-id");
  return (
    <div className="px-4 py-5 border-b border-b-secondary mb-10">
      <div className="flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <p className="text-blue-50">Shopping.com</p>
          </Link>
        </div>

        <div className="flex gap-4">
          <div>
            <Link href={"/cart"}>
              <ShoppingCartIcon className="text-secondary" />
            </Link>
          </div>

          {!!session ? (
            <div>
              <Avatar>
                <AvatarImage src={"https://i.pravatar.cc"} />
              </Avatar>
            </div>
          ) : (
            <div>
              <Link href={"/login"} className="text-blue-50">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
