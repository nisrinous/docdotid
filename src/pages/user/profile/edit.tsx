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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserDetailResponse } from "@/types";
import { putUserDetail } from "@/lib/fetcher/user";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Inputs = z.object({
  name: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters" })
    .refine((val) => !/\d/.test(val), {
      message: "Full name should not contain numbers",
    }),
  phone: z.string(),
  gender: z.string(),
  height: z.number().positive(),
  weight: z.number().positive(),
});

const EditProfile = ({ data }: { data?: UserDetailResponse }) => {
  const { token } = useSelector((state: RootState) => state.user);
  const form = useForm({
    resolver: zodResolver(Inputs),
    defaultValues: {
      ...data,
    },
  });

  const onSubmit = async (formData: z.infer<typeof Inputs>) => {
    try {
      const changes: Partial<UserDetailResponse> = {};
      if (data?.name !== formData.name) {
        changes.name = formData.name;
      }
      if (data?.phone !== formData.phone) {
        changes.phone = formData.phone;
      }
      if (data?.gender !== formData.gender) {
        changes.gender = formData.gender;
      }
      if (data?.height !== formData.height) {
        changes.height = formData.height;
      }
      if (data?.weight !== formData.weight) {
        changes.weight = formData.weight;
      }

      if (Object.keys(changes).length > 0) {
        const updatedData = await putUserDetail(token, changes);
        updatedData
          ? toast.success("Profile updated successfully!")
          : toast.error("No changes made to the profile.");
      } else {
        toast.error("No changes made to the profile.");
      }
    } catch (error) {
      toast.error("" + error);
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
                      onChange={(e) => form.setValue("name", e.target.value)}
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
                      onChange={(e) => form.setValue("phone", e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select value={form.getValues("gender")}>
                      <SelectTrigger>
                        <SelectValue className="text">
                          {form.getValues("gender") || "Select gender"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      value={form.getValues("weight")}
                      onChange={(e) =>
                        form.setValue("weight", Number(e.target.value))
                      }
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
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter height"
                      value={form.getValues("height")}
                      onChange={(e) =>
                        form.setValue("height", Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="my-5">
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
