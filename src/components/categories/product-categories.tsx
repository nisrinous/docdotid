import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";

const ProductCategories = () => {
  return (
    <>
      <div className="container my-10 flex flex-col justify-center border-b-[1px] pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Shop Wellness Essentials
        </h3>
        <p className="text-zinc-400 mb-5">Browse our products by categories</p>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {" "}
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                className="p-2 border-none shadow-none flex flex-col justify-between"
              >
                <CardContent className="p-1 flex flex-col items-center justify-center">
                  <img
                    src={`productcategory${index + 1}.svg`}
                    className="h-full rounded-full border-[1px]"
                  ></img>
                </CardContent>
                <CardFooter className="items-center justify-center p-0">
                  <Link
                    href="/telemedicines/cardiologist"
                    className="hover:underline"
                  >
                    <p className="px-2 text-center">Cardiologist</p>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
