import { CardDoctor } from "@/components/card-doctor";
import DoctorCategories from "@/components/categories/doctor-categories";
import { getDoctors } from "@/lib/fetcher/doctor";
import { RootState } from "@/store/store";
import { DoctorResponse } from "@/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function Telemedicine() {
  const { token } = useSelector((state: RootState) => state.user);

  const [doctorsData, setDoctorsData] = useState<DoctorResponse[]>([]);

  const fetchData = async () => {
    try {
      const data = await getDoctors(token);
      setDoctorsData(data.data);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR(["/doctors", token], fetchData);

  return (
    <>
      <DoctorCategories />
      <div className="container my-10 flex flex-col justify-center pb-5">
        <h3 className="scroll-m-20 text-2xl md:text-3xl tracking-tight text-left mt-5">
          Browse Medical Specialist
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
            <div className="container flex flex-wrap gap-4 my-10 justify-start px-0">
              {doctorsData ? (
                doctorsData.map((item, index) => {
                  return <CardDoctor key={index} doctor={item} />;
                })
              ) : (
                <p className="text-zinc-400 mb-5">No data.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
