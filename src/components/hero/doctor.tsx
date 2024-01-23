import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DoctorResponse } from "@/types";
import { use, useState } from "react";
import { getDoctorDetail, patchDoctorStatus } from "@/lib/fetcher/doctor";
import { setEmail } from "@/store/slices/authSlice";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";

const Inputs = z.object({
  is_active: z.boolean(),
});

const HeroDoctor = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState<DoctorResponse>();
  const form = useForm({
    resolver: zodResolver(Inputs),
    defaultValues: {
      is_active: user?.is_active || false,
    },
  });

  const fetchData = async () => {
    try {
      const data = await getDoctorDetail(token);
      setUser(data.data);
      dispatch(setEmail(user?.email as string));
      console.log(user);
    } catch (error) {
      console.error("" + error);
    }
  };

  const {
    data,
    error: isError,
    isValidating: isLoading,
  } = useSWR([`/users/detail`, token], fetchData);

  const onSubmit = async (formData: z.infer<typeof Inputs>) => {
    try {
      await patchDoctorStatus(token, formData.is_active);
    } catch (error) {
      console.error("" + error);
    }
  };

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
          <div className="container mt-5">
            <Card className="hidden my-10 md:flex flex-row justify-evenly items-center ">
              <div className="text-center md:text-left p-5">
                <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight md:text-2xl mt-1">
                  Welcome
                </h2>
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl text-[#5CCCE5]">
                  Dr. {user?.user_name}
                </h1>
                <p className="leading-loose text-gray-500 ">
                  Have a great day at work
                </p>
                <div className="flex items-center space-x-2 gap-1 my-2">
                  <Form {...form}>
                    <form
                      className="grid gap-4 container text-lg px-0"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="is_active"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="pl-0 flex flex-row justify-start items-center gap-2">
                                <Switch
                                  id="status"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                                {user?.is_active ? (
                                  <Label
                                    htmlFor="airplane-mode"
                                    className="text-green-600"
                                  >
                                    Online
                                  </Label>
                                ) : (
                                  <Label htmlFor="airplane-mode">Offline</Label>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="my-5">
                        Update status
                        <span className="sr-only">Submit</span>
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              <img src="hero-doctor.svg" className="w-1/4 px-5"></img>
            </Card>
            <div className="p-5">
              <Card className="container flex md:hidden flex-col justify-center items-center max-w-sm p-3">
                <img src="hero-doctor.svg" className="px-5 w-2/3"></img>
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
                    Welcome,
                  </h2>
                  <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl text-[#5CCCE5]">
                    Dr. {user?.user_name}
                  </h1>
                  <p className="leading-loose text-gray-500 ">
                    Have a great day at work
                  </p>
                  <div className="flex flex-row justify-center items-center space-x-2 gap-1 my-2">
                    <Switch
                      id="status"
                      checked={user?.is_active}
                      onChange={() => handleSwitchChange()}
                    />
                    {user?.is_active ? (
                      <Label htmlFor="airplane-mode" className="text-green-600">
                        Online
                      </Label>
                    ) : (
                      <Label htmlFor="airplane-mode">Offline</Label>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default HeroDoctor;
