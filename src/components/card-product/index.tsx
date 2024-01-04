import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

const CardProduct = () => {
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  return (
    <>
      <Card className="p-2 w-40 flex flex-col justify-between">
        <CardContent className="p-1 flex flex-col items-center justify-center">
          <img src="Caduceus.svg" className="h-full"></img>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-center justify-center p-0">
          <Link href="/telemedicines/cardiologist">
            <p className="px-2 text-center">Cardiologist</p>
            <p className="text-zinc-400 leading-none text-xs text-center mt-1">
              Rp 13.000
            </p>
          </Link>
          <Button
            disabled={addedToCart}
            className="h-8 px-6"
            onClick={() => setAddedToCart(true)}
          >
            {addedToCart ? "Added" : "Add to cart"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardProduct;
