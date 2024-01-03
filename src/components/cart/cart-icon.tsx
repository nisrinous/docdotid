import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

const CartIcon = () => {
  const [cartItemsCount, setCartItemsCount] = useState(3);

  return (
    <div className="relative">
      <FaShoppingCart />
      {cartItemsCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-2 h-2 flex items-center justify-center text-xs"></div>
      )}
    </div>
  );
};

export default CartIcon;
