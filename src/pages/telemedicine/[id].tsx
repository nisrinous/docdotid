import StartChat from "@/components/start-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDoctor } from "@/lib/fetcher/doctor";
import { toRupiah } from "@/lib/utils";
import { RootState } from "@/store/store";
import { DoctorResponse } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function DoctorDetails() {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.user);
  const { id } = router.query;
  const [doctor, setDoctorData] = useState<DoctorResponse>();
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const data = await getDoctor(token, id as string);
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
        <p className="text-zinc-400 mb-5">Loading....</p>
      ) : isError ? (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            <p className="text-zinc-400 mb-5">Error while fetching data</p>
          </div>
        </div>
      ) : (
        <div className="container my-10 flex flex-col justify-center items-center lg:px-20 w-full">
          <div className="">
            <img
              src={
                doctor?.image ? doctor.image : "https://i.imgur.com/EqBviP4.png"
              }
              className="h-60 mx-auto w-[350px]"
            ></img>
            <div className="my-3">
              {doctor?.is_active === true ? (
                <Badge className="bg-green-700/60 my-2">Online</Badge>
              ) : (
                <Badge className=" bg-gray-400 my-2">Offline</Badge>
              )}
              <h3 className="font-semibold text-2xl md:text-3xl text-left leading-none border-b-2 pb-2 ">
                Dr. {doctor?.user_name}
              </h3>
            </div>
            {!displayForm && (
              <>
                <div className="flex flex-col gap-1 justify-center items-center my-3">
                  {doctor?.fee !== 0 && (
                    <div className="text-3xl font-bold text-left bg-sky-100 w-full mb-6 p-1">
                      {toRupiah(Number(doctor?.fee))}
                      <span className="text-sm font-normal text-muted-foreground">
                        /session
                      </span>
                    </div>
                  )}
                  {doctor?.fee === 0 && (
                    <div className="text-3xl font-bold text-left bg-green-100 w-full mb-6 p-1">
                      Free
                    </div>
                  )}
                </div>
                <div>
                  <p className="leading-none text-xl text-left">
                    {doctor?.specialist_name}
                  </p>
                  <h5 className="leading-none text-xl mt-6">
                    About {doctor?.specialist_name}:
                  </h5>
                  <p className="text-zinc-500 leading-none text-lg">
                    {doctor?.specialist_description}
                  </p>
                  <p className="text-zinc-500 leading-tight text-base mt-6 mb-20">
                    Years of experience: <br />
                    {doctor?.years_of_experience || "~"} years
                  </p>
                </div>
              </>
            )}
            {displayForm && <StartChat doctorId={doctor?.id} />}

            {!displayForm ? (
              <Button
                className="w-full my-20"
                onClick={() => setDisplayForm(!displayForm)}
              >
                Confirm
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
