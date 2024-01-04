import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { emailRegisterSchema } from "@/lib/validation/auth";
import { registerEmail } from "@/lib/db";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Inputs = z.infer<typeof emailRegisterSchema>;

const RegisterForm = () => {
  const [isSending, setIsSending] = React.useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(emailRegisterSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(formData: Inputs) {
    try {
      setIsSending(true);
      await registerEmail(formData.email);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSending} className="my-5 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
