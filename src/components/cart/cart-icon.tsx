import { FaShoppingCart } from "react-icons/fa";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import Link from "next/link";

const CartIcon = () => {
  const { cartItemsCount } = useSelector((state: RootState) => state.cart);

  return (
    <div className="relative">
      <Link href="/user/cart">
        <FaShoppingCart />
      </Link>
      {cartItemsCount > 0 && (
        <div className="absolute -top-3 -right-5 bg-red-600 text-white rounded-full px-1 h-4 flex items-center justify-center">
          <p className="text-xs">
            {cartItemsCount > 0 ? cartItemsCount : null}
          </p>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
