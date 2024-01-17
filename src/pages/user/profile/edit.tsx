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
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

const Inputs = z.object({
  name: z
    .string()
    .min(5, {
      message: "Full name must be at least 5 characters",
    })
    .refine((val) => !/\d/.test(val), {
      message: "Full name should not contain numbers",
    }),
  phone: z.string(),
  gender: z.enum(["male", "female"]),
  height: z.number().positive(),
  weight: z.number().positive(),
});

const EditNewsForm = ({ data }: { data: UserDetailResponse }) => {
  const router = useRouter();
  const { id } = router.query;

  const form = useForm({
    resolver: zodResolver(Inputs),
    defaultValues: {
      name: data.name,
      phone: data.phone,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
    },
  });

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        if (id) {
          const response = await axios.get(``);
          const fetchedData = response.data;
          form.reset(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewsData();
  }, [id]);

  const onSubmit = async (formData: z.infer<typeof Inputs>) => {
    try {
      const response = await axios.patch(`http://localhost:9000/news/${id}`, {
        ...formData,
        updated_at: new Date().toString(),
      });
      if (response.data) {
        toast.success("News updated successfully!");
        router.push("/admin/news");
      }
    } catch (error) {
      toast.error("" + error);
    }
  };

  return (
    <div className="w-full p-10 bg-white">
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
                  <Select
                    value={form.getValues("gender")}
                    onChange={(value) => form.setValue("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {form.getValues("gender") || "Select gender"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male" className="text-inherit">
                        Male
                      </SelectItem>
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
                <FormLabel>Wight</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter weight"
                    value={form.getValues("weight")}
                    onChange={(e) => form.setValue("weight", e.target.value)}
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
                    onChange={(e) => form.setValue("height", e.target.value)}
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
  );
};

export default EditNewsForm;
