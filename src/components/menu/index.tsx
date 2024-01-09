import Link from "next/link";
import { useRouter } from "next/router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "../ui/button";

const Menu = ({ token }: { token?: string }) => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="pt-2">
            <RxHamburgerMenu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-7">
            <DropdownMenuItem className="w-36">
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/product">Our Products</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/telemedicines">Telemedicine</Link>
            </DropdownMenuItem>
            {!token && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/login" className="font-semibold">
                    Login
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-row justify-center items-center gap-5">
        <div className="hidden md:flex flex-row gap-10 items-center">
          <ul className="flex flex-row gap-5 ">
            <li
              className={`text-sm font-normal ${
                isActive("/") ? "text-sky-700" : "hover:text-[#5CACE5]"
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`text-sm font-normal ${
                isActive("/product") ? "text-sky-700" : "hover:text-[#5CACE5]"
              }`}
            >
              <Link href="/product">Our Products</Link>
            </li>
            <li
              className={`text-sm font-normal ${
                isActive("/telemedicines")
                  ? "text-sky-700"
                  : "hover:text-[#5CACE5]"
              }`}
            >
              <Link href="/telemedicine">Telemedicine</Link>
            </li>
          </ul>
          {!token && (
            <Link href="/auth/login">
              <Button className="px-10 hidden md:block">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Menu;
