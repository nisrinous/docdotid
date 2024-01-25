import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RiMailSendFill } from "react-icons/ri";
import { IconContext } from "react-icons";

export default function Verify() {
  return (
    <>
      <div className="h-screen flex flex-row gap-5 justify-center items-center">
        <div className="mx-auto lg:w-1/4 w-sm mb-10 md:mb-0">
          <Card>
            <CardHeader className="space-y-1 text-center justify-center items-center gap-5">
              <IconContext.Provider value={{ color: "#5CACE5" }}>
                <RiMailSendFill size={100} />
              </IconContext.Provider>
              <div>
                <CardTitle className="text-4xl">Check your mailbox!</CardTitle>
                <CardDescription>
                  We sent you a link to verify your e-mail.
                  <br />
                  Check your spam folder if you do not hear from us after a
                  while.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
