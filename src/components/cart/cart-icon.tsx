import { FaShoppingCart } from "react-icons/fa";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { useEffect, useState } from "react";
import { setCartAttribute } from "@/store/slices/cartSlice";
import { CartItemResponse } from "@/types";
import { getCartItems } from "@/lib/fetcher/cart";
import useSWR from "swr";

const CartIcon = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const { cartItemsCount } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

  const fetchCart = async () => {
    try {
      const data = await getCartItems(token);
      setCartItems(data.data.cart_items);
    } catch (error) {
      console.error("" + error);
    }
  };

  const countItems = (items: CartItemResponse[]): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  useEffect(() => {
    dispatch(setCartAttribute({ cartItemsCount: countItems(cartItems) }));
  });

  const { data } = useSWR(["/carts", token], fetchCart);

  return (
    <div className="relative">
      <Link href="/user/cart">
        <FaShoppingCart />
      </Link>
      {data ? (
        <div className="absolute -top-3 -right-5 bg-red-600 text-white rounded-full px-1 h-4 flex items-center justify-center">
          <p className="text-xs">{cartItemsCount}</p>
        </div>
      ) : null}
    </div>
  );
};

export default CartIcon;
