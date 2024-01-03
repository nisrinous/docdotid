import Link from "next/link";
import { useRouter } from "next/router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import CartIcon from "../cart/cart-icon";

const Menu = () => {
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
              <Link href="/products">Our Products</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/telemedicines">Telemedicine</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/auth/login" className="font-semibold">
                Login
              </Link>
            </DropdownMenuItem>
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
                isActive("/products") ? "text-sky-700" : "hover:text-[#5CACE5]"
              }`}
            >
              <Link href="/products">Our Products</Link>
            </li>
            <li
              className={`text-sm font-normal ${
                isActive("/telemedicines")
                  ? "text-sky-700"
                  : "hover:text-[#5CACE5]"
              }`}
            >
              <Link href="/telemedicines">Telemedicine</Link>
            </li>
          </ul>
          <Button className="px-10">Login</Button>
        </div>
        <CartIcon />
      </div>
    </>
  );
};
export default Menu;
