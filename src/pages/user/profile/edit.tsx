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
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserDetailResponse } from "@/types";
import { putUserDetail } from "@/lib/fetcher/user";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { editProfileUserSchema } from "@/lib/validation/user";
import { useState } from "react";

type Inputs = z.infer<typeof editProfileUserSchema>;

const EditProfile = ({ data }: { data: UserDetailResponse }) => {
  const { token } = useSelector((state: RootState) => state.user);
  const form = useForm({
    resolver: zodResolver(editProfileUserSchema),
    defaultValues: {
      name: data?.name || "",
      phone: data?.phone || "",
      gender: data?.gender || "",
      height: data?.height || "",
      weight: data?.weight || "",
      image: data?.image || "",
    },
  });

  const [formChanged, setFormChanged] = useState<boolean>(false);

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    try {
      const cleanedFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== null)
      );

      if (isEqual(cleanedFormData, data)) {
        throw new Error("No changes made to the profile.");
      }

      await putUserDetail(token, cleanedFormData);
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ex: 08123456789"
                      value={form.getValues("phone")}
                      onChange={(e) => {
                        form.setValue("phone", e.target.value);
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
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value: typeof field.value) => {
                        field.onChange(value);
                        setFormChanged(true);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (in kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight in kg"
                      value={form.getValues("weight")}
                      onChange={(e) => {
                        form.setValue("weight", e.target.value);
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
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (in cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter height in cm"
                      value={form.getValues("height")}
                      onChange={(e) => {
                        form.setValue("height", e.target.value);
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>img (in cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter height in cm"
                      value={form.getValues("image")}
                      onChange={(e) => {
                        form.setValue("image", e.target.value);
                        setFormChanged(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default EditProfile;
