import { Button } from "@/components/ui/button";
import { getUserDetail } from "@/lib/fetcher/user";
import { setEmail } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { UserDetailResponse } from "@/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

export default function Profile() {
  const { token, email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState<UserDetailResponse>();

  const fetchData = async () => {
    try {
      const data = await getUserDetail(token);
      setUser(data.data);
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
        <div className="container flex flex-col w-sm justify-center items-center my-10 md:gap-10 px-20 lg:px-40">
          <div className="mt-5">
            <img
              src="https://res-console.cloudinary.com/minevf/media_explorer_thumbnails/8f937d455af252efc3a2a6cdee68b198/detailed"
              className="border-[1px] rounded-full p-2 w-32"
            ></img>
          </div>
          <div className="my-3 md:my-0">
            <Button variant="outline">Edit profile</Button>
          </div>

          <div className="mt-5 md:mt-0">
            <h3 className="font-semibold text-2xl md:text-3xl text-center md:text-left border-b-2 mt-1 mb-3 pb-3 ">
              {user?.name}
            </h3>

            <p className="text-zinc-500 leading-none text-lg mt-1">{email}</p>
            <p className="text-zinc-600 leading-none text-base">
              {user?.phone}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
