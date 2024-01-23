import CardProduct from "@/components/card-product";
import ProductCategories from "@/components/categories/product-categories";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/fetcher/product";
import { ProductsResponse } from "@/types";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Products() {
  const router = useRouter();
  const categoryId = router.query.categoryID as string;

  const [productsData, setProductsData] = useState<ProductsResponse[]>([]);
  const [limit, setLimit] = useState(1);

  const fetchData = async () => {
    try {
      if (categoryId) {
        const data = await getProducts(limit, categoryId);
        setProductsData(data.data);
      } else {
        const data = await getProducts(limit);
        setProductsData(data.data);
      }
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR(
    [`/products?categoryID=${categoryId}&limit=${limit * 30}`],
    fetchData
  );

  const loadMore = () => {
    setLimit(limit + 1);
  };

  useEffect(() => {
    setLimit(1);
  }, [categoryId]);

  return (
    <>
      <ProductCategories />
      <div className="container my-10 flex flex-col justify-center pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Browse Our Products
        </h3>
        {isLoading ? (
          <p className="text-zinc-400 mb-5">Loading...</p>
        ) : isError ? (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center">
              <p className="text-zinc-400 mb-5">Error while fetching data</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="container flex flex-wrap my-10 gap-2 justify-start px-0">
                {productsData.map((item, index) => {
                  return <CardProduct key={index} product={item} />;
                })}
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <Button
                variant="outline"
                className="w-32"
                onClick={() => loadMore()}
              >
                Load more..
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
