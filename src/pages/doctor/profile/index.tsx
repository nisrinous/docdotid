import { Button } from "@/components/ui/button";
import { setEmail } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { DoctorResponse, UserDetailResponse } from "@/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import EditProfileDoctor from "./edit";
import { FaRegUserCircle } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { getDoctorDetail } from "@/lib/fetcher/doctor";

export default function ProfileDoctor() {
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState<DoctorResponse>();

  const fetchData = async () => {
    try {
      const data = await getDoctorDetail(token);
      setUser(data.data);
      console.log(data.data);
      dispatch(setEmail(user?.email as string));
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR([`/users/detail`, token], fetchData);

  return (
    <>
      {isLoading ? (
        <p className="text-zinc-400 mb-5 text-center">Loading...</p>
      ) : isError ? (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            <p className="text-zinc-400 mb-5">Error while fetching data</p>
          </div>
        </div>
      ) : (
        <>
          <div className="container mt-5 max-w-lg">
            <Card className="p-3 mt-10 flex flex-col justify-center items-center gap-2">
              {user?.image ? (
                <img
                  src={user.image}
                  className="border-[1px] rounded-full p-2 w-32"
                ></img>
              ) : (
                <FaRegUserCircle size={80} />
              )}
              <Button
                variant="link"
                className=" justify-start items-start my-0"
              >
                Change photo
              </Button>
              <div className="text-center flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-[#5CCCE5]">
                  Tazki Catur {user?.user_name}
                </h1>
                <p className="text-zinc-400 leading-none text-lg mt-1">
                  {user?.email || null}
                </p>
                <p className="leading-none text-gray-500 mt-1">
                  Specialization
                </p>
              </div>
            </Card>

            <Card className="p-3 my-10 flex flex-col justify-center items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-orange-300">
                $ 90.5
              </h1>
              <Button
                variant="outline"
                className=" justify-start items-start my-0"
              >
                Update telemedicine fee
              </Button>
            </Card>
          </div>
          <EditProfileDoctor data={user as DoctorResponse} />
        </>
      )}
    </>
  );
}
