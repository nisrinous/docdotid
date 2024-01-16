import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
// import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
// import { DoctorCategoriesResponse } from "@/types";

const DoctorCategories = () => {
  const { token } = useSelector((state: RootState) => state.user);

  // const [doctorCategoriesData, setDoctorCategoriesData] = useState<
  //   DoctorCategoriesResponse[]
  // >([]);

  // const fetcher = async () => {
  //   try {
  //     const data = await getProductCategories(token);
  //     setDoctorCategoriesData(data.data);
  //   } catch (error) {
  //     console.error("" + error);
  //   }
  // };

  // useEffect(() => {
  //   fetcher();
  // }, []);

  return (
    <>
      <div className="container my-10 flex flex-col justify-center border-b-[1px] pb-3">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Consult with Doctors Online
        </h3>
        <p className="text-zinc-400 mb-5">
          See medical specialties explanation here
        </p>
        <ScrollArea>
          <div className="flex flex-row gap-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={index}
                className="p-2 w-40 flex flex-col justify-between"
              >
                <CardContent className="p-1 flex flex-col items-center justify-center">
                  <img
                    src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/6cb8f67a33376e09150a0ff78061df2e/detailed"
                    className="w-16 lg:w-20"
                  ></img>
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
