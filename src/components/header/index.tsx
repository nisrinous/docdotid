import Link from "next/link";

import Logo from "@/components/logo";
import Menu from "@/components/menu";
import CartIcon from "@/components/cart/cart-icon";
import ProfileMenu from "@/components/menu/profile-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Header = () => {
  const { token } = useSelector((state: RootState) => state.user);
  return (
    <header className="bg-white sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between md:hidden">
        <Logo />
        <div className="flex flex-row justify-center items-center gap-5">
          {token && <CartIcon />}
          {token && <ProfileMenu />}
          <Menu token={token} />
        </div>
      </div>
      <div className="container h-16 justify-between items-center hidden md:flex">
        <Logo />
        <Menu token={token} />
        {token && (
          <div className="flex flex-row justify-center items-center gap-5">
            <CartIcon />
            <ProfileMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
