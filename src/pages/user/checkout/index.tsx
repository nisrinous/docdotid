import CartItemCard from "@/components/card/cart-item-card";
import DeliveryCourierCard from "@/components/card/delivery-courier-card";
import ShippingAddressCard from "@/components/card/shipping-address-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { getCartItems } from "@/lib/fetcher/cart";
import { RootState } from "@/store/store";
import { CartDataResponse, CartItemResponse } from "@/types";
import Link from "next/link";
import { useState } from "react";

import { useSelector } from "react-redux";
import useSWR from "swr";

export default function MyCart() {
  const { token } = useSelector((state: RootState) => state.user);
  const [cartData, setCartData] = useState<CartDataResponse>(
    {} as CartDataResponse
  );
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

  const fetchCart = async () => {
    try {
      const data = await getCartItems(token);
      setCartData(data.data);
      setCartItems(data.data.cart_items);
      console.log(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR(["/carts", token], fetchCart);

  return (
    <>
      <div className="container my-10 grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-10 pb-5">
        <div className="col-span-3 md:col-span-2 flex flex-col">
          <div className="flex flex-row justify-between gap-4 border-b-2 pb-5">
            <h3 className="scroll-m-20 text-2xl md:text-3xl">My Cart</h3>
          </div>
          <div className="mt-5">
            <ShippingAddressCard />
          </div>
          <div className="py-5 flex flex-col gap-3">
            <Card className="px-5 w-full flex flex-col justify-start items-start gap-1">
              <CardHeader className="p-0 pb-2 w-full flex flex-row items-center justify-between border-b-2">
                <h3 className="text-lg mt-3">Pharmacy Name</h3>
              </CardHeader>
              <>
                {cartData?.cart_items?.length > 0 ? (
                  <div className="py-5 flex flex-col gap-3">
                    {cartItems &&
                      cartItems.map((item, index) => (
                        <Card
                          key={index}
                          className="px-5 pt-3 w-full flex flex-col justify-start items-start"
                        >
                          <CartItemCard item={item} />
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="py-5 flex flex-col gap-3 justify-center items-center leading-none">
                    <img
                      src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/7d333a1c68dc88e243758f04c44f0959/detailed"
                      className="w-80 h-80"
                    ></img>
                    <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
                      Your Cart is Empty
                    </h3>
                    <p className="text-zinc-400 mb-5">
                      Looks like you have not add anything to your cart yet.
                    </p>
                  </div>
                )}
              </>
            </Card>
          </div>
          <div className="flex flex-col gap-3 mb-10">
            <DeliveryCourierCard isChosen={false} />
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
          <Link href="/user/checkout/paymentmethod">
            <Button className="w-full my-5 h-12 px-0 mx-0">
              Choose payment method
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
