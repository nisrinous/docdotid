import CartItemCard from "@/components/card/cart-item-card";
import { Checkbox } from "@/components/ui/checkbox";

export default function MyCart() {
  return (
    <>
      <div className="container my-10 grid grid-cols-3 grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">My Cart</h3>
            <div className="flex items-center space-x-2 ">
              <Checkbox id="terms" />
              <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select All Items
              </label>
            </div>
          </div>
          <div className="py-5 flex flex-col gap-3">
            <CartItemCard quantity={4} />
            <CartItemCard quantity={6} />
          </div>
          <p></p>
        </div>
        <div className="hidden md:block md:col-span-1">
          <h3 className="scroll-m-20 text-xl md:text-2xl border-b-2 pb-2">
            Summary
          </h3>
        </div>
      </div>
    </>
  );
}
