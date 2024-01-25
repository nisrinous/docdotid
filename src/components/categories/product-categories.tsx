import { Card, CardContent, CardFooter } from "../ui/card";
import { getProductCategories } from "@/lib/fetcher/product-category";
import { useState } from "react";
import { ProductCategoriesResponse } from "@/types";
import useSWR from "swr";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

const ProductCategories = () => {
  const router = useRouter();
  const [categories, setNewCategories] = useState<ProductCategoriesResponse[]>(
    []
  );

  const fetchCategories = async () => {
    try {
      const data = await getProductCategories();
      setNewCategories(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };
  const filterByCategory = (categoryId: number) => {
    router.replace(`/product?categoryID=${categoryId}`);
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR(["/categories"], fetchCategories);

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
              {categories?.map((item, index) => (
                <Card
                  key={index}
                  className="p-2 border-none shadow-none flex flex-col justify-between "
                >
                  <CardContent className="p-1 flex flex-col items-center justify-between">
                    <img
                      src="https://i.imgur.com/qYfnnNy.png"
                      className="w-12 lg:w-16"
                    ></img>
                  </CardContent>
                  <CardFooter className="items-center justify-center p-0">
                    <Button
                      variant="link"
                      onClick={() => filterByCategory(item.id)}
                      className="hover:underline"
                    >
                      <p className="p-2 text-center leading-none text-sm md:text-base md:leading-none">
                        {item.name}
                      </p>
                    </Button>
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
