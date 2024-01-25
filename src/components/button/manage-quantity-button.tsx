import { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { incrementCart, decrementCart } from "@/store/slices/cartSlice";

const ManageQuantityButton = ({ quantity }: { quantity: number }) => {
  const [qty, setQty] = useState<number>(quantity);
  const dispatch = useDispatch();

  const increment = () => {
    setQty(qty + 1);
    dispatch(incrementCart());
  };
  const decrement = () => {
    setQty(qty - 1);
    dispatch(decrementCart());
  };

  return (
    <div className="flex flex-row justify-start items-start">
      {quantity > 0 && (
        <div className="flex flex-row justify-between gap-2 w-full">
          <Button onClick={decrement} className="h-6 w-6 p-0">
            -
          </Button>
          <p className="border-b-2 px-2">{qty}</p>
          <Button onClick={increment} className="h-6 w-6 p-0">
            +
          </Button>
        </div>
      )}
      {!(quantity > 0) && (
        <div className="flex flex-row justify-start gap-2 w-full">
          <p className="p-0 md:px-5 text-zinc-400 leading-none text-xs ">
            Sold out
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageQuantityButton;
