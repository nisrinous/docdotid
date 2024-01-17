import CardProduct from "@/components/card-product";
import ProductCategories from "@/components/categories/product-categories";
import { getProducts } from "@/lib/fetcher/product";
import { RootState } from "@/store/store";
import { ProductsResponse } from "@/types";
import { useRouter } from "next/router";

import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function Products() {
  const { token } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const categoryId = router.query.category_id as string;

  const [productsData, setProductsData] = useState<ProductsResponse[]>([]);

  const fetchData = async () => {
    try {
      const data = await getProducts(token, categoryId);
      setProductsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR([`/products?category_id=${categoryId}`, token], fetchData);

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
          <div className="flex justify-center">
            <div className="container flex flex-wrap my-10 gap-2 justify-start px-0">
              {productsData.map((item, index) => {
                return <CardProduct key={index} product={item} />;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
