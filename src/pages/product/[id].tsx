import AddToCartButton from "@/components/button/add-to-cart";
import { getProduct } from "@/lib/fetcher/product";
import { toRupiah } from "@/lib/utils";
import { ProductResponse } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductResponse>(
    {} as ProductResponse
  );

  const fetchData = async () => {
    try {
      const data = await getProduct(id as string);
      setProduct(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR([`/products/${id}`], fetchData);

  return (
    <>
      {isLoading ? (
        <p className="text-zinc-400 mb-5 text-center">Loading...</p>
      ) : isError ? (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            <p className="text-zinc-400 mb-5">Error while fetching data</p>
          </div>
        </div>
      ) : (
        <div className="container my-10 grid grid-cols-1 md:grid-cols-3 md:grid-rows-1 md:gap-10 px-20 lg:px-40">
          <div className="col-span-1 md:col-span-1 mt-10">
            <img
              src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/36edf7e6afe8045a8b67274e8226b9b7/detailed"
              className="border-[1px] p-5"
            ></img>
          </div>

          <div className="col-span-1 md:col-span-2 mt-10 md:mt-0">
            <h3 className="font-semibold text-2xl md:text-3xl text-center md:text-left">
              {product?.name}
            </h3>
            <p className="text-zinc-700 leading-none text-lg border-b-2 mt-1 mb-3 pb-3 ">
              {product?.description}
            </p>
            <p className="text-zinc-500 leading-none text-lg mt-1">
              {product?.content}
            </p>
            <p className="text-zinc-600 leading-none text-base">
              {product?.unit_in_pack} /pack
            </p>
            <div className="flex flex-col gap-1 justify-center items-center md:justify-start md:items-start">
              <h5 className="font-medium text-xl md:text-2xl text-center md:text-left text-orange-500 mt-5">
                {toRupiah(product.min_price)}
                {" - "}
                {toRupiah(product.max_price)}{" "}
              </h5>
              <p className="text-zinc-500 leading-none text-sm">
                *Prices differ based on pharmacy
              </p>
              <AddToCartButton
                product={product}
                isDisable={!product.is_active}
              />
            </div>

            <div className="flex flex-col mt-5">
              <h5 className="font-medium text-base">Generic name</h5>
              <p className="text-zinc-500 leading-none text-sm">
                {product?.generic_name}
              </p>
            </div>
            <div className="flex flex-col mt-3">
              <h5 className="font-medium text-base">Category</h5>
              <p className="text-zinc-500 leading-none text-sm">
                {product?.category_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
