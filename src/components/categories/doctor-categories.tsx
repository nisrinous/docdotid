import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";

const DoctorCategories = () => {
  return (
    <>
      <div className="container my-10 flex flex-col justify-center border-b-[1px] pb-3">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Consult with Doctors Online
        </h3>
        <p className="text-zinc-400 mb-5">Find doctor by categories</p>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className="p-2 border-none shadow-none">
              <CardContent className="p-1 flex flex-col items-center justify-center">
                <img
                  src="Cardiologist-pana.svg"
                  className="h-full rounded-full border-[1px]"
                ></img>
              </CardContent>
              <CardFooter className="items-center justify-center p-0">
                <Link
                  href="/telemedicines/cardiologist"
                  className="hover:underline"
                >
                  <p className="px-2">Cardiologist</p>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-muted-foreground"></p>
      </div>
    </>
  );
};

export default DoctorCategories;
