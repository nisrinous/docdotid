import { Button } from "@/components/ui/button";
import { getUserDetail } from "@/lib/fetcher/user";
import { setEmail } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { UserDetailResponse } from "@/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import EditProfile from "./edit";
import { FaRegUserCircle } from "react-icons/fa";

export default function Profile() {
  const { token } = useSelector((state: RootState) => state.user);
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
        <>
          <div className="container flex flex-col w-sm justify-center items-center mt-10 w-full md:max-w-md">
            <div className="mt-5 flex flex-col gap-5 justify-between items-center">
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
                className=" justify-start items-start mt-0"
              >
                Change photo
              </Button>
              <div className="mt-5 md:mt-0 flex flex-col justify-center items-center">
                <h3 className="font-semibold text-2xl md:text-3xl text-left mt-1">
                  {user?.name || null}
                </h3>
                <p className="text-zinc-400 leading-none text-lg mt-1">
                  {user?.email || null}
                </p>
              </div>
            </div>
          </div>
          <EditProfile data={user as UserDetailResponse} />
        </>
      )}
    </>
  );
}
