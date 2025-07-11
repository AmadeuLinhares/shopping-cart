import { Avatar, AvatarImage } from "./avatar";
import Link from "next/link";

export const Header = () => {
  const isLogin = false;

  return (
    <div className="px-4 py-5 border-b border-b-secondary mb-10">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-blue-50">Shopping.com</p>
        </div>

        {isLogin ? (
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
  );
};
