import CartItemCard from "@/components/card/cart-item-card";
import DeliveryCourierCard from "@/components/card/delivery-courier-card";
import ShippingAddressCard from "@/components/card/shipping-address-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function MyCart() {
  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">My Cart</h3>
            {/* <div className="flex items-center space-x-2 ">
              <Checkbox id="terms" />
              <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select All Items
              </label>
            </div> */}
          </div>
          <div className="mt-5">
            <ShippingAddressCard />
          </div>
          <div className="py-5 flex flex-col gap-3">
            <Card className="px-5 w-full flex flex-col justify-start items-start gap-1">
              <CardHeader className="p-0 pb-2 w-full flex flex-row items-center justify-between border-b-2">
                <h3 className="text-lg mt-3">Pharmacy Name</h3>
              </CardHeader>
              <CartItemCard quantity={2} />
              <CartItemCard quantity={0} />
            </Card>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <DeliveryCourierCard />
          </div>

          <Link href="/products">
            <Button className="w-full" variant="outline">
              + Add other item
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
        </div>
      </div>
    </>
  );
}
