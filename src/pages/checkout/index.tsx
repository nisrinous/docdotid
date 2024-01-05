import PaymentMethodCard from "@/components/card/payment-method-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function MyCart() {
  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">
              Select Payment Method
            </h3>
          </div>

          <div className="py-5 flex flex-col gap-3">
            <PaymentMethodCard method="Virtual Account" />
            <PaymentMethodCard method="Debit Card" />
            <PaymentMethodCard method="QRIS" />
          </div>
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
