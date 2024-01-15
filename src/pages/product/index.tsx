import CardProduct from "@/components/card-product";
import ProductCategories from "@/components/categories/product-categories";
import { ProductResponse } from "@/types";

import { useState } from "react";

export default function Products() {
  const [productData, setProductData] = useState<ProductResponse[]>([]);

  return (
    <>
      <ProductCategories />
      <div className="container my-10 flex flex-col justify-center pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Cardiologist
        </h3>
        <div className="flex justify-center">
          <div className="container flex flex-wrap my-10 gap-2 justify-start px-0">
            {Array.from({ length: 10 }).map((_, index) => {
              return <CardProduct key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
