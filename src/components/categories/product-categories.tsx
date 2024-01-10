import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { getProducts } from "@/lib/fetcher/products";
import { useEffect, useState } from "react";
import { ProductCategoriesResponse } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "../ui/button";

const ProductCategories = () => {
  const { token } = useSelector((state: RootState) => state.user);

  const [productsData, setProductsData] = useState<ProductCategoriesResponse[]>(
    []
  );

  const fetcher = async () => {
    try {
      const data = await getProducts(token);
      setProductsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  useEffect(() => {
    fetcher();
  });

  return (
    <>
      <div className="container my-10 flex flex-col justify-center border-b-[1px] pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Shop Wellness Essentials
        </h3>
        <p className="text-zinc-400 mb-5">Browse our products by categories</p>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4">
          {productsData.map((item, index) => (
            <Card
              key={index}
              className="p-2 border-none shadow-none flex flex-col justify-between "
            >
              <CardContent className="p-1 flex flex-col items-center justify-between">
                <img
                  src={`productcategory${index + 1}.svg`}
                  className="h-full rounded-full border-[1px]"
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
    </>
  );
};

export default ProductCategories;
