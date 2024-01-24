import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { DoctorCategoriesResponse } from "@/types";
import { getDoctorCategories } from "@/lib/fetcher/doctor-category";
import useSWR from "swr";
import { useState } from "react";

const DoctorCategories = () => {
  const [doctorCategoriesData, setDoctorCategoriesData] = useState<
    DoctorCategoriesResponse[]
  >([]);

  const fetchCategories = async () => {
    try {
      const data = await getDoctorCategories();
      setDoctorCategoriesData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR(["/specialist"], fetchCategories);

  return (
    <>
      <div className="container my-10 flex flex-col justify-center border-b-[1px] pb-3">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Consult with Doctors Online
        </h3>
        <p className="text-zinc-400 mb-5">
          See medical specialties explanation here
        </p>
        {isLoading ? (
          <p className="text-zinc-400 mb-5">Loading...</p>
        ) : isError ? (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center">
              <p className="text-zinc-400 mb-5">Error while fetching data</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="">
            <div className="flex flex-row gap-5 pb-5">
              {doctorCategoriesData &&
                doctorCategoriesData.map((item, index) => (
                  <Link href="/telemedicine" key={index}>
                    <Card
                      key={index}
                      className="p-2 w-44 flex flex-col justify-between"
                    >
                      <CardContent className="p-1 flex flex-col items-center justify-center">
                        <img
                          src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/6cb8f67a33376e09150a0ff78061df2e/detailed"
                          className="w-16 lg:w-20"
                        ></img>
                        <div className="bg-sky-100 w-full my-1 h-10 flex items-center justify-center">
                          <p className="text-center leading-none p-1">
                            {item.name}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center justify-center p-0 ">
                        <div className="w-full h-10 flex items-center justify-center">
                          <p className="text-zinc-400 leading-none text-sm text-center">
                            {item.description}
                          </p>
                        </div>
                        <div className="w-full h-10 flex items-center justify-center">
                          <p className="text-zinc-600 leading-none text-sm text-center">
                            {item.symptoms}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </>
  );
};

export default DoctorCategories;
