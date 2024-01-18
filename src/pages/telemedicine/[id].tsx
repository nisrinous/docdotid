import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDoctor } from "@/lib/fetcher/doctor";
import { RootState } from "@/store/store";
import { DoctorResponse } from "@/types";
import { Link } from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function DoctorDetails() {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.user);
  const { id } = router.query;
  const [doctor, setDoctorData] = useState<DoctorResponse>();

  const fetchData = async () => {
    try {
      const data = await getDoctor(token, id);
      setDoctorData(data.data);
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
      {isLoading ? (
        <p className="text-zinc-400 mb-5">Loading...</p>
      ) : isError ? (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            <p className="text-zinc-400 mb-5">Error while fetching data</p>
          </div>
        </div>
      ) : (
        <div className="container my-10 flex flex-col justify-center items-center lg:px-20">
          <div className="">
            <img
              src="https://onecms-res.cloudinary.com/image/upload/s--uXpdFlVW--/c_crop,h_428,w_762,x_0,y_18/c_fill,g_auto,h_468,w_830/fl_relative,g_south_east,l_one-cms:core:watermark:afp_watermark,w_0.1/f_auto,q_auto/v1/one-cms/core/f3db88d3f76cf546544eca7199920c659d767953.jpg?itok=Ex2eUOsi"
              className="max-w-sm"
            ></img>
            <div className="my-3">
              <Badge className="bg-green-700/60 my-2">
                {doctor?.is_active ? "Online" : "Offline"}
              </Badge>
              <h3 className="font-semibold text-2xl md:text-3xl text-left leading-none">
                {doctor?.user_name}
              </h3>
              <p className="text-zinc-600 leading-none text-base border-b-2 pb-2 text-left">
                {doctor?.specialist_name}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <h5 className="font-medium text-xl md:text-2xl text-left text-orange-500 bg-slate-100 w-full">
                ${doctor?.fee}
              </h5>
            </div>
            <p className="text-zinc-500 leading-none text-lg mt-6">
              {doctor?.specialist_description}
            </p>
            <p className="text-zinc-500 leading-tight text-base mt-6 mb-20">
              Years of experience: <br />
              {doctor?.years_of_exp} years
            </p>

            <Button className="w-full my-10">Continue to chat</Button>
          </div>
        </div>
      )}
    </>
  );
}
