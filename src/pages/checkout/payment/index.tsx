import OrderItemCard from "@/components/card/order-item-card";
import UploadPaymentProof from "@/components/input/payment-proof";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/router";

export default function UploadProof() {
  const router = useRouter();
  const { method } = router.query;
  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">
              Please Complete Your Payment Process
            </h3>
          </div>
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

          <div className="my-10">
            <UploadPaymentProof />
          </div>
        </div>
        <div className="col-span-3 md:block md:col-span-1">
          <h3 className="scroll-m-20 text-xl md:text-2xl border-b-2 mt-1 mb-3 pb-5">
            Order Summary
          </h3>
          <div className="flex flex-col gap-3">
            <OrderItemCard name="product1" price="13" qty={3} />
            <OrderItemCard name="product2" price="13.5" qty={5} />
          </div>
        </div>
      </div>
    </>
  );
}
