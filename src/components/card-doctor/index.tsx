import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { JSX, SVGProps } from "react";

export function CardDoctor() {
  return (
    <Card className="shadow-lg w-[350px] flex">
      <div className="w-1/2">
        <img
          alt="Profile Image"
          className="aspect-square object-cover w-full h-full rounded-l-lg"
          height={500}
          src="/placeholder.svg"
          width={250}
        />
      </div>
      <CardContent className="relative w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-2">Doctor</h2>
        <p className="text-gray-600 mb-0">Derma Specialist</p>
        <p className="text-lg font-bold mb-4">$99.99</p>
        <Button className=" bottom-4 right-11" variant="outline">
          <TextIcon className="h-4 w-4 mr-4" />
          Start Chat
        </Button>
      </CardContent>
    </Card>
  );
}

function TextIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}
