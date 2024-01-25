import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { createDoctorSchema } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/input/password";
import { FileDialog } from "@/components/input/file-dialog";
import { FileWithPreview } from "@/types";
import { createDoctor } from "@/lib/fetcher/auth-doctor";

type Inputs = z.infer<typeof createDoctorSchema>;

export function PasswordFormDoctor() {
  const router = useRouter();
  const email = router.query.email as string;
  const code = router.query.code as string;

  const [isSending, setIsSending] = React.useState(false);
  const [files, setFiles] = React.useState<FileWithPreview | null>(null);

  const form = useForm<Inputs>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
      certificate: "",
    },
  });

  async function onSubmit(formData: Inputs) {
    console.log(files);
    try {
      setIsSending(true);
      await createDoctor(
        formData.password,
        email,
        code,
        formData.certificate.toString()
      );
    } catch (error) {
      console.error("Error creating account:", error);
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
        <FormItem className="flex w-full flex-col gap-1.5 mt-5">
          <FormLabel>Upload Certificate(s)</FormLabel>
          {files && (
            <div className="flex items-center gap-2">
              <img
                src={files.preview}
                alt={files.name}
                className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                width={80}
                height={80}
              />
            </div>
          )}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="certificate"
              maxFiles={1}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.certificate?.message}
          />
        </FormItem>

        <Button
          type="submit"
          disabled={isSending}
          className="my-5"
          onClick={() =>
            console.log(form.setValue("certificate", files?.preview as string))
          }
        >
          Create account
          <span className="sr-only">Create account</span>
        </Button>
      </form>
    </Form>
  );
}
