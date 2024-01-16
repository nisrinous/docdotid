import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { decrementCart, incrementCart } from "@/store/slices/cartSlice";
import { ProductsResponse } from "@/types";
import { RootState } from "@/store/store";
import { addToCart } from "@/lib/fetcher/cart";

const CardProduct = ({ product }: { product: ProductsResponse }) => {
  const { token } = useSelector((state: RootState) => state.user);

  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const dispatch = useDispatch();

  const increment = async () => {
    setCounter(counter + 1);
    dispatch(incrementCart());
    await addToCart(token, product.id, counter);
  };
  const decrement = async () => {
    setCounter(counter - 1);
    dispatch(decrementCart());
    await addToCart(token, product.id, counter);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    increment();
  };

  useEffect(() => {
    if (counter === 0) {
      setAddedToCart(false);
    }
  }, [counter]);

  return (
    <Card className="p-2 w-40 flex flex-col justify-between">
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-1 flex flex-col items-center justify-center">
          <img
            src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/36edf7e6afe8045a8b67274e8226b9b7/detailed"
            className="w-24"
          ></img>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col gap-2 items-center justify-center p-0">
        <Link href={`/product/${product.id}`}>
          <p className="px-2 text-center text-lg">{product.name}</p>
          <p className="text-zinc-600 leading-none text-base text-center mt-1">
            ${product.min_price} - ${product.max_price}
          </p>
          <p className="px-2 text-center text-zinc-400 text-sm mb-2">
            {product.unit_in_pack} /packkk
          </p>
        </Link>
        {!addedToCart && (
          <Button
            disabled={addedToCart}
            className="h-8 px-6"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        )}
        {addedToCart && (
          <div className="flex flex-row items-center justify-center gap-2">
            <Button onClick={decrement} className="h-6 w-6 p-0">
              -
            </Button>
            <p className="border-b-2 px-2">{counter}</p>
            <Button onClick={increment} className="h-6 w-6 p-0">
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
