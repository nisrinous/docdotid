import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { createAccountSchema } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../password-input";
import { createUser } from "@/lib/db";

type Inputs = z.infer<typeof createAccountSchema>;

export function PasswordForm() {
  const router = useRouter();

  const { link } = router.query;
  const [isSending, setIsSending] = React.useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(formData: Inputs) {
    try {
      setIsSending(true);
      await createUser(formData.password, link as string);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSending} className="my-5">
          Create account
          <span className="sr-only">Create account</span>
        </Button>
      </form>
    </Form>
  );
}
