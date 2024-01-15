import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { decrementCart, incrementCart } from "@/store/slices/cartSlice";
import { ProductsResponse } from "@/types";

const CardProduct = ({ product }: { product: ProductsResponse }) => {
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const dispatch = useDispatch();

  const increment = () => {
    setCounter(counter + 1);
    dispatch(incrementCart());
  };
  const decrement = () => {
    setCounter(counter - 1);
    dispatch(decrementCart());
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
          <img src={product.image} className="h-full"></img>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col gap-2 items-center justify-center p-0">
        <Link href="/telemedicines/cardiologist">
          <p className="px-2 text-center">{product.name}</p>
          <p className="text-zinc-400 leading-none text-xs text-center mt-1">
            $ {product.sellingUnit}
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
