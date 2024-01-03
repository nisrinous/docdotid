import { useState } from "react";
import { Button } from "../ui/button";

const CartSticky = () => {
  const [cartItemsCount, setCartItemsCount] = useState(3);

  return (
    <>
      {cartItemsCount > 0 && (
        <div className="hidden bg-neutral-600 opacity-90 md:block md:sticky bottom-0 z-50 w-full border-b bg-background">
          <div className="px-10 flex h-20 items-center justify-between text-white">
            <div className="flex flex-row justify-center items-center">
              <p className="border-r-2 p-3 text-lg">{cartItemsCount} Item</p>
              <div>
                <p className="px-3">Estimated price:</p>
                <p className="px-3 font-semibold">Rp 10.000.000</p>
              </div>
            </div>

            <Button className="px-8 border-2 border-white">See Cart</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSticky;
