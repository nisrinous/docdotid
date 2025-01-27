import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { decrementCart, incrementCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { addToCart } from "@/lib/fetcher/cart";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Login from "@/pages/auth/login";
import { useRouter } from "next/router";
import { ProductResponse, ProductsResponse } from "@/types";

const AddToCartButton = ({
  product,
  isDisable,
}: {
  product: ProductsResponse | ProductResponse;
  isDisable: boolean;
}) => {
  const { token } = useSelector((state: RootState) => state.user);
  const [counter, setCounter] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const decrement = async () => {
    setCounter(counter - 1);
    dispatch(decrementCart());
    await addToCart(token, product.id, counter);
  };
  const increment = async () => {
    setCounter(counter + 1);
    dispatch(incrementCart());
    await addToCart(token, product.id, counter);
  };

  const handleAddToCart = () => {
    if (token !== "") {
      setAddedToCart(true);
      increment();
    } else {
      router.push("/auth/login");
    }
  };
  useEffect(() => {
    if (counter === 0) {
      setAddedToCart(false);
    }
  }, [counter]);
  return (
    <>
      {!addedToCart && (
        <>
          <Button
            disabled={isDisable}
            className="h-8 px-6"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </>
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
    </>
  );
};

export default AddToCartButton;
