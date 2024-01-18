import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/lib/validation/auth";
import { loginUser } from "@/lib/fetcher/auth";
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
import { PasswordInput } from "../input/password";

import { useDispatch } from "react-redux";
import {
  setToken,
  setUserId,
  setPersonalId,
  setRoleId,
} from "@/store/slices/authSlice";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

type Inputs = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [isSending, setIsSending] = React.useState(false);
  const dispatch = useDispatch();

  const form = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: Inputs) {
    try {
      setIsSending(true);
      const data = await loginUser(formData.email, formData.password);
      const token = data?.data?.access_token;
      if (token) {
        dispatch(setToken(token));

        const decodedToken = jwt.decode(token);
        if (
          decodedToken &&
          typeof decodedToken === "object" &&
          "user_id" in decodedToken &&
          "personal_id" in decodedToken &&
          "role_id" in decodedToken
        ) {
          const userId = decodedToken.user_id;
          const personalId = decodedToken.personal_id;
          const roleId = decodedToken.role_id;
          dispatch(setUserId(userId));
          dispatch(setPersonalId(personalId));
          dispatch(setRoleId(roleId));
          console.log(roleId);
        } else {
          throw new Error("Invalid token format or missing user_id/role");
        }
      } else {
        throw new Error(data?.message || "Unknown error");
      }
    } catch (error) {
      toast.error("" + error);
    } finally {
      setIsSending(false);
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
          <Button type="submit" disabled={isSending} className="my-5 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
