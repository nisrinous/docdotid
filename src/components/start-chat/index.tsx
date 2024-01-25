import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TelemedicineSymptoms } from "@/lib/validation/telemedicine-symptomps";
import { startChat } from "@/lib/fetcher/telemedicine-symptoms";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import { Link } from "lucide-react";
import { DoctorResponse } from "@/types";

type Inputs = z.infer<typeof TelemedicineSymptoms>;

const StartChat = ({ doctorId }: { doctorId: number }) => {
  const { token } = useSelector((state: RootState) => state.user);
  const [formIsFilled, setFormIsFilled] = useState<boolean>(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] =
    useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(TelemedicineSymptoms),
    defaultValues: {
      symptoms: "",
    },
  });
  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    try {
      await startChat(token, formData.symptoms);
      setFormIsFilled(false);
      setIsSubmissionSuccess(true);
    } catch (error) {
      console.error("" + error);
    }
  };
  return (
    <>
      <div className="my-5">
        <h3 className="font-semibold text-xl text-left leading-none mb-5 p-1">
          Getting started
        </h3>
        <ol className="list-none my-2">
          <li className="flex items-center mb-2">
            <div className="bg-sky-100 rounded-full p-2 px-4 mr-3">
              <p className=" font-bold">1</p>
            </div>
            <p className="leading-none text-lg text-left">
              Tell us your symptoms
            </p>
          </li>
          <li className="flex items-center mb-2">
            <div className="bg-sky-100 rounded-full p-2 px-4 mr-3">
              <p className=" font-bold">2</p>
            </div>
            <p className="leading-none text-lg text-left">When did it start?</p>
          </li>
        </ol>
      </div>
      <div className="flex flex-col justify-center w-full mt-5">
        <Form {...form}>
          <form
            className="text-lg w-full p-0"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-36"
                      placeholder="Type your message here"
                      value={form.getValues("symptoms")}
                      onChange={(e) => {
                        form.setValue("symptoms", e.target.value);
                        setFormIsFilled(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full my-10"
              type="submit"
              disabled={!formIsFilled}
            >
              Continue to chat
              <span className="sr-only">Submit</span>
            </Button>
          </form>
        </Form>
        <Button className="bottom-4 right-0" variant="outline">
          <Link href={`/telemedicine/${doctorId}`}>Start Chat</Link>
        </Button>
      </div>
    </>
  );
};

export default StartChat;
