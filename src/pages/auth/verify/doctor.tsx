import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordFormDoctor } from "@/components/form/password-form-doctor";

export default function VerifyEmailPage() {
  return (
    <>
      <div className="h-screen flex flex-row gap-5 justify-center items-center">
        <div className="mx-auto lg:w-1/4 w-sm mb-10 md:mb-0">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Create a Password</CardTitle>
              <CardDescription>
                Create a strong password with a mix of letters, numbers and
                symbols
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <PasswordFormDoctor />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
