import CartItemCard from "@/components/card/cart-item-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function MyCart({ cartQuantity }: { cartQuantity: number }) {
  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">My Cart</h3>
          </div>
          {cartQuantity > 0 ? (
            <div className="py-5 flex flex-col gap-3">
              <Card className="px-5 pt-3 w-full flex flex-col justify-start items-start">
                <CartItemCard quantity={2} />
              </Card>
              <Card className="px-5 pt-3 w-full flex flex-col justify-start items-start">
                <CartItemCard quantity={0} />
              </Card>
            </div>
          ) : (
            <div className="py-5 flex flex-col gap-3 justify-center items-center leading-none">
              <img
                src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/7d333a1c68dc88e243758f04c44f0959/detailed"
                className="w-80 h-80"
              ></img>
              <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
                Yor Cart is Empty
              </h3>
              <p className="text-zinc-400 mb-5">
                Looks like you have not add anything to your cart yet{" "}
              </p>
            </div>
          )}

          <Link href="/products">
            <Button className="w-full" variant="outline">
              {cartQuantity > 0 ? "+ Add other item" : "+ Add item"}
            </Button>
          </Link>
        </div>
        <div className="col-span-3 md:block md:col-span-1">
          <h3 className="scroll-m-20 text-xl md:text-2xl border-b-2 mt-1 mb-3 pb-5">
            Summary
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between mt-2">
              <p className="text-zinc-600 leading-none text-sm">Order total</p>
              <p className="text-zinc-600 leading-none text-sm">Rp total</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-zinc-600 leading-none text-sm">
                Shipping cost
              </p>
              <p className="text-zinc-600 leading-none text-sm">Rp total</p>
            </div>
            <div className="flex flex-row justify-between border-b-[1px] pb-3">
              <p className="text-zinc-600 leading-none text-sm">Service fee</p>
              <p className="text-zinc-600 leading-none text-sm">Rp total</p>
            </div>
            <div className="flex flex-row justify-between py-5">
              <p className="text-zinc-600 leading-none text-base">
                Total price
              </p>
              <p className="leading-none text-base">Rp total</p>
            </div>
          </div>
          <Link href="/checkout">
            <Button className="w-full my-5 h-12 px-0 mx-0">Checkout</Button>
          </Link>
        </div>{" "}
      </div>
    </>
  );
}
