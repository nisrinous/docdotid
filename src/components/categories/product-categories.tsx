import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { getProducts } from "@/lib/fetcher/products";
import { useState } from "react";
import { ProductCategoriesResponse } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSWR from "swr";

const ProductCategories = () => {
  const { token } = useSelector((state: RootState) => state.user);

  const [productsData, setProductsData] = useState<ProductCategoriesResponse[]>(
    []
  );

  const fetchData = async () => {
    try {
      const data = await getProducts(token);
      setProductsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR(["/categories", token], fetchData);

  return (
    <>
      <div className="container my-10 flex flex-col justify-center border-b-[1px] pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Shop Wellness Essentials
        </h3>
        <p className="text-zinc-400 mb-5">Browse our products by categories</p>
        {isLoading ? (
          <p className="text-zinc-400 mb-5">Loading...</p>
        ) : isError ? (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center">
              <p className="text-zinc-400 mb-5">Error while fetching data</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center">
              {productsData?.map((item, index) => (
                <Card
                  key={index}
                  className="p-2 border-none shadow-none flex flex-col justify-between "
                >
                  <CardContent className="p-1 flex flex-col items-center justify-between">
                    <img
                      src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/a1a09951f71f23c5c437607fbd2a5e1f/detailed"
                      className="w-12 lg:w-16"
                    ></img>
                  </CardContent>
                  <CardFooter className="items-center justify-center p-0">
                    <Link href="/product" className="hover:underline">
                      <p className="p-2 text-center leading-none text-sm md:text-base md:leading-none">
                        {item.name}
                      </p>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCategories;
