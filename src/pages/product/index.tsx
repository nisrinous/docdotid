import CardProduct from "@/components/card-product";
import ProductCategories from "@/components/categories/product-categories";

export default function Products() {
  return (
    <>
      <ProductCategories />
      <div className="container my-10 flex flex-col justify-center pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Cardiologist
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 flex-row gap-4 place-content-center">
          {Array.from({ length: 10 }).map((_, index) => {
            return <CardProduct key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
