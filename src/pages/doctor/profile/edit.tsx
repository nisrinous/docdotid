import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DoctorResponse } from "@/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { editProfileDoctorSchema } from "@/lib/validation/doctor";
import { putDoctorDetail } from "@/lib/fetcher/doctor";

type Inputs = z.infer<typeof editProfileDoctorSchema>;

const EditProfileDoctor = ({ data }: { data: DoctorResponse }) => {
  const { token } = useSelector((state: RootState) => state.user);
  const form = useForm({
    resolver: zodResolver(editProfileDoctorSchema),
    defaultValues: {
      ...data,
      name: data?.user_name || "",
      specialist_id: data?.specialist_id || 1,
      years_of_exp: data?.years_of_exp || "",
    },
  });

  const [formChanged, setFormChanged] = useState<boolean>(false);

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    try {
      const cleanedFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== null)
      );
      await putDoctorDetail(token, cleanedFormData);
      setFormChanged(false);
    } catch (error) {
      console.error("" + error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center gap-2 sm:gap-5 my-5 w-full max-w-lg">
        <Form {...form}>
          <form
            className="grid gap-4 container text-lg"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      value={form.getValues("name")}
                      onChange={(e) => {
                        form.setValue("name", e.target.value);
                        setFormChanged(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="years_of_exp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={
                        data?.specialist_name
                          ? `Enter your years of experience as ${data?.specialist_name}`
                          : `Enter your years of experience`
                      }
                      value={form.getValues("years_of_exp")}
                      onChange={(e) => {
                        form.setValue("years_of_exp", e.target.value);
                        setFormChanged(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <FormField
                control={form.control}
                name="specialist_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value: typeof field.value) => {
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {Array.isArray(categoryList) &&
                            categoryList.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="my-5" disabled={!formChanged}>
              Update Profile
              <span className="sr-only">Submit</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default EditProfileDoctor;
