import CartItemCard from "@/components/card/cart-item-card";
import DeliveryCourierCard from "@/components/card/delivery-courier-card";
import OrderItemCard from "@/components/card/order-item-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RootState } from "@/store/store";
import Link from "next/link";

import { useSelector } from "react-redux";

export default function MyCart() {
  const { cartItemsCount } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col gap-2">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">
              Order Information
            </h3>
          </div>

          <div className="pb-5 flex flex-col gap-3">
            <div className=" bg-zinc-50 text-sm leading-tight font-light my-5">
              <div className="flex flex-row justify-between p-2">
                <p>Order ID</p>
                <p className="font-medium">id</p>
              </div>
              <div className="flex flex-row justify-between p-2">
                <p className="">Date of Order</p>
                <p className="font-medium">date</p>
              </div>
              <div className="flex flex-row justify-between p-2">
                <p className="">Payment Status</p>
                <p className="font-medium">Waiting for payment</p>
              </div>
            </div>
            <div className=" bg-zinc-50 text-sm leading-tight font-light">
              <div className="flex flex-row justify-between p-2">
                <p className="">Total Price</p>
                <p className="font-medium">$ something</p>
              </div>
            </div>
          </div>
          <div>
            <Card className="px-5 w-full flex flex-col justify-start items-start gap-1">
              <CardHeader className="p-0 pb-2 w-full flex flex-row items-center justify-between border-b-2 my-3">
                <h3 className="text-lg">Pharmacy Name</h3>
              </CardHeader>
              <CardContent className="px-0 flex flex-col gap-2 w-full">
                <OrderItemCard name="Product1" price="12,99" qty={2} />
                <OrderItemCard name="Product1" price="12,99" qty={2} />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <DeliveryCourierCard isChosen={true} deliveryCourierId={1} />
          </div>
        </div>
        <div className="col-span-3 md:block md:col-span-1">
          <h3 className="scroll-m-20 text-xl md:text-2xl border-b-2 mt-1 mb-3 pb-5">
            Purchase Summary
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
              <p className="text-zinc-600 leading-none text-sm">
                Service charge 10%
              </p>
              <p className="text-zinc-600 leading-none text-sm">Rp total</p>
            </div>
            <div className="flex flex-row justify-between py-5">
              <p className="text-zinc-600 leading-none text-base">
                Total price
              </p>
              <p className="leading-none text-base text-sky-700">Rp total</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
