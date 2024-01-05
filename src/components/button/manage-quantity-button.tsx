import { useState } from "react";
import { Button } from "../ui/button";

const ManageQuantityButton = ({ quantity }: { quantity: number }) => {
  const [qty, setQty] = useState<number>(quantity);

  const increment = () => {
    setQty(qty + 1);
  };
  const decrement = () => {
    setQty(qty - 1);
  };

  return (
    <>
      {quantity > 0 && (
        <div className="flex flex-row items-center justify-center gap-2 w-full">
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
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <p className="px-5 text-zinc-400 leading-none text-xs">Sold out</p>
        </div>
      )}
    </>
  );
};

export default ManageQuantityButton;
