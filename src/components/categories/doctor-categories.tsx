import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const DoctorCategories = () => {
  return (
    <>
      <div className="container my-10 flex flex-col justify-center border-b-[1px] pb-3">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Consult with Doctors Online
        </h3>
        <p className="text-zinc-400 mb-5">Find doctor by categories</p>
        <ScrollArea>
          <div className="flex flex-row gap-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                className="p-2 w-40 flex flex-col justify-between"
              >
                <CardContent className="p-1 flex flex-col items-center justify-center">
                  <img src={`doctor${index + 1}.svg`} className="h-full"></img>
                </CardContent>
                <CardFooter className="items-center justify-center p-0">
                  <Link href="/telemedicines/cardiologist">
                    <p className="px-2 text-center">Cardiologist</p>
                    <p className="text-zinc-400 leading-none text-xs text-center mt-2">
                      For heart and blood pressure problems
                    </p>
                    <p className="text-zinc-600 leading-none text-xs text-center mt-1">
                      Chest pain, Heart Failure, Cholesterol
                    </p>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default DoctorCategories;
