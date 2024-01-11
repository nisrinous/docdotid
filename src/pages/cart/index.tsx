import CartItemCard from "@/components/card/cart-item-card";
import DeliveryCourierCard from "@/components/card/delivery-courier-card";
import ShippingAddressCard from "@/components/card/shipping-address-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function MyCart() {
  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">My Cart</h3>
          </div>

          <div className="py-5 flex flex-col gap-3">
            <Card className="px-5 pt-3 w-full flex flex-col justify-start items-start">
              <CartItemCard quantity={2} />
              <CartItemCard quantity={0} />
            </Card>
          </div>

          <Link href="/products">
            <Button className="w-full" variant="outline">
              + Add other item
            </Button>
          </Link>
          <Link href="/checkout">
            <Button className="w-full my-10 h-12 px-0 mx-0">Checkout</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
