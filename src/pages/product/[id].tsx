import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/fetcher/product";
import { RootState } from "@/store/store";
import { ProductResponse } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useSelector((state: RootState) => state.user);

  const [product, setProduct] = useState<ProductResponse>();

  const fetchData = async () => {
    try {
      const data = await getProduct(token, id as string);
      setProduct(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR([`/products/${id}`, token], fetchData);

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
          <div className="col-span-1 md:col-span-1">
            <img
              src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/36edf7e6afe8045a8b67274e8226b9b7/detailed"
              className="border-[1px] p-5"
            ></img>
          </div>

          <div className="col-span-1 md:col-span-2 mt-10 md:mt-0">
            <h3 className="font-semibold text-2xl md:text-3xl border-b-2 mt-1 mb-3 pb-3 text-center md:text-left">
              {product?.name}
            </h3>
            <div className="flex flex-col gap-1 justify-center items-center md:justify-start md:items-start">
              <h5 className="font-medium text-xl md:text-2xl text-center md:text-left text-orange-500">
                ${product?.min_price} - ${product?.max_price}
              </h5>
              <p className="text-zinc-600 leading-none text-base">
                {product?.unit_in_pack} /pack
              </p>
              <Button className="w-32 my-2">Add to cart</Button>
            </div>
            <p className="text-zinc-500 leading-none text-base mt-6">
              {product?.description}
            </p>

            <div className="flex flex-col mt-5">
              <h5 className="font-medium text-base">Generic name</h5>
              <p className="text-zinc-500 leading-none text-sm">
                {product?.generic_name}
              </p>
            </div>
            <div className="flex flex-col mt-5">
              <h5 className="font-medium text-base">Category</h5>
              <p className="text-zinc-500 leading-none text-sm">
                {product?.product_category_id}
              </p>
            </div>
            <div className="flex flex-col mt-5">
              <h5 className="font-medium text-base">Manufacturer</h5>
              <p className="text-zinc-500 leading-none text-sm">
                {product?.manufacture_id}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
