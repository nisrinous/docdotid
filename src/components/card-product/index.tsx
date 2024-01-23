import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";

import { ProductsResponse } from "@/types";
import AddToCartButton from "../button/add-to-cart";
import { toRupiah } from "@/lib/utils";

const CardProduct = ({ product }: { product: ProductsResponse }) => {
  return (
    <Card className="p-2 w-52 flex flex-col justify-between">
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-1 flex flex-col items-center justify-center">
          <img
            src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/36edf7e6afe8045a8b67274e8226b9b7/detailed"
            className="w-24"
          ></img>
          <div className="bg-orange-200 p-1 w-full my-1 h-9 flex items-center justify-center">
            <p className="text-center leading-none capitalize">
              {product.name
                .toLowerCase()
                .replace(/,/g, "")
                .split(" ")
                .slice(0, 2)
                .join(" ")}
            </p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col gap-2 items-center justify-center p-0">
        <Link href={`/product/${product.id}`}>
          {product.min_price && product.max_price && (
            <p className="text-zinc-600 leading-none text-base text-center mt-1 p-0">
              {toRupiah(product.min_price)}
              {" - "}
              {toRupiah(product.max_price)}
            </p>
          )}
          {product.unit_in_pack !== "" && (
            <p className="px-2 text-center text-zinc-500 text-sm mb-2">
              {product.unit_in_pack}{" "}
              <span className="text-zinc-400">/pack</span>
            </p>
          )}
        </Link>
        <AddToCartButton productId={product.id} />
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
