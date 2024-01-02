import Link from "next/link";
import RegisterForm from "@/components/form/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Register() {
  return (
    <>
      <div className="h-screen flex flex-row gap-5 justify-center items-center">
        <div className="mx-auto lg:w-1/4 w-sm mb-10 md:mb-0">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-4xl">Register</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <RegisterForm />
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-center gap-2">
              <div className="text-sm text-muted-foreground">
                <span className="mr-1 sm:inline-block">
                  Already have an account?
                </span>
                <Link
                  aria-label="Log in"
                  href="/auth/login"
                  className="text-primary underline-offset-4 transition-colors hover:underline"
                >
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
